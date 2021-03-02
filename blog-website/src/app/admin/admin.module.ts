import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorizedGuard } from './authorized.guard';
import { LayoutModule } from '../layout/layout.module';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { MarkdownModule } from 'ngx-markdown';
import { AdminService } from './admin.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminDashboardModule } from './dashboard/admin-dashboard.module';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { ImageUploadModule } from '../utils/image-upload/image-upload.module';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    LayoutModule,
    MarkdownModule,
    HttpClientModule,
    AdminDashboardModule,
    ImageUploadModule
  ],
  declarations: [
    EditBlogComponent
  ],
  providers: [
    AuthorizedGuard,
    AdminService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }
  ]
})
export class AdminModule { }
