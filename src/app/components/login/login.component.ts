import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../model/user.model";
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  user: User = new User();
  errorMessage: string;
  constructor(private authService :AuthService, private router: Router, private errorService: ErrorService) { }

  ngOnInit() {
  }

  login(){
    this.authService.logIn(this.user.name, this.user.password)
      .subscribe(data => this.router.navigate(['/main']),
        err => this.errorService.showErrorMessage(err)); 
  }
}