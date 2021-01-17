import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { ButtonComponent } from './button/button.component';
import { TimeIndicatorDirective } from './time-indicator.directive';



@NgModule({
  declarations: [ContainerComponent, ButtonComponent, TimeIndicatorDirective],
  imports: [
    CommonModule
  ],
  exports: [ContainerComponent, ButtonComponent, TimeIndicatorDirective]
})
export class LayoutModule { }
