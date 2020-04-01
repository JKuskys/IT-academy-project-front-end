import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {AuthServiceService} from '../services/authorization/auth-service.service';
import { RouterTestingModule } from '@angular/router/testing';
import {RoleGuardService} from '../services/authorization/role-guard-service.service';

class MockAuthServiceService extends AuthServiceService{

};

class MockRoleGuardService extends RoleGuardService{

};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatDialogModule, RouterTestingModule],
      providers: [{
        provide: AuthServiceService,
        useClass: MockAuthServiceService
      },
    {
        provide: RoleGuardService,
        useClass: MockRoleGuardService
    }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
