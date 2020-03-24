import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationBlockComponent } from './application-block.component';

describe('ApplicationBlockComponent', () => {
  let component: ApplicationBlockComponent;
  let fixture: ComponentFixture<ApplicationBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationBlockComponent ]
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
