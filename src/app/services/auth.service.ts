import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppComponent} from "../app.component";
@Injectable() export class AuthService { constructor(public http: Http) { }

  public logIn(username: string, password: string){

    let headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});
    let options = new RequestOptions({ headers: headers });
    let params = new URLSearchParams();

    params.append('username', username);
    params.append('password', password);    

    return this.http.post(AppComponent.API_URL+"/authenticate", params.toString(), options)
      .map((response: Response) => {
        localStorage.setItem('currentUser', JSON.stringify(username));
      });
  }

  logOut() {
    return this.http.post(AppComponent.API_URL+"logout",{})
      .map((response: Response) => localStorage.removeItem('currentUser'));
  }

}