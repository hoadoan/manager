import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSamplePrescriptionComponent } from './detail-sample-prescription.component';

describe('DetailSamplePrescriptionComponent', () => {
  let component: DetailSamplePrescriptionComponent;
  let fixture: ComponentFixture<DetailSamplePrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSamplePrescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSamplePrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
