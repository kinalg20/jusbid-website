import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidFromComponent } from './bid-from.component';

describe('BidFromComponent', () => {
  let component: BidFromComponent;
  let fixture: ComponentFixture<BidFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidFromComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
