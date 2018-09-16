import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Spring Factory UI';
  static API_URL = "http://localhost:8080"
  menu: Array<any> = [];
  permissions: string = "";

  constructor(private authService: AuthService, private router: Router) {
    this.authService.changeLogin.subscribe(_ => this.ngOnInit());
  }

  public ngOnInit() {
    this.permissions = localStorage.getItem('permissions');
    this.menu = this.buildMenu();
  }

  private buildMenu() {

    let menuOptions: Array<any> = [];

    if (this.permissions.indexOf('MANAGE_USER') > 0) {
      menuOptions.push({link: '/user', text: 'Manage users'});
    }

    if (this.permissions.indexOf('MANAGE_ROLE') > 0) {
      menuOptions.push({link: '/role', text: 'Manage roles'});
    }

    if (this.permissions.indexOf('MANAGE_GROUP') > 0) {
      menuOptions.push({link: '/group', text: 'Manage groups'});
    }

    if (this.permissions.indexOf('MANAGE_SCHEDULES') > 0) {
      menuOptions.push({link: '/schedule', text: 'Manage production schedules'});
    }

    if (this.permissions.indexOf('MANAGE_TASK') > 0) {
      menuOptions.push({link: '/task', text: 'Register production data'});
    }

    return menuOptions;
  }

  public isAuthenticated() {
    return !!localStorage.getItem('currentUser');
  }

  public logout = () => {
    this.authService.logOut()
    this.router.navigate(['/login']);
  }

}
