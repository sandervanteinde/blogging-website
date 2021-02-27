import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizedGuard } from './authorized.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { PermissionGuard } from './permission.guard';


const routes: Routes = [
  {
    path: '',
    canActivate: [
      AuthorizedGuard,
      PermissionGuard
    ],
    data: {
      permissions: 'Blogs'
    },
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: ':blogId/edit',
        component: EditBlogComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
