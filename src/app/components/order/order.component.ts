import { Component, OnInit, NgModule, ViewEncapsulation, ViewChild } from '@angular/core';
import { OrderService } from "../../services/order.service";
import { TaskService } from "../../services/task.service";
import { Order } from '../../model/order.model';
import { Task } from '../../model/task.model';
import { ErrorService } from '../../services/error.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { WorkLogService } from '../../services/worklog.service';
import { CommentService } from '../../services/comment.service';
import { GroupService } from '../../services/group.service';
import { Group } from '../../model/group.model';
import { BaseChartDirective } from 'ng2-charts';
import { StatisticService } from '../../services/statistic.service';
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderComponent implements OnInit {

	@ViewChild(BaseChartDirective)
	public baseChart: BaseChartDirective;

 	order: Order = new Order();
	task: Task = new Task();
	tasks: Array<Task> = new Array<Task>();
	groups: Array<Group> = new Array<Group>();

	waitingResponse: Boolean = false;
	orderId: number;
	scheduleId: number;
	showChart: Boolean = false;
	colorToggle: string = "primary";
	autoRefresh: Boolean = false;

	priorityStatistics: Array<number> = new Array<number>();

  constructor(private orderService: OrderService, private errorService: ErrorService, private router: Router,
		private route: ActivatedRoute, private taskService: TaskService, private worklogService: WorkLogService,
		private commentService: CommentService, private groupService: GroupService,
		private statisticService: StatisticService) {}

	displayedColumns = ['name', 'creator', 'status', 'priority','estimatedTime', 'actions'];
	dataSource = new MatTableDataSource();

	public numberOfTasks: number = 0;
	public doughnutChartType: string = 'doughnut';

	public priorityChartLabels: Array<string> = new Array<string>('HIGH', 'MEDIUM', 'LOW');
	public priorityChartType: string = 'pie';
	public priorityChartData: Array<number> = new Array<number>(0,0,0);

	public statusChartLabels: Array<string> = new Array<string>("OPENED", "IN_PROGRESS", "ON_HOLD", "BLOCKED",
        "FINISHED", "REJECTED", "DELETED");
	public statusChartData: Array<number> = new Array<number>(0,0,0);

	public groupTaskChartLabel: Array<string>;
	public groupTaskChartData: Array<number> = new Array<number>(0,0,0);

	public workedHoursGroupChartLabels: Array<string> = new Array<string>();
	public workedHoursGroupChartData: Array<number> = new Array<number>(0,0,0);

	public hoursChartLabels: Array<string> = new Array<string>();
	public hoursChartType: string = 'bar';
	public hoursChartData: any[] = [];
	public hoursChartLegend: Boolean = true;

	public worklogCommentChartData: Array<any> = [
		{data: [], label: 'Worklog'}, 
		{data: [], label: 'Comments'}, 
	];
	public worklogCommentChartType: string = 'bar';

	public barChartOptions:any = {
		scaleShowVerticalLines: false,
		responsive: true
	};

	private autoRefreshSubscription: Subscription;

	private assignTasks = tasks => {
		this.numberOfTasks = tasks.length
		this.tasks = tasks;
		this.dataSource.data = this.tasks;
	};

    ngOnInit() {

		this.waitingResponse = true;

		let assignOrder = (order: Order) => this.order = order;
		let getOrderByParamId = (scheduleId: number, orderId: number) =>
			this.orderService.get(scheduleId, orderId).subscribe(assignOrder);

		let getTaskByOrderId = (scheduleId: number, orderId: number) => 
			this.taskService.get(scheduleId, orderId).subscribe(this.assignTasks, this.errorService.throwError);

		let assignOrderAndScheduleIds = params => {
			this.orderId = params.orderId;
			this.scheduleId = params.scheduleId;
		};

		let loadGroupData = groups => {
			this.groups = groups;
		};

		this.groupService.get().subscribe(loadGroupData);

		let routeParamsObserver = this.route.params;
		routeParamsObserver.subscribe(assignOrderAndScheduleIds);
		routeParamsObserver.subscribe(params => getOrderByParamId(params.scheduleId, params.orderId));
		routeParamsObserver.subscribe(params => getTaskByOrderId(params.scheduleId, params.orderId));
		routeParamsObserver.subscribe(params => {
			this.statisticService.get(params.scheduleId, params.orderId).subscribe(data => {

				this.priorityChartData = this.loadChartData(data.priority);
				this.statusChartData = this.loadChartData(data.status);
				this.priorityChartLabels = this.loadChartLabel(data.priority);
				this.statusChartLabels = this.loadChartLabel(data.status);

				this.groupTaskChartLabel = this.loadChartLabel(data.taskByGroup);
				this.groupTaskChartData = this.loadChartData(data.taskByGroup);
				this.workedHoursGroupChartLabels = this.loadChartLabel(data.workedHoursByGroup);
				this.workedHoursGroupChartData = this.loadChartData(data.workedHoursByGroup);
				
				//this.hoursChartLabels = this.loadChartLabel(data.estimatedHours);
				this.loadHoursChartData(data);

				this.showChart = true;
				this.waitingResponse = false;
			})
		})
	}

	private loadHoursChartData(data: any) {

		this.hoursChartData = [];
		this.hoursChartLabels = [];
		let estimatedTime = [];
		let workedTime = [];

		for (let key in data.estimatedHours) {
			this.hoursChartLabels.push(key);
			estimatedTime.push(data.estimatedHours[key]);
			workedTime.push(data.workedHours[key]);
		}

		this.hoursChartData.push({ data: estimatedTime, label: 'Estimated Time' });
		this.hoursChartData.push({ data: workedTime, label: 'Worked time' });
	}

	private loadChartLabel(data: any) {
		let labels = [];
		for (let key in data) {
			labels.push(key);
		}
		return labels;
	}
	
	private loadChartData(data: any) {
		let priorityChartData = [];
		for (let key in data) {
			priorityChartData.push(data[key]);
		}
		return priorityChartData;
	}

	deleteTask(task) {
		if(task) this.taskService.delete(this.scheduleId, this.orderId, task.id).subscribe(_ => this.ngOnInit());
	}

	receiveChange = (task) => this.ngOnInit();

	private reloadTasks = () => {
		this.waitingResponse = true;
		this.taskService.get(this.scheduleId, this.orderId)
			.subscribe(this.assignTasks, this.errorService.throwError);
	};

	public changeAutoRefresh(autoRefresh) {
		this.autoRefresh = !autoRefresh;

		if(this.autoRefresh) {
			let timer = TimerObservable.create(2000, 10000);
			this.autoRefreshSubscription = timer.subscribe(_ => this.ngOnInit());
		} else {
			this.autoRefreshSubscription.unsubscribe();
		}
	}

}