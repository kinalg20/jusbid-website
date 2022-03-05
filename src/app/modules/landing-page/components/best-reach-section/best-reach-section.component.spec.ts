import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestReachSectionComponent } from './best-reach-section.component';

describe('BestReachSectionComponent', () => {
  let component: BestReachSectionComponent;
  let fixture: ComponentFixture<BestReachSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestReachSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestReachSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
