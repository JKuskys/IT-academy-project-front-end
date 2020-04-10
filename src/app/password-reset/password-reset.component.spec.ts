import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PasswordResetComponent} from './password-reset.component';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('PasswordResetComponent', () => {
  let component: PasswordResetComponent;
  let fixture: ComponentFixture<PasswordResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordResetComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        MatDialogModule],
      providers: [{
        provide: MatDialogRef, useValue: {}
      },]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('validatePassword should return true', () => {
    expect(component.validatePasswords()).toBeTrue();
  });
  it('setForm should work', () => {
    expect(component.setForm).toBeTruthy();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
