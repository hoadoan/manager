import { TestBed } from '@angular/core/testing';

import { GoodsreceiptnoteService } from './goodsreceiptnote.service';

describe('GoodsreceiptnoteService', () => {
  let service: GoodsreceiptnoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoodsreceiptnoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
