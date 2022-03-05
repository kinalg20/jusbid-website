import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAgentAgreementComponent } from './travel-agent-agreement.component';

describe('TravelAgentAgreementComponent', () => {
  let component: TravelAgentAgreementComponent;
  let fixture: ComponentFixture<TravelAgentAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelAgentAgreementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelAgentAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
