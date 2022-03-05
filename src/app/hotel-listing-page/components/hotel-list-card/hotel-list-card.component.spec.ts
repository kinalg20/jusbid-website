import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelListCardComponent } from './hotel-list-card.component';

describe('HotelListCardComponent', () => {
  let component: HotelListCardComponent;
  let fixture: ComponentFixture<HotelListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelListCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
