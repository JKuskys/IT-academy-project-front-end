import { TestBed, async } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { AuthServiceService } from './auth-service.service';
import { RouterTestingModule } from '@angular/router/testing';

class MockAuthGuardService extends AuthGuardService {};

class MockAuthServiceService extends AuthServiceService {};

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [{
        provide: AuthGuardService,
        useClass: MockAuthGuardService
      },
      {
        provide: AuthServiceService,
        useClass: MockAuthServiceService
      }]
    })
  }));
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
