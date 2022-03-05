import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSerachFormComponent } from './flight-serach-form.component';

describe('FlightSerachFormComponent', () => {
  let component: FlightSerachFormComponent;
  let fixture: ComponentFixture<FlightSerachFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightSerachFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSerachFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
