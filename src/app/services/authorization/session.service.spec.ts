import { TestBed, async } from '@angular/core/testing';

import { SessionService } from './session.service';
import { RouterTestingModule } from '@angular/router/testing';

class MockSessionService extends SessionService{};
describe('SessionService', () => {
  let service: SessionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [{
        provide: SessionService,
        useClass: MockSessionService
      }]
    })
  }));
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
