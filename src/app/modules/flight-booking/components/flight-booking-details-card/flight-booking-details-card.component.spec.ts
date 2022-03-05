import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBookingDetailsCardComponent } from './flight-booking-details-card.component';

describe('FlightBookingDetailsCardComponent', () => {
  let component: FlightBookingDetailsCardComponent;
  let fixture: ComponentFixture<FlightBookingDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightBookingDetailsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightBookingDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
