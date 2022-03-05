import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightListingPageComponent } from './flight-listing-page.component';

describe('FlightListingPageComponent', () => {
  let component: FlightListingPageComponent;
  let fixture: ComponentFixture<FlightListingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightListingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
