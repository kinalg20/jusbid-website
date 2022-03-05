import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightCommimngSoonComponent } from './flight-commimng-soon.component';

describe('FlightCommimngSoonComponent', () => {
  let component: FlightCommimngSoonComponent;
  let fixture: ComponentFixture<FlightCommimngSoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightCommimngSoonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightCommimngSoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
