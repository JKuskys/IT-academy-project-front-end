import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCommentComponent } from './student-comment.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('StudentCommentComponent', () => {
  let component: StudentCommentComponent;
  let fixture: ComponentFixture<StudentCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCommentComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCommentComponent);
    component = fixture.componentInstance;
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
