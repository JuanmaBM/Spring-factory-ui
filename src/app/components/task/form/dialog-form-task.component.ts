import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";

@Component({
    selector: 'app-dialog-form-task',
    templateUrl: 'dialog-form-task.component.html',
})
export class DialogFormTaskComponent {

    constructor(private dialog: MatDialog) {}

    openDialog(): void {
        let dialogRef = this.dialog.open(FormTaskComponent, {
            width: '250px',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            alert('The dialog was closed');
        });
    }
}


@Component({
    selector: 'app-form-task',
    templateUrl: 'form-task.component.html',
    styleUrls: ['form-task.component.css'],
})
export class FormTaskComponent {

    constructor(public dialogRef: MatDialogRef<FormTaskComponent>) { }
}