import { Component, OnInit, ViewEncapsulation, Inject } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import { switchMap } from 'rxjs/operators';
import { ProductionSchedule } from "../../../model/ProductionSchedule.model";
import { ProductionScheduleService } from "../../../services/production-schedule.service";
import { MEASUREMENTS, Order, OrderStatusEnum } from "../../../model/order.model";
import { OrderService } from "../../../services/order.service";
import { ErrorService } from "../../../services/error.service";
import { GroupService } from "../../../services/group.service";
import { Group } from "../../../model/group.model";
import { CheckboxObject } from "../../../model/checkbox-object.model";
import { TaskStatus } from "../../../model/task.model";

@Component({
  selector: 'app-schedule-details',
  templateUrl: './production-schedule-details.component.html',
  styleUrls: ['./production-schedule-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductionScheduleDetailsComponent implements OnInit {

    constructor (private router: Router,
        private route: ActivatedRoute, 
        private scheduleService: ProductionScheduleService,
        private orderService: OrderService,
        private errorService: ErrorService,
        private dialog: MatDialog) { }

    editAction: Boolean = false;
    order: Order = new Order();
    orders: Array<Order> = Array<Order>();
    schedule: ProductionSchedule = new ProductionSchedule();
    measurements = MEASUREMENTS;

    displayedColumns = ['id', 'name', 'description', 'measurements', 'status', 'actions'];
    dataSource = new MatTableDataSource();

    ngOnInit() {

        let assignToSchedule = schedule => this.schedule = schedule;
        let getScheduleById = params => this.scheduleService.get(params.id).subscribe(assignToSchedule);

        let assignToOrderList = orders => {
            this.orders = orders;
            this.dataSource.data = this.orders;
        };
        let getOrdersByTaskId = params => this.orderService.get(params.id).subscribe(assignToOrderList);

        let routesParamsObservable = this.route.params;
        routesParamsObservable.subscribe(getScheduleById);
        routesParamsObservable.subscribe(getOrdersByTaskId);
    }

    createOrder() {
        this.orderService.post(this.schedule.id, JSON.stringify(this.order)).subscribe(res => {
            this.addOrderIntoTable(res.json());
            this.order = new Order();
        }, errorResponse => this.errorService.throwError(errorResponse));
    }

    delete(order: Order) {
        if (order && order.id) {
            this.orderService.delete(this.schedule.id, order.id).subscribe(_ => this.deleteFromTable(order));
        }
    }

    editForm(order: Order){
        this.order = new Order(order);
        this.editAction = true;
    }

    editOrder() {
        let updateOrderRow = _ => {
            let updatedOrderIndex = this.orders.findIndex(elem => elem.id === this.order.id);
            if(updatedOrderIndex !== -1){
                this.orders[updatedOrderIndex] = new Order(this.order);
                this.dataSource.data = (this.orders);
            }
        };
        let clearOrderForm = _ => {
            this.order = new Order();
            this.editAction = false;
        };

        this.orderService.put(this.schedule.id, this.order.id, JSON.stringify(this.order))
            .subscribe(updateOrderRow, this.errorService.throwError).add(clearOrderForm);
    }

    private addOrderIntoTable(order: Order) {
        if (order) {
            this.orders.push(new Order(order));
            this.dataSource.data = (this.orders);
        }
    }

    private deleteFromTable(order: Order) {
        if (order) {
            let orderIndex = this.orders.indexOf(order);
            if (orderIndex !== -1) {
                this.orders.splice(orderIndex, 1);
                this.dataSource.data = (this.orders);
            }
        }
    }

    startOrder = (order: Order) => this.updateStatusOrder(order, OrderStatusEnum.IN_PROGRESS);

    closeOrder = (order: Order) => this.updateStatusOrder(order, OrderStatusEnum.CLOSE);

    private updateStatusOrder(order: Order, status: OrderStatusEnum) {
        let copyOrder = new Order(order);
        copyOrder.status = status;
        this.orderService.put(this.schedule.id, order.id, JSON.stringify(copyOrder)).subscribe(_ => order.status = status);
    }

    openAssignDialog(order: Order) {
        let dialogRef = this.dialog.open(DialogGroupAssignedForm, {
            width: '30%',
            height: '50%',
            data: { order: order }
        });

        dialogRef.afterClosed().subscribe(groupAssigned => {
            if(groupAssigned) {
                order.groupsAssigned = groupAssigned;
                this.orderService.put(this.schedule.id, order.id, JSON.stringify(order)).subscribe(x => console.log(x));
            }
        });
    }
}

@Component({
    selector: 'app-dialog-group-assigned-form',
    templateUrl: 'dialog-group-assigned-form.component.html'
})
export class DialogGroupAssignedForm implements OnInit {

    constructor(public dialogRef: MatDialogRef<DialogGroupAssignedForm>, @Inject(MAT_DIALOG_DATA) public data: any,
        public groupService: GroupService) {}

    groups: Array<CheckboxObject> = new Array<CheckboxObject>();
    assignedGroups: Array<Group> = new Array<Group>();

    ngOnInit() {
        let queryParam: Map<string, string> = new Map();
        queryParam.set('orderId', this.data.order.id);

        this.groupService.get(undefined, queryParam).subscribe(assignedGroups => {
            this.assignedGroups = assignedGroups
            this.groupService.get().subscribe(groups => {
                groups.forEach(group => {
                    let selected = this.assignedGroups.findIndex(g => g.id == group.id) >= 0;
                    this.groups.push(new CheckboxObject(selected, group));
                })
            });
        });
    }

    closeDialog = (groupAssigned?) => this.dialogRef.close(groupAssigned);

    updateGroupsSelected() {
        let groupsAssigned = this.groups.filter(checkbox => checkbox.selected).map(checkbox => checkbox.object);
        this.closeDialog(groupsAssigned);
    }
}