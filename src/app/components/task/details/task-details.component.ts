import { Component, OnInit, Inject } from "@angular/core";
import { TaskService } from "../../../services/task.service";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { Task  } from "../../../model/task.model";
import { CommentService } from "../../../services/comment.service";
import { WorkLogService } from "../../../services/worklog.service";
import { ErrorService } from "../../../services/error.service";
import { WorkLog } from "../../../model/worklog.model";

@Component({
    selector: 'app-task-details',
    templateUrl: 'task-details.component.html',
    styleUrls: ['task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {

    orderId: number;
    taskId: number;
    task: Task = new Task();
    comments: Array<Comment> = new Array<Comment>();
    worklogs: Array<WorkLog> = new Array<WorkLog>();

    worklog: WorkLog = new WorkLog();

    constructor(private taskService : TaskService, private commentService: CommentService,
        private worklogService: WorkLogService, private errorService: ErrorService,
        private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {

        this.taskId = this.data.task.id;
        this.orderId = this.data.order.id;

        this.taskService.get(0, this.orderId, this.taskId).subscribe(task => this.task = task);
        this.loadComments();
        this.loadWorkLogs();
    }

    loadWorkLogs = () => 
        this.worklogService.get(0, this.orderId, this.taskId).subscribe(worklogs => this.worklogs = worklogs);

    loadComments = () =>
        this.commentService.get(0, this.orderId, this.taskId).subscribe(comments => this.comments = comments);

    resetWorklog = () => this.worklog = new WorkLog();

    deleteWorklog = (worklogId: number) => this.worklogService.delete(0, this.orderId, this.taskId, worklogId)
        .subscribe(this.loadWorkLogs)

    createWorklog() {
        if(this.validateWorkLog()) {
            this.worklogService.post(0, this.orderId, this.taskId, JSON.stringify(this.worklog))
                .subscribe(this.loadWorkLogs).add(this.resetWorklog);
        } else {
            this.errorService.showErrorMessage("Must fills Time worked and description fields");
        }
    }

    private validateWorkLog = () => !!this.worklog && !!this.worklog.description && !!this.worklog.hoursWorked;


}