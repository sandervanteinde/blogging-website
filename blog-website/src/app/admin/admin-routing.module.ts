import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizedGuard } from './authorized.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthorizedGuard],
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
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
