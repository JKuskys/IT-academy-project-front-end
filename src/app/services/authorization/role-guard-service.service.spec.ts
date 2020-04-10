import {TestBed, async} from '@angular/core/testing';

import {RoleGuardService} from './role-guard-service.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";

class MockRoleGuardService extends RoleGuardService {
};

describe('RoleGuardServiceService', () => {
  let service: RoleGuardService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{
        provide: RoleGuardService,
        useClass: MockRoleGuardService
      }],
    })
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleGuardService);
  });


  it('should be created', () => {
    const routes: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
    expect(service.canActivate(routes)).toBeFalse();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
