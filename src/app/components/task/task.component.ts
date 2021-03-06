import { Component, OnInit, Inject } from "@angular/core";
import { OrderService } from "../../services/order.service";
import { UserService } from "../../services/user.service";
import { Order } from "../../model/order.model";
import { TaskService } from "../../services/task.service";
import { ErrorService } from "../../services/error.service";
import { Task, TaskStatus } from "../../model/task.model";
import { GroupService } from "../../services/group.service";
import { Group } from "../../model/group.model";
import { Observable } from "rxjs/Observable";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { TaskDetailsComponent } from "./details/task-details.component";

const SCHEDULE_QUERY_SORT : Array<string> = ["estimatedStartDate"];

@Component({
    selector: 'app-task',
    templateUrl: 'task.component.html',
    styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {

    userGroup : Group;
    currentOrder : Order;
    numberOfTask : Number = 0;
    tasks : Array<Task> = new Array<Task>();
    specifyTasks : Array<Task> = new Array<Task>();
    groupTasks = {};
    specifyGroupTasks = {};

    constructor(private groupService : GroupService, private orderService : OrderService,
        private taskService : TaskService, private dialog: MatDialog, private userService: UserService,
        private errorService: ErrorService) {}

    ngOnInit() {

        let currentUserGroup = localStorage.getItem('groupId');
        if (currentUserGroup) {
            this.getTaskData(currentUserGroup);
        } else {
            this.errorService.showErrorMessage('You do not have any group assigned, please contact with administrator or production manager');
        }
    }

    private getTaskData(groupId) {

        let getTaskByOrder = order => {
            let firstTask: Order = order[0];
            if (firstTask)
                this.taskService.get(0, firstTask.id).subscribe(task => {
                    this.tasks = task;
                    this.groupTasks = task.reduce((obj, item) => {
                        (obj[item['status']] = obj[item['status']] || []).push(item);
                        return obj;
                    }, {});
                });
        };
        let orderByGroupObserver = this.getOrderByGroupId(groupId);
        orderByGroupObserver.subscribe(getTaskByOrder);
        orderByGroupObserver.subscribe(orders => this.currentOrder = orders[0]);
        this.groupService.get(groupId).subscribe(group => this.userGroup = group);
        this.groupService.getTask(groupId).subscribe(tasks => {
            this.specifyTasks = tasks;
            this.specifyGroupTasks = tasks.reduce((obj, item) => {
                (obj[item['status']] = obj[item['status']] || []).push(item);
                return obj;
            }, {});
        });
    }

    private getOrderByGroupId(groupId : number) : Observable<Array<Order>> {

        let queryParam: Map<string, string> = new Map();
        queryParam.set('groupId', groupId.toString());
        queryParam.set('status', 'IN_PROGRESS');

        return this.orderService.get(0, undefined, queryParam);
    }

    moveTo(task: Task, status: TaskStatus, taskList) {

        let oldStatus = task.status;
        task.status = status;

        let moveTaskToGroup = (task: Task, newStatus: TaskStatus, oldStatus: TaskStatus) => {
            let taskIndex = taskList[oldStatus].indexOf(task);
            taskList[oldStatus].splice(taskIndex, 1);
            if (taskList[newStatus] === undefined) {
                taskList[newStatus] = [];
            }
            taskList[newStatus].push(task)
        }

        if (status) {

            this.updateDatesIfChangeToInProgressOrFinished(task);

            this.taskService.put(0, this.currentOrder.id, task.id, JSON.stringify(task))
                .subscribe(x => moveTaskToGroup(task, task.status, oldStatus));
        }
    }

    private updateDatesIfChangeToInProgressOrFinished(task: Task) {

        if (TaskStatus.IN_PROGRESS == task.status && task.startDate == undefined) {
            task.startDate = new Date();
        }
        else if (TaskStatus.FINISHED == task.status) {
            task.finishDate = new Date();
        }
    }

    reOpen(task: Task, taskList) {
        if (task) {
            task.reasonRejection = undefined;
            task.blockedReason = undefined;
            task.finishDate = undefined;
            this.moveTo(task, TaskStatus.OPENED, taskList);
        }
    }

    openRejectedFormDialog = (task: Task): void => this.openFormDialog(task, TaskStatus.REJECTED);
    openBlockedFormDialog = (task: Task): void => this.openFormDialog(task, TaskStatus.BLOCKED);

    private openFormDialog(task: Task, action: TaskStatus) {
        let dialogRef = this.dialog.open(DialogRejectedTaskForm, {
            width: '30%',
            height: '50%',
            data: { task: task, action: action }
        });

        dialogRef.afterClosed().subscribe(task => {
            if(task) this.moveTo(task, action, this.groupTasks);
        });
    }

    openDetails(task: Task) {
        this.dialog.open(TaskDetailsComponent, {
            width: '60%',
            height: '80%',
            data: { task: task, order: this.currentOrder }
        });
    }

}

@Component({
    selector: 'app-dialog-rejected-task-form',
    templateUrl: 'dialog-rejected-task-form.component.html',
    styleUrls: ['./form/form-task.component.css'],
})
export class DialogRejectedTaskForm {

    constructor(public dialogRef: MatDialogRef<DialogRejectedTaskForm>, @Inject(MAT_DIALOG_DATA) public data: any) {}

    actionVariable: string = this.data.action === TaskStatus.REJECTED ? 'reasonRejection' : 
        this.data.action === TaskStatus.BLOCKED ? 'blockedReason' : ''

    doAction = () => {
        if(this.data.task[this.actionVariable]) this.close(this.data.task);
    }

    close = (task: Task = undefined) => this.dialogRef.close(task);
}