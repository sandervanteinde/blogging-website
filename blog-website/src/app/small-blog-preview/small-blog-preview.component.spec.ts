import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallBlogPreviewComponent } from './small-blog-preview.component';

describe('SmallBlogPreviewComponent', () => {
  let component: SmallBlogPreviewComponent;
  let fixture: ComponentFixture<SmallBlogPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallBlogPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallBlogPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
