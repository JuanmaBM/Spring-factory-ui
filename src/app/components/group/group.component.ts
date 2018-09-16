import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { GroupService } from "../../services/group.service";
import { Group } from '../../model/group.model';
import { ErrorService } from '../../services/error.service';
import { GenericComponent } from '../generic.component';
import { Task } from '../../model/task.model';
import { TaskService } from '../../services/task.service';
import { FormTaskComponent } from '../task/form/form-task.component';
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GroupComponent extends GenericComponent {

  constructor(private groupService: GroupService, private errorService: ErrorService, 
    private dialog: MatDialog) {
    super();
  }

  newModel() {
    return new Group();
  }

  newModelList() {
    return new Array<Group>();
  }

  getGenericService() {
    return this.groupService;
  }

  getErrorService() {
    return this.errorService;
  }

  openDialog(group: Group): void {
    let dialogRef = this.dialog.open(FormTaskComponent, {
        width: '50%',
        height: '80%'
    });

    dialogRef.afterClosed().subscribe(task => {
        if(task) this.createTask(group.id, task);
    });
  }

  openTaskListDialog(group: Group): void {
    let dialogRef = this.dialog.open(TaskGroupList, {
        width: '50%',
        height: '80%',
        data: { group: group}
    });
  }

  private createTask(groupId: number, task: Task) {
    if (task) {
        this.groupService.createTask(groupId, JSON.stringify(task))
            .subscribe(res => console.log(res));
    } else {
        this.errorService.showErrorMessage("An error occurred when creating the task");
    }
  }
}

@Component({
    selector: 'app-task-group-list',
    templateUrl: 'task-group-list.component.html',
})
export class TaskGroupList implements OnInit {

    displayedColumns = ['name', 'status', 'priority','estimatedTime', 'actions'];
    dataSource = new MatTableDataSource();
    task: Array<Task> = new Array<Task>();

    constructor(public dialogRef: MatDialogRef<TaskGroupList>, @Inject(MAT_DIALOG_DATA) public data: any, 
      public groupService: GroupService,) {}

    ngOnInit() {
      this.loadTask();
    }

    loadTask() {
      this.groupService.getTask(this.data.group.id).subscribe(task => {
        this.task = task;
        this.dataSource.data = this.task;
      });
    }

    deleteTask = task => this.groupService.deleteTask(this.data.group.id, task.id).subscribe(_ => {
      this.groupService.getTask(this.data.group.id).subscribe(task => {
        this.task = task;
        this.dataSource.data = this.task;
      });
    });

    close = (task: Task = undefined) => this.dialogRef.close(task);
}