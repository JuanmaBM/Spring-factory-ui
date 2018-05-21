import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RoleComponent} from "./components/role/role.component";
import {UrlPermission} from "./urlPermission/url.permission";


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
<<<<<<< Updated upstream
=======
  { path: 'user', component: UserComponent, canActivate: [UrlPermission]},
>>>>>>> Stashed changes
  { path: 'role', component: RoleComponent, canActivate: [UrlPermission]},

  { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);