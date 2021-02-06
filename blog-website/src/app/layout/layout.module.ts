import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { ButtonComponent } from './button/button.component';
import { TimeIndicatorDirective } from './time-indicator.directive';
import { ButtonGroupComponent } from './button-group/button-group.component';



@NgModule({
  declarations: [ContainerComponent, ButtonComponent, TimeIndicatorDirective, ButtonGroupComponent],
  imports: [
    CommonModule
  ],
  exports: [ContainerComponent, ButtonComponent, TimeIndicatorDirective, ButtonGroupComponent]
})
export class LayoutModule { }
