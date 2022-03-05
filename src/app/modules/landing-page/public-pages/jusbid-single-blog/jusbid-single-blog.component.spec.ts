import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JusbidSingleBlogComponent } from './jusbid-single-blog.component';

describe('JusbidSingleBlogComponent', () => {
  let component: JusbidSingleBlogComponent;
  let fixture: ComponentFixture<JusbidSingleBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JusbidSingleBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JusbidSingleBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
