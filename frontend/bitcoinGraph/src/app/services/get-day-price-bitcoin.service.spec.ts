import { TestBed } from '@angular/core/testing';

import { GetDayPriceBitcoinService } from './get-day-price-bitcoin.service';

describe('GetDayPriceBitcoinService', () => {
  let service: GetDayPriceBitcoinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDayPriceBitcoinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
