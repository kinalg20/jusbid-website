import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelBookinghistoryPageComponent } from './hotel-bookinghistory-page.component';

describe('HotelBookinghistoryPageComponent', () => {
  let component: HotelBookinghistoryPageComponent;
  let fixture: ComponentFixture<HotelBookinghistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelBookinghistoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelBookinghistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
