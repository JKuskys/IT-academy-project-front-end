import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './body/home-page/home-page.component';
import {LoginComponent} from './body/login/login.component';
import {ApplicationsComponent} from './body/applications/applications.component';
import {RoleGuardService} from './services/authorization/role-guard-service.service';
import {AdminApplicationDetailsComponent} from './body/admin-application-details/admin-application-details.component';
import {StudentPageComponent} from './body/student-page/student-page.component';
import {GDPRComponent} from './body/gdpr/gdpr.component';
import {PasswordResetComponent} from './body/password-reset/password-reset.component';


const routes: Routes = [
  {path: 'gdpr', component: GDPRComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'change-password', component: PasswordResetComponent},
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
