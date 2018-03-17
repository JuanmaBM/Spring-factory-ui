import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from "./services/auth.service";
import {HttpModule} from "@angular/http";
import {routing} from "./app.routing";
import {UrlPermission} from "./urlPermission/url.permission";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,HttpModule,FormsModule,routing, 
  ],
  providers: [AuthService, UrlPermission],
  bootstrap: [AppComponent]
})
export class AppModule { }

