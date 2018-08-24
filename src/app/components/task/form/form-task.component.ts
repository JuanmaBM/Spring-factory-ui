import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { Task, TaskPriority } from '../../../model/task.model';
import { ErrorService } from "../../../services/error.service";

const VALIDATION_COMPLETE_MESSAGE_ERROR = "Must complete task form";

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