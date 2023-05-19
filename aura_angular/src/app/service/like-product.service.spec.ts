import { TestBed } from '@angular/core/testing';

import { LikeProductService } from './like-product.service';

describe('LikeProductService', () => {
  let service: LikeProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikeProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
