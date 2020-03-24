import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommentWriteComponent } from './admin-comment-write.component';

describe('AdminCommentWriteComponent', () => {
  let component: AdminCommentWriteComponent;
  let fixture: ComponentFixture<AdminCommentWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCommentWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommentWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
