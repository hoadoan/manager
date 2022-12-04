import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailReceiptNoteComponent } from './detail-receipt-note.component';

describe('DetailReceiptNoteComponent', () => {
  let component: DetailReceiptNoteComponent;
  let fixture: ComponentFixture<DetailReceiptNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailReceiptNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailReceiptNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
