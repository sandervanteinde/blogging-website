import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizedGuard } from './authorized.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { RoleGuard } from './role.guard';


const routes: Routes = [
  {
    path: '',
    canActivate: [
      AuthorizedGuard,
      RoleGuard
    ],
    data: {
      roles: 'Blog Admin'
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
