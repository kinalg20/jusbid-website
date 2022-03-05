import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellerDetailsInfantFormComponent } from './traveller-details-infant-form.component';

describe('TravellerDetailsInfantFormComponent', () => {
  let component: TravellerDetailsInfantFormComponent;
  let fixture: ComponentFixture<TravellerDetailsInfantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravellerDetailsInfantFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellerDetailsInfantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
