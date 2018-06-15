import { Component, OnInit, NgModule, ViewEncapsulation, ViewChild } from '@angular/core';
import { OrderService } from "../../services/order.service";
import { Order } from '../../model/order.model';
import { ErrorService } from '../../services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderComponent implements OnInit {

  order: Order = new Order();

  constructor(private orderService: OrderService, private errorService: ErrorService, private router: Router,
        private route: ActivatedRoute) {}

  ngOnInit() {

		let assignOrder = (order: Order) => this.order = order;
		let getOrderByParamId = (scheduleId: number, orderId: number) =>
			this.orderService.get(scheduleId, orderId).subscribe(assignOrder);

		this.route.params.subscribe(params => getOrderByParamId(params.scheduleId, params.orderId));
	}

}