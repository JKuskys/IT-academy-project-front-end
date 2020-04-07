import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegistrationComponent} from './registration.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {UserService} from '../services/account/user.service';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing';
import {MatRadioGroup, MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";

class MockUserService extends UserService {
};

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        HttpClientTestingModule,
        MatRadioModule,
        MatCheckboxModule
      ],
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
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('contract should return true by default', () => {
    expect(component.getTrueFalse('contract')).toBeTrue();
  });
  it('workTime should return true by default', () => {
    expect(component.getTrueFalse('workTime')).toBeTrue();
  });
  it('form builder should work', () => {
    expect(component.setForm).toBeTruthy();
  });
});
