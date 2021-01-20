import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { BlogListItem } from '../../models/blog';

@Component({
  selector: 'app-small-blog-preview',
  templateUrl: './small-blog-preview.component.html',
  styleUrls: ['./small-blog-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmallBlogPreviewComponent {
  @Input() blog!: BlogListItem;
}
