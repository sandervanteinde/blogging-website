import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { ButtonComponent } from './button/button.component';
import { TimeIndicatorDirective } from './time-indicator.directive';
import { ButtonGroupComponent } from './button-group/button-group.component';
import { BadgeComponent } from './badge/badge.component';
import { BadgeContainerComponent } from './badge-container/badge-container.component';



@NgModule({
  declarations: [ContainerComponent, ButtonComponent, TimeIndicatorDirective, ButtonGroupComponent, BadgeComponent, BadgeContainerComponent],
  imports: [
    CommonModule
  ],
  exports: [ContainerComponent, ButtonComponent, TimeIndicatorDirective, ButtonGroupComponent, BadgeComponent, BadgeContainerComponent]
})
export class LayoutModule { }
