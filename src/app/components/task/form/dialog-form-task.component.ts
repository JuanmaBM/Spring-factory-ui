import { Component, Inject, OnInit, Output, EventEmitter } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, TaskPriority } from '../../../model/task.model';
import { ErrorService } from "../../../services/error.service";
import { TaskService } from "../../../services/task.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

const VALIDATION_COMPLETE_MESSAGE_ERROR = "Must complete task form";

@Component({
    selector: 'app-dialog-form-task',
    templateUrl: 'dialog-form-task.component.html',
})
export class DialogFormTaskComponent implements OnInit {

    idSchedule: number;
    idOrder: number;

    @Output()
    change: EventEmitter<Task> = new EventEmitter<Task>();

    constructor(private dialog: MatDialog, private taskService: TaskService, private route: ActivatedRoute,
        private errorService: ErrorService) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.idSchedule = params.scheduleId
            this.idOrder = params.orderId;
        });
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(FormTaskComponent, {
            width: '50%',
            height: '80%',
            data: { idSchedule: this.idSchedule, idOrder: this.idOrder }
        });

        dialogRef.afterClosed().subscribe(task => {
            if(task) this.createTask(task);
        });
    }

    private createTask(task: Task) {
        if (task) {
            this.taskService.post(this.idSchedule, this.idOrder, JSON.stringify(task))
                .subscribe(res => this.change.emit(JSON.parse(res.text())));
        } else {
            this.errorService.showErrorMessage("An error occurred when creating the task");
        }
    }
}

@Component({
    selector: 'app-form-task',
    templateUrl: 'form-task.component.html',
    styleUrls: ['form-task.component.css'],
})
export class FormTaskComponent {

    task: Task = new Task();
    taskPriority: Array<TaskPriority> = Object.values(TaskPriority);
    constructor(public dialogRef: MatDialogRef<FormTaskComponent>, private errorService: ErrorService) {}

    close = (task: Task = undefined) => this.dialogRef.close(task);

    finishFormSuccesfully = (task: Task) => this.close(task);

    createTask() {
        this.throwValidationErrorIfTaskIsNotComplete(this.task);
        this.finishFormSuccesfully(this.task);
    }

    private throwValidationErrorIfTaskIsNotComplete(task: Task) {
        if (!task || !task.name || !task.description || !task.priority || !task.estimatedTime) {
            this.errorService.showErrorMessage(VALIDATION_COMPLETE_MESSAGE_ERROR);
        }
    }
}