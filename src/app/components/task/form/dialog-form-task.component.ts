import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Task } from '../../../model/task.model';
import { ErrorService } from "../../../services/error.service";
import { TaskService } from "../../../services/task.service";
import { ActivatedRoute } from '@angular/router';
import { FormTaskComponent } from "./form-task.component";

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