import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSentComponent } from './email-sent.component';
import {MatDialogRef} from "@angular/material/dialog";
import {RouterTestingModule} from "@angular/router/testing";

describe('EmailSentComponent', () => {
  let component: EmailSentComponent;
  let fixture: ComponentFixture<EmailSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailSentComponent ],
      imports: [RouterTestingModule],
      providers:[{
        provide: MatDialogRef, useValue: {}
      },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSentComponent);
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