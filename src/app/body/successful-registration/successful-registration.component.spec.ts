import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulRegistrationComponent } from './successful-registration.component';
import {MatDialogRef} from "@angular/material/dialog";

describe('SuccessfulRegistrationComponent', () => {
  let component: SuccessfulRegistrationComponent;
  let fixture: ComponentFixture<SuccessfulRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfulRegistrationComponent ],
      imports: [],
      providers:[{
        provide: MatDialogRef, useValue: {}
      },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
