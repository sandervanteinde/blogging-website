import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-small-blog-preview',
  templateUrl: './small-blog-preview.component.html',
  styleUrls: ['./small-blog-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmallBlogPreviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
