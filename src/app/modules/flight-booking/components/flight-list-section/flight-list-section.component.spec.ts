import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightListSectionComponent } from './flight-list-section.component';

describe('FlightListSectionComponent', () => {
  let component: FlightListSectionComponent;
  let fixture: ComponentFixture<FlightListSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightListSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightListSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
