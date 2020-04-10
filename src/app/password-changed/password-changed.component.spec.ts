import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangedComponent } from './password-changed.component';
import {MatDialogRef} from "@angular/material/dialog";
import {RouterTestingModule} from "@angular/router/testing";

describe('PasswordChangedComponent', () => {
  let component: PasswordChangedComponent;
  let fixture: ComponentFixture<PasswordChangedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordChangedComponent ],
      imports: [RouterTestingModule],
      providers:[{
        provide: MatDialogRef, useValue: {}
      },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordChangedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('close dialog should work', () => {
    expect(component.closeDialog).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
