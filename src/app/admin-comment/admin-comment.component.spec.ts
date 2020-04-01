import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommentComponent } from './admin-comment.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('AdminCommentComponent', () => {
  let component: AdminCommentComponent;
  let fixture: ComponentFixture<AdminCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCommentComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ReactiveFormsModule,
        FormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommentComponent);
    component = fixture.debugElement.componentInstance;
    component.comment = {
      id: 1,
      comment: 'Aaaa',
      author: 'Author',
      authorEmail: 'email@mail.com',
      commentDate: '2020-03-10',
      dateModified: '2020-03-13',
      visibleToApplicant: true,
      authorAdmin: false,
      };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
