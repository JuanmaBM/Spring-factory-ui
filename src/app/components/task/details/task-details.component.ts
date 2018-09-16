import { Component, OnInit, Inject } from "@angular/core";
import { TaskService } from "../../../services/task.service";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { Task  } from "../../../model/task.model";
import { CommentService } from "../../../services/comment.service";
import { WorkLogService } from "../../../services/worklog.service";
import { ErrorService } from "../../../services/error.service";
import { WorkLog } from "../../../model/worklog.model";
import { Comment } from "../../../model/comment.model";
import { User } from "../../../model/user.model";
import { AppComponent } from "../../../app.component";
import { Group } from "../../../model/group.model";

@Component({
    selector: 'app-task-details',
    templateUrl: 'task-details.component.html',
    styleUrls: ['task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {

    currentUser: string;
    orderId: number;
    taskId: number;
    task: Task = new Task();
    comments: Array<Comment> = new Array<Comment>();
    worklogs: Array<WorkLog> = new Array<WorkLog>();

    worklog: WorkLog = new WorkLog();
    comment: Comment = new Comment();

    totalTimeWorked: number = 0;
    timeUsed: number = 0;
    colorProgressBar: string = this.timeUsed > 100 ? 'primary' : 'warn';

    constructor(private taskService : TaskService, private commentService: CommentService,
        private worklogService: WorkLogService, private errorService: ErrorService,
        private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {

        this.currentUser = this.getCurrentUser();
        this.taskId = this.data.task.id;
        this.orderId = this.data.order.id;

        this.taskService.get(0, this.orderId, this.taskId).subscribe(task => this.task = task)
            .add(this.loadWorkLogs).add(this.loadComments);
    }

    private getCurrentUser = () => {
        let currentUser = localStorage.getItem('currentUser');
        return currentUser ? currentUser.replace(/['"]+/g, '') : undefined;
    }

    loadWorkLogs = () => 
        this.worklogService.get(0, this.orderId, this.taskId).subscribe(worklogs => this.worklogs = worklogs)
            .add(() => {
                this.totalTimeWorked = this.worklogs.map(worklog => worklog.hoursWorked).reduce((a, b) => a + b);
                this.timeUsed = (this.totalTimeWorked/this.task.estimatedTime) * 100;
            });

    resetWorklog = () => this.worklog = new WorkLog();

    deleteWorklog = (worklogId: number) => this.worklogService.delete(0, this.orderId, this.taskId, worklogId)
        .subscribe(this.loadWorkLogs)

    createWorklog() {

        this.validateForm(this.validateWorkLog, "Must fills Time worked and description fields");

        this.worklog.author = new User(this.currentUser);
        this.worklogService.post(0, this.orderId, this.taskId, JSON.stringify(this.worklog))
            .subscribe(this.loadWorkLogs).add(this.resetWorklog);
    }

    private validateWorkLog = () => !!this.worklog && !!this.worklog.description && !!this.worklog.hoursWorked;

    loadComments = () =>
        this.commentService.get(0, this.orderId, this.taskId).subscribe(comments => this.comments = comments);

    deleteComment = (commentId: number) => this.commentService.delete(0, this.orderId, this.taskId, commentId)
        .subscribe(this.loadComments);

    resetComment = () => this.comment = new Comment();

    private validateComment = () => !!this.comment && !!this.comment.text;


    createComment() {

        this.validateForm(this.validateComment, "Must fills comment field");

        this.comment.author = new User(this.currentUser);
        this.comment.creationDate = new Date();
        this.commentService.post(0, this.orderId, this.taskId, JSON.stringify(this.comment))
            .subscribe(this.loadComments).add(this.resetComment);
    }

    private validateForm(functionToValidate, errorMessage) {
        let isValidaForm: Boolean = functionToValidate(); 
        if (!isValidaForm) {
            this.errorService.showErrorMessage(errorMessage);
        }
    }

}