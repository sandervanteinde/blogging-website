import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { BigBlogPreviewComponent } from './components/big-blog-preview/big-blog-preview.component';
import { SmallBlogPreviewComponent } from './components/small-blog-preview/small-blog-preview.component';
import { LayoutModule } from '../layout/layout.module';



@NgModule({
  declarations: [
    HomeComponent,
    BigBlogPreviewComponent,
    SmallBlogPreviewComponent
  ],
  imports: [
    CommonModule,
    LayoutModule
  ],
  exports: [ HomeComponent ]
})
export class HomeModule { }
