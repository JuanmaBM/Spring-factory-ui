import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../model/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  user: User = new User();
  errorMessage: string;
  constructor(private authService :AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(){
      console.log("entrando en login ...")
      console.log("valor usr: ", this.user);
    this.authService.logIn(this.user.username, this.user.password)
      .subscribe(data => this.router.navigate(['/']),
        err => this.errorMessage = err);
  }
}