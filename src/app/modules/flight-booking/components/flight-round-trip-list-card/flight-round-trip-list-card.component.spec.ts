import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightRoundTripListCardComponent } from './flight-round-trip-list-card.component';

describe('FlightRoundTripListCardComponent', () => {
  let component: FlightRoundTripListCardComponent;
  let fixture: ComponentFixture<FlightRoundTripListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightRoundTripListCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightRoundTripListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
