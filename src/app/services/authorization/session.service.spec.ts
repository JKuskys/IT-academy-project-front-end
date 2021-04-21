import { TestBed } from '@angular/core/testing';
import {SessionService} from './session.service';
import {provideMockStore} from '@ngrx/store/testing';
import {JwtHelperService} from '@auth0/angular-jwt';


describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ provideMockStore(), JwtHelperService],
    });

    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
