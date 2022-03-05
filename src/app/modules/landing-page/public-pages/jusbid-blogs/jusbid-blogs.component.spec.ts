import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JusbidBlogsComponent } from './jusbid-blogs.component';

describe('JusbidBlogsComponent', () => {
  let component: JusbidBlogsComponent;
  let fixture: ComponentFixture<JusbidBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JusbidBlogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JusbidBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
