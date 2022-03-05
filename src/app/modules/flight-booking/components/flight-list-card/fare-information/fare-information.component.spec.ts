import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FareInformationComponent } from './fare-information.component';

describe('FareInformationComponent', () => {
  let component: FareInformationComponent;
  let fixture: ComponentFixture<FareInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FareInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FareInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
