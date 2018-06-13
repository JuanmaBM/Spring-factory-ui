import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { switchMap } from 'rxjs/operators';
import { ProductionSchedule } from "../../../model/ProductionSchedule.model";
import { ProductionScheduleService } from "../../../services/production-schedule.service";
import { MEASUREMENTS, Order } from "../../../model/order.model";
import { OrderService } from "../../../services/order.service";
import { ErrorService } from "../../../services/error.service";

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
        private errorService: ErrorService) { }

    editAction: Boolean = false;
    order: Order = new Order();
    orders: Array<Order> = Array<Order>();
    schedule: ProductionSchedule = new ProductionSchedule();
    measurements = MEASUREMENTS;

    displayedColumns = ['id', 'name', 'description', 'measurements', 'actions'];
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
}