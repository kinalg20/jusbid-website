import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightListCardComponent } from './flight-list-card.component';

describe('FlightListCardComponent', () => {
  let component: FlightListCardComponent;
  let fixture: ComponentFixture<FlightListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightListCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
