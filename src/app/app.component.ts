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

  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit() {
  }

  public isAuthenticated() {
    return !!localStorage.getItem('currentUser');
  }

  public logout = () => {
    this.authService.logOut()
    this.router.navigate(['/login']);
  }

}
