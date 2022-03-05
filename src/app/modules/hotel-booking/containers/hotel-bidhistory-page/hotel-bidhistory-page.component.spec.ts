import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelBidhistoryPageComponent } from './hotel-bidhistory-page.component';

describe('HotelBidhistoryPageComponent', () => {
  let component: HotelBidhistoryPageComponent;
  let fixture: ComponentFixture<HotelBidhistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelBidhistoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelBidhistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
