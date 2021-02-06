import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { BigBlogPreviewComponent } from './components/big-blog-preview/big-blog-preview.component';
import { SmallBlogPreviewComponent } from './components/small-blog-preview/small-blog-preview.component';
import { LayoutModule } from '../layout/layout.module';
import { BlogComponent } from './blog/blog.component';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';



@NgModule({
  declarations: [
    HomeComponent,
    BigBlogPreviewComponent,
    SmallBlogPreviewComponent,
    BlogComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule,
    MarkdownModule.forChild()
  ],
  exports: [ HomeComponent, BlogComponent ]
})
export class HomeModule { }
