import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMedicineInactiveComponent } from './list-medicine-inactive.component';

describe('ListMedicineInactiveComponent', () => {
  let component: ListMedicineInactiveComponent;
  let fixture: ComponentFixture<ListMedicineInactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMedicineInactiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMedicineInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
