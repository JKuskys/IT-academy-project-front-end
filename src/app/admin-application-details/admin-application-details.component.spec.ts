import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApplicationDetailsComponent } from './admin-application-details.component';

describe('AdminApplicationDetailsComponent', () => {
  let component: AdminApplicationDetailsComponent;
  let fixture: ComponentFixture<AdminApplicationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminApplicationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApplicationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
