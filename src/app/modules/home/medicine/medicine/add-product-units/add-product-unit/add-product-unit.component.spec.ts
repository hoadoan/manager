import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductUnitComponent } from './add-product-unit.component';

describe('AddProductUnitComponent', () => {
  let component: AddProductUnitComponent;
  let fixture: ComponentFixture<AddProductUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductUnitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
