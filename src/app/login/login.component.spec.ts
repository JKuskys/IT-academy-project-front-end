import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from '../services/account/user.service';
import {RoleGuardService} from '../services/authorization/role-guard-service.service';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

class MockUserService extends UserService {
};

class MockRoleGuardService extends RoleGuardService {
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,

      ],
      providers: [{
        provide: UserService,
        useClass: MockUserService
        },
        {
          provide: MatDialogRef, useValue: {}
        },
        {
          provide: RoleGuardService,
          useClass: MockRoleGuardService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form builder should work', () => {
    expect(component.setForm).toBeTruthy();
  });
});
