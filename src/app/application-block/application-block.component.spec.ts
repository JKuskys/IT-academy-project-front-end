import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationBlockComponent } from './application-block.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ApplicationBlockComponent', () => {
  let component: ApplicationBlockComponent;
  let fixture: ComponentFixture<ApplicationBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationBlockComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
