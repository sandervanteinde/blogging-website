import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { AuthorizedGuard } from './authorized.guard';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent],
  providers: [ AuthorizedGuard ]
})
export class AdminModule { }
