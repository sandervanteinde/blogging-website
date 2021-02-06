import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  constructor(
    private readonly _adminService: AdminService,
    private readonly _router: Router
  ) { }

  newBlog(): void {
    this._adminService.newBlog().subscribe(newId => {
      this._router.navigate(['/admin', newId, 'edit']);
    })
  }
}
