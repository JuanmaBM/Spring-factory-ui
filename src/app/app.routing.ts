import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { RoleComponent } from "./components/role/role.component";
import { UrlPermission } from "./urlPermission/url.permission";
import { UserComponent } from './components/user/user.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
<<<<<<< Updated upstream
=======
  { path: 'user', component: UserComponent, canActivate: [UrlPermission]},
>>>>>>> Stashed changes
  { path: 'role', component: RoleComponent, canActivate: [UrlPermission]},
  { path: 'user', component: UserComponent, canActivate: [UrlPermission]},

  { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);