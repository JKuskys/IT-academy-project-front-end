import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './body/home-page/home-page.component';
import {LoginComponent} from './header/login/login.component';
import {ApplicationsComponent} from './body/applications/applications.component';
import {RoleGuardService} from './services/authorization/role-guard-service.service';
import {AdminApplicationDetailsComponent} from './body/admin-application-details/admin-application-details.component';
import {StudentPageComponent} from './body/student-page/student-page.component';
import {GDPRComponent} from './body/gdpr/gdpr.component';
import {PasswordResetComponent} from './header/login/forgot-password/password-reset/password-reset.component';
import {ROUTES} from './shared/constants/routes.const';
import {PhoneNumberGuard} from './shared/guards/phoneNumber.guard';


const routes: Routes = [
  {path: ROUTES.gdpr, component: GDPRComponent},
  {path: ROUTES.home, component: HomePageComponent, canActivate: [PhoneNumberGuard]},
  {path: ROUTES.login, component: LoginComponent},
  {path: ROUTES.changePassword, component: PasswordResetComponent},
  {path: ROUTES.application,
    component: StudentPageComponent,
    data: {
      expectedRole: 'USER'
    },
    canActivate: [RoleGuardService] },
  {path: ROUTES.applications,
    component: ApplicationsComponent,
    data: {
      expectedRole: 'ADMIN'
    },
    canActivate: [RoleGuardService] },
  {path: ROUTES.applicationsById,
    component: AdminApplicationDetailsComponent,
    data: {
      expectedRole: 'ADMIN'
    },
    canActivate: [RoleGuardService] },
  {path: '', redirectTo: ROUTES.homeFullPath, pathMatch: 'full'},
  {path: '**', redirectTo: ROUTES.homeFullPath}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
