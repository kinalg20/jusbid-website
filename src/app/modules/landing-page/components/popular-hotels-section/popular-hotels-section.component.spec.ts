import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularHotelsSectionComponent } from './popular-hotels-section.component';

describe('PopularHotelsSectionComponent', () => {
  let component: PopularHotelsSectionComponent;
  let fixture: ComponentFixture<PopularHotelsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularHotelsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularHotelsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
