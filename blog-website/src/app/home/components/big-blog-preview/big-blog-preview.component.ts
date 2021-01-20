import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { BlogListItem } from '../../models/blog';

@Component({
  selector: 'app-big-blog-preview',
  templateUrl: './big-blog-preview.component.html',
  styleUrls: ['./big-blog-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BigBlogPreviewComponent {
  @Input() blog!: BlogListItem;
}
