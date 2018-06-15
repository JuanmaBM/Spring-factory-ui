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

import { AuthService } from "./services/auth.service";
import { RoleService } from "./services/role.service";
import { UserService } from "./services/user.service";
import { GroupService } from "./services/group.service";
import { ProductionScheduleService } from "./services/production-schedule.service";
import { TaskService } from "./services/task.service";
import { ErrorService } from "./services/error.service";

import { UrlPermission } from "./urlPermission/url.permission";
import { routing } from "./app.routing";

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
   MatTableModule } from '@angular/material';
import { OrderService } from './services/order.service';


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
    MatTableModule 
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

