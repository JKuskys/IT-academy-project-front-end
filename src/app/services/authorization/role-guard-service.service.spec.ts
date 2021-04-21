import {TestBed, async} from '@angular/core/testing';

import {RoleGuardService} from './role-guard-service.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {provideMockStore} from '@ngrx/store/testing';

class MockRoleGuardService extends RoleGuardService {
};

describe('RoleGuardServiceService', () => {
  let service: RoleGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RoleGuardService,
        provideMockStore()],
    })
  });

  beforeEach(() => {
    service = TestBed.inject(RoleGuardService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
