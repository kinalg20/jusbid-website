import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPartnersAgreementComponent } from './business-partners-agreement.component';

describe('BusinessPartnersAgreementComponent', () => {
  let component: BusinessPartnersAgreementComponent;
  let fixture: ComponentFixture<BusinessPartnersAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessPartnersAgreementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPartnersAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
