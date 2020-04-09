import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePageComponent} from './home-page/home-page.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SuccessfulRegistrationComponent} from './successful-registration/successful-registration.component';
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
import {ApplicationDetailsComponent} from './application-details/application-details.component';
import {AdminApplicationDetailsComponent} from './admin-application-details/admin-application-details.component';
import {AdminCommentComponent} from './admin-comment/admin-comment.component';
import {AdminCommentWriteComponent} from './admin-comment-write/admin-comment-write.component';
import {AuthGuardService} from './services/authorization/auth-guard.service';
import {AuthServiceService} from './services/authorization/auth-service.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {RoleGuardService} from './services/authorization/role-guard-service.service';
import {ApplicationsComponent} from './applications/applications.component';
import {StudentPageComponent} from './student-page/student-page.component';
import {StudentCommentComponent} from './student-comment/student-comment.component';
import { GDPRComponent } from './gdpr/gdpr.component';
import { MatCheckboxModule} from "@angular/material/checkbox";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import {CallbackPipe} from './shared/callback-pipe';
import { EmailSentComponent } from './email-sent/email-sent.component';
import { PasswordChangedComponent } from './password-changed/password-changed.component';


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
    MatCheckboxModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
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
  ],
  providers: [
    RoleGuardService,
    AuthServiceService,
    AuthGuardService,
    JwtHelperService,
    {provide: MatDialogRef, useValue: {}}

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
