import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from 'src/app/layout/layout.module';
import { DashboardComponent } from './dashboard.component';
import { BlogTableComponent } from './blog-table/blog-table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ DashboardComponent, BlogTableComponent ],
  exports: [ DashboardComponent ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    NgxDatatableModule
  ]
})
export class AdminDashboardModule { }
