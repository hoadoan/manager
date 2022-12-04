import { TestBed } from '@angular/core/testing';

import { SampleprescriptionService } from './sampleprescription.service';

describe('SampleprescriptionService', () => {
  let service: SampleprescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampleprescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
