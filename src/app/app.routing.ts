import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { RoleComponent } from "./components/role/role.component";
import { UrlPermission } from "./urlPermission/url.permission";
import { UserComponent } from './components/user/user.component';
import { GroupComponent } from './components/group/group.component'


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'role', component: RoleComponent, canActivate: [UrlPermission]},
  { path: 'user', component: UserComponent, canActivate: [UrlPermission]},
  { path: 'group', component: GroupComponent, canActivate: [UrlPermission]},

  { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);