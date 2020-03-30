import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhoneNumberService {


  constructor(private httpService: HttpClient) {
  }

  getPhoneCodes() {
    return this.httpService.get('./assets/phone-codes.json');
  }
}
