import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { DataTableModule } from './components/data-table';
import { LoginComponent } from './components/login/login.component';
import { RoleComponent } from "./components/role/role.component";
import { UserComponent } from "./components/user/user.component";
import { GroupComponent } from "./components/group/group.component";
import { ProductionScheduleComponent } from "./components/production-schedule/production-schedule.component";
import { ProductionScheduleDetailsComponent } from './components/production-schedule/details/production-schedule-details.component';
import { OrderComponent } from "./components/order/order.component";
import { DialogFormTaskComponent } from "./components/task/form/dialog-form-task.component";
import { FormTaskComponent } from "./components/task/form/dialog-form-task.component";
import { TaskComponent } from "./components/task/task.component";
import { DialogRejectedTaskForm } from "./components/task/task.component";
import { DialogGroupAssignedForm } from "./components/production-schedule/details/production-schedule-details.component";

import { AuthService } from "./services/auth.service";
import { RoleService } from "./services/role.service";
import { UserService } from "./services/user.service";
import { GroupService } from "./services/group.service";
import { ProductionScheduleService } from "./services/production-schedule.service";
import { TaskService } from "./services/task.service";
import { ErrorService } from "./services/error.service";
import { OrderService } from './services/order.service';
import { WorkLogService } from './services/worklog.service';
import { CommentService } from './services/comment.service';

import { UrlPermission } from "./urlPermission/url.permission";
import { routing } from "./app.routing";

import { ChartsModule } from 'ng2-charts/ng2-charts';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule,
   MatFormFieldModule,
   MatTabsModule,
   MatInputModule,
   MatGridListModule,
   MatCardModule,
   MatSelectModule,
   MatButtonModule,
   MatExpansionModule,
   MatTableModule,
   MatDialog,
   MatDialogModule,
   MatDividerModule,
   MatStepperModule,
   MatProgressBarModule,
   MatCheckboxModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoleComponent,
    UserComponent,
    GroupComponent,
    ProductionScheduleComponent,
    ProductionScheduleDetailsComponent,
    OrderComponent,
    DialogFormTaskComponent,
    FormTaskComponent,
    TaskComponent,
    DialogRejectedTaskForm,
    DialogGroupAssignedForm
  ],
  entryComponents: [
    FormTaskComponent,
    DialogRejectedTaskForm,
    DialogGroupAssignedForm
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    DataTableModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatDialogModule,
    MatDividerModule,
    MatProgressBarModule,
    MatStepperModule,
    ChartsModule,
    MatCheckboxModule
  ],
  providers: [AuthService,
    UrlPermission, 
    RoleService, 
    UserService, 
    GroupService, 
    ErrorService,
    ProductionScheduleService,
    OrderService,
    TaskService,
    WorkLogService,
    CommentService,
    MatDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

