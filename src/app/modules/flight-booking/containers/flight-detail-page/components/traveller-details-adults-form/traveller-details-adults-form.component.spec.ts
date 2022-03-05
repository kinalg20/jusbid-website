import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellerDetailsAdultsFormComponent } from './traveller-details-adults-form.component';

describe('TravellerDetailsAdultsFormComponent', () => {
  let component: TravellerDetailsAdultsFormComponent;
  let fixture: ComponentFixture<TravellerDetailsAdultsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravellerDetailsAdultsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellerDetailsAdultsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
