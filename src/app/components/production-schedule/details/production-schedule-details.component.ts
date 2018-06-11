import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { switchMap } from 'rxjs/operators';
import { ProductionSchedule } from "../../../model/ProductionSchedule.model";
import { ProductionScheduleService } from "../../../services/production-schedule.service";
import { MEASUREMENTS, Order } from "../../../model/order.model";
import { OrderService } from "../../../services/order.service";

@Component({
  selector: 'app-schedule-details',
  templateUrl: './production-schedule-details.component.html',
  styleUrls: ['./production-schedule-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductionScheduleDetailsComponent implements OnInit {

    constructor (private router: Router, private route: ActivatedRoute, 
        private scheduleService: ProductionScheduleService, private orderService: OrderService) { }

    order = new Order();
    orders = Array<Order>();
    schedule = new ProductionSchedule();
    measurements = MEASUREMENTS;

    displayedColumns = ['id', 'name', 'description', 'measurements'];
    dataSource = new MatTableDataSource(this.orders);

    ngOnInit() {

        let assignToSchedule = schedule => this.schedule = schedule;
        let getScheduleById = params => this.scheduleService.get(params.id).subscribe(assignToSchedule);

        let assignToOrderList = orders => this.orders = orders;
        let getOrdersByTaskId = params => this.orderService.get(params.id).subscribe(assignToOrderList);

        let routesParamsObservable = this.route.params;
        routesParamsObservable.subscribe(getScheduleById);
        routesParamsObservable.subscribe(getOrdersByTaskId);
    }
}