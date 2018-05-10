import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { DataTableModule } from './components/data-table';
import { LoginComponent } from './components/login/login.component';
import { RoleComponent } from "./components/role/role.component";
import { UserComponent } from "./components/user/user.component";

import { AuthService } from "./services/auth.service";
import { RoleService } from "./services/role.service";
import { UserService } from "./services/user.service";

import { UrlPermission } from "./urlPermission/url.permission";
import { routing } from "./app.routing";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoleComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,HttpModule,FormsModule,routing,DataTableModule
  ],
  providers: [AuthService, UrlPermission, RoleService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

