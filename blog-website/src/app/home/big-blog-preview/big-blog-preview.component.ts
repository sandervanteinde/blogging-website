import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-big-blog-preview',
  templateUrl: './big-blog-preview.component.html',
  styleUrls: ['./big-blog-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BigBlogPreviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
