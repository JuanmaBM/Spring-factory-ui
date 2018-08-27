import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions,Response, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppComponent} from "../app.component"; 
import {Md5} from 'ts-md5/dist/md5';
@Injectable() export class AuthService { 

  public changeLogin: EventEmitter<boolean>;

  constructor(public http: Http) { 
    this.changeLogin = new EventEmitter();
  }

  public logIn(username: string, password: string){

    let headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('username', username)
    headers.append('password', Md5.hashAsciiStr(password).toString())
    let options = new RequestOptions({ headers: headers });
    let params = new URLSearchParams();

    params.append('username', username)
    params.append('password', Md5.hashAsciiStr(password).toString())

    return this.http.post(AppComponent.API_URL+"/api/login", params, options)
      .map((response) => {
        let responseBody = response.json();
        localStorage.setItem('currentUser', JSON.stringify(responseBody.sessionId));
        localStorage.setItem('permissions', JSON.stringify(responseBody.grantedAuthorities));
        this.changeLogin.emit(true);
      });
  }

  connection = () =>
    this.http.get(AppComponent.API_URL + "/api/connection");

  logOut() {

    let headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: headers });

    //this.http.post(AppComponent.API_URL + "/logout", undefined, options).subscribe(_ => _);
    localStorage.removeItem('currentUser');
  }

}