import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSamplePrescriptionComponent } from './create-sample-prescription.component';

describe('CreateSamplePrescriptionComponent', () => {
  let component: CreateSamplePrescriptionComponent;
  let fixture: ComponentFixture<CreateSamplePrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSamplePrescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSamplePrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
