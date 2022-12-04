import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateActiveSubstanceComponent } from './update-active-substance.component';

describe('UpdateActiveSubstanceComponent', () => {
  let component: UpdateActiveSubstanceComponent;
  let fixture: ComponentFixture<UpdateActiveSubstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateActiveSubstanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateActiveSubstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
