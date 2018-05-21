import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";

import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DataTableModule } from './components/data-table';
import { LoginComponent } from './components/login/login.component';
import { RoleComponent } from "./components/role/role.component";
import { UserComponent } from "./components/user/user.component";
import { GroupComponent } from "./components/group/group.component";

import { AuthService } from "./services/auth.service";
import { RoleService } from "./services/role.service";
import { UserService } from "./services/user.service";
import { GroupService } from "./services/group.service";
import { ErrorService } from "./services/error.service";

import { UrlPermission } from "./urlPermission/url.permission";
import { routing } from "./app.routing";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoleComponent,
    UserComponent,
    GroupComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    DataTableModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService,
    UrlPermission, 
    RoleService, 
    UserService, 
    GroupService, 
    ErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

