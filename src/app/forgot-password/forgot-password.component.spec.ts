import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ForgotPasswordComponent} from './forgot-password.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../services/account/user.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

class MockUserService extends UserService {
};

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        MatDialogModule,],
      providers: [
        {
          provide: MatDialogRef, useValue: {}
        }, {
          provide: UserService,
          useClass: MockUserService
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('closeDialog should work', () => {
    expect(component.closeDialog).toBeTruthy();
  });
  it('setForm should work', () => {
    expect(component.setForm).toBeTruthy();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
