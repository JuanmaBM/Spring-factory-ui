import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { RoleComponent } from "./components/role/role.component";
import { UrlPermission } from "./urlPermission/url.permission";
import { UserComponent } from './components/user/user.component';
import { GroupComponent } from './components/group/group.component'
import { ProductionScheduleComponent } from './components/production-schedule/production-schedule.component'
import { ProductionScheduleDetailsComponent } from './components/production-schedule/details/production-schedule-details.component';
import { OrderComponent } from "./components/order/order.component"
import { TaskComponent } from './components/task/task.component';
import { MainComponent } from './components/main/main.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'role', component: RoleComponent, canActivate: [UrlPermission]},
  { path: 'user', component: UserComponent},
  { path: 'group', component: GroupComponent, canActivate: [UrlPermission]},
  { path: 'schedule', component: ProductionScheduleComponent, canActivate: [UrlPermission]},
  { path: 'schedule/:id', component: ProductionScheduleDetailsComponent, canActivate: [UrlPermission]},
  { path: 'schedule/:scheduleId/order/:orderId', component: OrderComponent, canActivate: [UrlPermission]},
  { path: 'task', component: TaskComponent, canActivate: [UrlPermission]},

  //{ path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);