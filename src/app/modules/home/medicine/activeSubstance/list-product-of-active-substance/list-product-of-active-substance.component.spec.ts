import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductOfActiveSubstanceComponent } from './list-product-of-active-substance.component';

describe('ListProductOfActiveSubstanceComponent', () => {
  let component: ListProductOfActiveSubstanceComponent;
  let fixture: ComponentFixture<ListProductOfActiveSubstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductOfActiveSubstanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductOfActiveSubstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
