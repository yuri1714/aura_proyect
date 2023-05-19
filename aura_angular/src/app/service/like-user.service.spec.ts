import { TestBed } from '@angular/core/testing';

import { LikeUserService } from './like-user.service';

describe('LikeUserService', () => {
  let service: LikeUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikeUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
