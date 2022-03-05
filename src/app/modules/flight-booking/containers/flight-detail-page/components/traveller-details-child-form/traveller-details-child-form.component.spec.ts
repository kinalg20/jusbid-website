import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellerDetailsChildFormComponent } from './traveller-details-child-form.component';

describe('TravellerDetailsChildFormComponent', () => {
  let component: TravellerDetailsChildFormComponent;
  let fixture: ComponentFixture<TravellerDetailsChildFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravellerDetailsChildFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellerDetailsChildFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
