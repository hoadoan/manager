import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSamplePrescriptionComponent } from './list-sample-prescription.component';

describe('ListSamplePrescriptionComponent', () => {
  let component: ListSamplePrescriptionComponent;
  let fixture: ComponentFixture<ListSamplePrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSamplePrescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSamplePrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
