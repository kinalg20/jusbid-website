import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaggageRulesComponent } from './baggage-rules.component';

describe('BaggageRulesComponent', () => {
  let component: BaggageRulesComponent;
  let fixture: ComponentFixture<BaggageRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaggageRulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaggageRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
