import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInfoMedicineComponent } from './update-info-medicine.component';

describe('UpdateInfoMedicineComponent', () => {
  let component: UpdateInfoMedicineComponent;
  let fixture: ComponentFixture<UpdateInfoMedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateInfoMedicineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateInfoMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
