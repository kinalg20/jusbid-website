import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewfrontComponent } from './newfront.component';

describe('NewfrontComponent', () => {
  let component: NewfrontComponent;
  let fixture: ComponentFixture<NewfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewfrontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
