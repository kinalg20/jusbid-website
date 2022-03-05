import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSearchingFormComponent } from './list-searching-form.component';

describe('ListSearchingFormComponent', () => {
  let component: ListSearchingFormComponent;
  let fixture: ComponentFixture<ListSearchingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSearchingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSearchingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
