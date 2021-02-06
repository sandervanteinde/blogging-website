import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorizedGuard } from './authorized.guard';
import { LayoutModule } from '../layout/layout.module';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { MarkdownModule } from 'ngx-markdown';
import { AdminService } from './admin.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { AdminDashboardModule } from './dashboard/admin-dashboard.module';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    LayoutModule,
    MarkdownModule,
    HttpClientModule,
    AdminDashboardModule
  ],
  declarations: [
    LoginComponent,
    EditBlogComponent
  ],
  providers: [
    AuthorizedGuard,
    AdminService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AdminModule { }
