import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigBlogPreviewComponent } from './big-blog-preview.component';

describe('BigBlogPreviewComponent', () => {
  let component: BigBlogPreviewComponent;
  let fixture: ComponentFixture<BigBlogPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigBlogPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BigBlogPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
