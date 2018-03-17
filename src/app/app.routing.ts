import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {UrlPermission} from "./urlPermission/url.permission";


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: '**', redirectTo: '/login' }
];

export const routing = RouterModule.forRoot(appRoutes);