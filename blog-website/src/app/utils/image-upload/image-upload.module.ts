import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { LayoutModule } from 'src/app/layout/layout.module';



@NgModule({
  declarations: [ImageUploadComponent],
  imports: [
    CommonModule,
    LayoutModule
  ],
  exports: [ImageUploadComponent]
})
export class ImageUploadModule { }
