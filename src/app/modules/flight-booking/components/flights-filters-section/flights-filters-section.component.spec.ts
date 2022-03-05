import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsFiltersSectionComponent } from './flights-filters-section.component';

describe('FlightsFiltersSectionComponent', () => {
  let component: FlightsFiltersSectionComponent;
  let fixture: ComponentFixture<FlightsFiltersSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightsFiltersSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsFiltersSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
