import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppComponent} from "../app.component";
@Injectable()
export class AuthService {
  constructor(public http: Http) { }

  public logIn(username: string, password: string){

    let options = this.createOptionsHeader(username, password);

    return this.http.get(AppComponent.API_URL+"/login", options)
      .map((response: Response) => {

      let user = response.json().principal;
      if (user) localStorage.setItem('currentUser', JSON.stringify(user));
    });
  }

  private createOptionsHeader(username: string, password: string) {

    let headers = new Headers();
    headers.append('Accept', 'application/json')

    // FIXME: Uncomment when backend login implements encrypted login
    // var base64Credential: string = btoa( username+ ':' + password);
    var base64Credential: string = username + ':' + password;
    headers.append("Authorization", "Basic " + base64Credential);

    let options = new RequestOptions();
    options.headers = headers;

    return options
  }

  logOut() {
    return this.http.post(AppComponent.API_URL+"logout",{})
      .map((response: Response) => localStorage.removeItem('currentUser'));
  }

}