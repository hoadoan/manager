import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActiveSubstanceComponent } from './list-active-substance.component';

describe('ListActiveSubstanceComponent', () => {
  let component: ListActiveSubstanceComponent;
  let fixture: ComponentFixture<ListActiveSubstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListActiveSubstanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListActiveSubstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
