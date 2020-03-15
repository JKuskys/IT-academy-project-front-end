import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm = this.fb.group({
    firstAndLastName: ['', [
      Validators.required,
      Validators.minLength(1),
    ]],
    phoneNumber: ['', [
      Validators.required,
      Validators.pattern('[0-9 ]{8}'),
    ]],
    emailReg: ['', [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
    ]],

    schoolName: ['', [
      Validators.required,
    ]],
    hobbies: ['', [
      Validators.required,
    ]],
    contract: ['', [
      Validators.required,
    ]],
    drive: ['', [
      Validators.required,
    ]],
    experience: ['', [
      Validators.required,
    ]],
    fromWhere: ['', [
      Validators.required,
    ]],
    passwordReg: ['', [
      Validators.required,
      Validators.maxLength(30)
    ]],
    passwordRepeatReg: ['', [
      Validators.required,
      Validators.maxLength(30)
    ]]
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    //make all values zero
  }

  onSubmit() {
    // this.post = {
    //   title: this.blogTitle.value,
    //   author: this.blogAuthor.value,
    //   email: this.blogEmail.value,
    //   content: this.blogContent.value
    // };
  }

  //   this.postsService.addPost(this.post).subscribe(
  //     () => {
  //       // this.post = {author: '', content: '', email: '', title: ''};
  //       this.serverErrorMessage = '';
  //     },
  //     error => (this.serverErrorMessage = error)
  //   );
  // }

  // get blogTitle() {
  //   return this.postForm.get('blogTitle');
  // }
  //
  // get blogEmail() {
  //   return this.postForm.get('blogEmail');
  // }
  //
  // get blogAuthor() {
  //   return this.postForm.get('blogAuthor');
  // }
  //
  // get blogContent() {
  //   return this.postForm.get('blogContent');
  // }

}
