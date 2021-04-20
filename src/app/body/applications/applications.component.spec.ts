import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ApplicationsComponent} from './applications.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {ApplicationService} from '../../services/application/application.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Status} from "../../shared/types/status";

class MockApplicationService extends ApplicationService {
};

describe('ApplicationsComponent', () => {
  let component: ApplicationsComponent;
  let fixture: ComponentFixture<ApplicationsComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [{
        provide: ApplicationService,
        useClass: MockApplicationService
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  it('same author should return false', () => {
    localStorage.setItem('email', 'tests');
    expect(component.sameAuthor('tests')).toBeTrue();
  });
  it('status getter should work', () => {
    expect(component.status).toBeTruthy();
  });
  it('open application should work', () => {
    expect(component.openApplication).toBeTruthy();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
