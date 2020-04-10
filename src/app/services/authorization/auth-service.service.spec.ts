import { TestBed, async } from '@angular/core/testing';

import { AuthServiceService } from './auth-service.service';

class MockAuthServiceService extends AuthServiceService {};

describe('AuthServiceService', () => {
  let service: AuthServiceService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: AuthServiceService,
        useClass: MockAuthServiceService
      }]
    })
  }));
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServiceService);
  });
  it('should be created', () => {
    expect(service.isAuthenticated()).toBeFalse();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
