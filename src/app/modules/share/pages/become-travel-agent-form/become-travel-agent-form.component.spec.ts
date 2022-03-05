import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeTravelAgentFormComponent } from './become-travel-agent-form.component';

describe('BecomeTravelAgentFormComponent', () => {
  let component: BecomeTravelAgentFormComponent;
  let fixture: ComponentFixture<BecomeTravelAgentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecomeTravelAgentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeTravelAgentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
