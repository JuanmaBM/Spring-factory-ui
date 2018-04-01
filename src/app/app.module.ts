import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule} from "@angular/http";

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RoleComponent } from "./components/role/role.component";

import { AuthService } from "./services/auth.service";
import { RoleService } from "./services/role.service";

import {UrlPermission} from "./urlPermission/url.permission";
import {routing} from "./app.routing";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoleComponent,
  ],
  imports: [
    BrowserModule,HttpModule,FormsModule,routing, 
  ],
  providers: [AuthService, UrlPermission, RoleService],
  bootstrap: [AppComponent]
})
export class AppModule { }

