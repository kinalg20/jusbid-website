import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingGstDetailsFormComponent } from './booking-gst-details-form.component';

describe('BookingGstDetailsFormComponent', () => {
  let component: BookingGstDetailsFormComponent;
  let fixture: ComponentFixture<BookingGstDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingGstDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingGstDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
