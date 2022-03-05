import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingShippingAddressDetailsFormComponent } from './booking-shipping-address-details-form.component';

describe('BookingShippingAddressDetailsFormComponent', () => {
  let component: BookingShippingAddressDetailsFormComponent;
  let fixture: ComponentFixture<BookingShippingAddressDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingShippingAddressDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingShippingAddressDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
