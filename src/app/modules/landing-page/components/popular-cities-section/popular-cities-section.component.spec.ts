import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCitiesSectionComponent } from './popular-cities-section.component';

describe('PopularCitiesSectionComponent', () => {
  let component: PopularCitiesSectionComponent;
  let fixture: ComponentFixture<PopularCitiesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularCitiesSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularCitiesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
