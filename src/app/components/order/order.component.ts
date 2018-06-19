import { Component, OnInit, NgModule, ViewEncapsulation, ViewChild } from '@angular/core';
import { OrderService } from "../../services/order.service";
import { TaskService } from "../../services/task.service";
import { Order } from '../../model/order.model';
import { Task } from '../../model/task.model';
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
	task: Task = new Task();
	tasks: Array<Task> = new Array<Task>();

	orderId: number;
	scheduleId: number;

  constructor(private orderService: OrderService, private errorService: ErrorService, private router: Router,
        private route: ActivatedRoute, private taskService: TaskService) {}

	private assignTasks = tasks => this.tasks = tasks;

  ngOnInit() {

		let assignOrder = (order: Order) => this.order = order;
		let getOrderByParamId = (scheduleId: number, orderId: number) =>
			this.orderService.get(scheduleId, orderId).subscribe(assignOrder);

		let assignTasks = tasks => this.tasks = tasks;
		let getTaskByOrderId = (scheduleId: number, orderId: number) => 
			this.taskService.get(scheduleId, orderId).subscribe(assignTasks, this.errorService.throwError);

		let assignOrderAndScheduleIds = params => {
			this.orderId = params.orderId;
			this.scheduleId = params.scheduleId;
		};

		let routeParamsObserver = this.route.params;
		routeParamsObserver.subscribe(assignOrderAndScheduleIds);
		routeParamsObserver.subscribe(params => getOrderByParamId(params.scheduleId, params.orderId));
		routeParamsObserver.subscribe(params => getTaskByOrderId(params.scheduleId, params.orderId));
	}

	receiveChange(task) {
			this.taskService.get(this.scheduleId, this.orderId).subscribe(this.assignTasks, this.errorService.throwError);
	}

}