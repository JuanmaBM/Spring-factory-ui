import { Component, OnInit, NgModule, ViewEncapsulation, ViewChild } from '@angular/core';
import { OrderService } from "../../services/order.service";
import { TaskService } from "../../services/task.service";
import { Order } from '../../model/order.model';
import { Task } from '../../model/task.model';
import { ErrorService } from '../../services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { OperatorFunction } from 'rxjs/interfaces';

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

	waitingResponse: Boolean = false;
	orderId: number;
	scheduleId: number;

	priorityStatistics: Array<number> = new Array<number>();

  constructor(private orderService: OrderService, private errorService: ErrorService, private router: Router,
        private route: ActivatedRoute, private taskService: TaskService) {}

	displayedColumns = ['name', 'creator', 'status', 'priority','estimatedTime', 'actions'];
	dataSource = new MatTableDataSource();

	public numberOfTasks: number = 0;

	public priorityChartLabels: Array<string> = new Array<string>('HIGH', 'MEDIUM', 'LOW');
	public priorityChartType: string = 'pie';
	public priorityChartData: Array<number> = new Array<number>(0,0,0);

	private assignTasks = tasks => {
		this.numberOfTasks = tasks.length
		this.tasks = tasks;
		this.dataSource.data = this.tasks;
		this.waitingResponse = false;
		
		let a = this.groupByAndCount((task: Task) => task.priority);
		let dataSet: Array<number> = new Array<number>();
		for(let key in a) {
			let index = this.priorityChartLabels.indexOf(key);
			dataSet[index] = (a[key]);
		}
		this.priorityChartData = dataSet;
	};

    ngOnInit() {

		let assignOrder = (order: Order) => this.order = order;
		let getOrderByParamId = (scheduleId: number, orderId: number) =>
			this.orderService.get(scheduleId, orderId).subscribe(assignOrder);

		let getTaskByOrderId = (scheduleId: number, orderId: number) => 
			this.taskService.get(scheduleId, orderId).subscribe(this.assignTasks, this.errorService.throwError);

		let assignOrderAndScheduleIds = params => {
			this.orderId = params.orderId;
			this.scheduleId = params.scheduleId;
		};

		let routeParamsObserver = this.route.params;
		routeParamsObserver.subscribe(assignOrderAndScheduleIds);
		routeParamsObserver.subscribe(params => getOrderByParamId(params.scheduleId, params.orderId));
		routeParamsObserver.subscribe(params => getTaskByOrderId(params.scheduleId, params.orderId));
	}
	
	deleteTask(task) {
		if(task) this.taskService.delete(this.scheduleId, this.orderId, task.id).subscribe(this.reloadTasks);
	}

	receiveChange = (task) => this.reloadTasks();

	private reloadTasks = () => {
		this.waitingResponse = true;
		this.taskService.get(this.scheduleId, this.orderId)
			.subscribe(this.assignTasks, this.errorService.throwError)
	};

	private groupByAndCount = (groupFunction: (Task) => any) => this.tasks.map(groupFunction)
	  .reduce((obj, item) => {
			obj[item] = (obj[item] || 0) + 1;
			return obj;
		},{})
}