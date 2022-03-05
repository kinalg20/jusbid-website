import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHotelRegistrationFormComponent } from './new-hotel-registration-form.component';

describe('NewHotelRegistrationFormComponent', () => {
  let component: NewHotelRegistrationFormComponent;
  let fixture: ComponentFixture<NewHotelRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewHotelRegistrationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHotelRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
