import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarHeaderComponent } from './top-bar-header.component';

describe('TopBarHeaderComponent', () => {
  let component: TopBarHeaderComponent;
  let fixture: ComponentFixture<TopBarHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBarHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
