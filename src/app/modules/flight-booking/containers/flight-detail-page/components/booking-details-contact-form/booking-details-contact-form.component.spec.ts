import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDetailsContactFormComponent } from './booking-details-contact-form.component';

describe('BookingDetailsContactFormComponent', () => {
  let component: BookingDetailsContactFormComponent;
  let fixture: ComponentFixture<BookingDetailsContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingDetailsContactFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingDetailsContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
