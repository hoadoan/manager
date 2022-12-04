import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReceiptNoteComponent } from './list-receipt-note.component';

describe('ListReceiptNoteComponent', () => {
  let component: ListReceiptNoteComponent;
  let fixture: ComponentFixture<ListReceiptNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReceiptNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListReceiptNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
