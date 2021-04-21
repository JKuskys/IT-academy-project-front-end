import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePageComponent} from './body/home-page/home-page.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './header/login/login.component';
import {RegistrationComponent} from './body/home-page/registration/registration.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SuccessfulRegistrationComponent} from './body/successful-registration/successful-registration.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ApplicationDetailsComponent} from './shared/components/application-details/application-details.component';
import {AdminApplicationDetailsComponent} from './body/admin-application-details/admin-application-details.component';
import {AdminCommentComponent} from './body/admin-application-details/admin-comment/admin-comment.component';
import {AdminCommentWriteComponent} from './shared/components/admin-comment-write/admin-comment-write.component';
import {AuthGuardService} from './services/authorization/auth-guard.service';
import {AuthServiceService} from './services/authorization/auth-service.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {RoleGuardService} from './services/authorization/role-guard-service.service';
import {ApplicationsComponent} from './body/applications/applications.component';
import {StudentPageComponent} from './body/student-page/student-page.component';
import {StudentCommentComponent} from './body/student-page/student-comment/student-comment.component';
import { GDPRComponent } from './body/gdpr/gdpr.component';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { ForgotPasswordComponent } from './header/login/forgot-password/forgot-password.component';
import { PasswordResetComponent } from './header/login/forgot-password/password-reset/password-reset.component';
import {CallbackPipe} from './shared/types/callback-pipe';
import { EmailSentComponent } from './body/email-sent/email-sent.component';
import { PasswordChangedComponent } from './body/password-changed/password-changed.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {effects, reducers} from './store';
import {PhoneNumberGuard} from './shared/guards/phoneNumber.guard';

const angularMaterialImports = [
  MatCheckboxModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    RegistrationComponent,
    LoginComponent,
    SuccessfulRegistrationComponent,
    ApplicationDetailsComponent,
    AdminApplicationDetailsComponent,
    AdminCommentComponent,
    AdminCommentWriteComponent,
    ApplicationsComponent,
    StudentPageComponent,
    StudentCommentComponent,
    GDPRComponent,
    ForgotPasswordComponent,
    PasswordResetComponent,
    CallbackPipe,
    EmailSentComponent,
    PasswordChangedComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    ...angularMaterialImports,
  ],
  providers: [
    PhoneNumberGuard,
    RoleGuardService,
    AuthServiceService,
    AuthGuardService,
    JwtHelperService,
    {provide: MatDialogRef, useValue: {}}

  ],
  exports: angularMaterialImports,
  bootstrap: [AppComponent]
})
export class AppModule {
}
