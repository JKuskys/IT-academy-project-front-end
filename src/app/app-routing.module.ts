import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {LoginComponent} from './login/login.component';
import {ApplicationsComponent} from './applications/applications.component';
import {RoleGuardService} from './services/authorization/role-guard-service.service';
import {AdminApplicationDetailsComponent} from './admin-application-details/admin-application-details.component';
import {StudentPageComponent} from './student-page/student-page.component';
import {GDPRComponent} from "./gdpr/gdpr.component";


const routes: Routes = [
  {path: 'gdpr', component: GDPRComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'application',
    component: StudentPageComponent,
    data: {
      expectedRole: 'USER'
    },
    canActivate: [RoleGuardService] },
  {path: 'applications',
    component: ApplicationsComponent,
    data: {
      expectedRole: 'ADMIN'
    },
    canActivate: [RoleGuardService] },
  {path: 'applications/:id',
    component: AdminApplicationDetailsComponent,
    data: {
      expectedRole: 'ADMIN'
    },
    canActivate: [RoleGuardService] },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
