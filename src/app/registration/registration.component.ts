import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Info} from '../shared/registration';
import {UserService} from '../Services/user.service';
import {ModalService} from '../Services/modal/modal.service';
import {MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {




  registrationForm: FormGroup;
  arrCodes: string[];
  info: Info;
  serverErrorMessage: string;
  passwordNotMatch: boolean;
  submission: boolean;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpClient,
    private userService: UserService,
    private modalService: ModalService,
  private dialog: MatDialogRef<any>) {
    this.registrationForm = this.setForm();
  }

  ngOnInit(): void {
    this.httpService.get('./assets/phone-codes.json').subscribe(
      data => {
        this.arrCodes = data as string[];
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }

  validatePasswords(): boolean {
    if (this.passwordReg.value !== this.passwordRepeatReg.value && this.passwordReg.value !== '' && this.passwordRepeatReg.value !== '') {
      return false;
    } else {
      return true;
    }
  }


  onSubmit() {
    this.passwordNotMatch = false;
    this.submission = false;
    this.info = {
      // id: Math.floor(Math.random() * 10),
      name: this.registrationForm.get('firstAndLastName').value,
      phone_number: this.registrationForm.get('phoneCode').value + this.registrationForm.get('phoneNumber').value,
      education: this.registrationForm.get('schoolName').value,
      free_time: this.registrationForm.get('hobbies').value,
      agreement: this.registrationForm.get('contract').value,
      comment: this.registrationForm.get('contractDescription').value,
      academy_time: this.registrationForm.get('workTime').value,
      reason: this.registrationForm.get('drive').value,
      technologies: this.registrationForm.get('experience').value,
      source: this.registrationForm.get('contract').value,
      application_date:
        new Date().getFullYear() + '-' +
        String(new Date().getMonth() + 1).padStart(2, '0') + '-' +
        String(new Date().getDate()).padStart(2, '0'),
      user: {
        // id: Math.floor(Math.random() * 10),
        email: this.registrationForm.get('emailReg').value,
        password: this.registrationForm.get('passwordReg').value,
        passwordRepeat: this.registrationForm.get('passwordRepeatReg').value,
        admin: false
      }
    };

    if (this.info.user.password === this.info.user.passwordRepeat) {
      this.userService.submitRegistration(this.info).subscribe(
        () => {
          this.serverErrorMessage = '';
          this.registrationForm.reset();
          this.closeDialog();
          this.openModal('successfulRegistration');
        },
        error => (this.serverErrorMessage = error)
      );
    } else {
      this.passwordNotMatch = true;
      this.submission = false;
    }
  }

  closeDialog(){

    this.dialog.close(RegistrationComponent);

  }
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
    this.registrationForm.reset();
    this.registrationForm = this.setForm();
  }

  setForm() {
    return this.fb.group({
      firstAndLastName: ['', [
        Validators.required,
        Validators.minLength(1),
      ]],
      phoneCode: ['+370', []],
      phoneNumber: ['', [
        Validators.required,
        Validators.maxLength(8),
        Validators.pattern('[0-9 ]{1,8}'),
      ]],
      emailReg: ['', [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
      ]],
      schoolName: ['', [
        Validators.required,
        Validators.maxLength(200)
      ]],
      hobbies: ['', [
        Validators.required,
        Validators.maxLength(1500)
      ]],
      contract: [false, []],
      contractDescription: ['', [
        Validators.maxLength(1500)
      ]],
      workTime: [false, []],
      drive: ['', [
        Validators.required,
        Validators.maxLength(1500)
      ]],
      experience: ['', [
        Validators.required,
        Validators.maxLength(1500)
      ]],
      fromWhere: ['', [
        Validators.required,
        Validators.maxLength(256)
      ]],
      passwordReg: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(30),

        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{7,30}')
      ]],
      passwordRepeatReg: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(30)
      ]]
    });
  }

  get passwordReg() {
    return this.registrationForm.get('passwordReg');
  }

  get passwordRepeatReg() {
    return this.registrationForm.get('passwordRepeatReg');
  }
}
