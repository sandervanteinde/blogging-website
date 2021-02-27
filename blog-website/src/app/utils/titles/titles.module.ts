import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterDirective } from './router.directive';



@NgModule({
  declarations: [RouterDirective],
  imports: [
    CommonModule
  ],
  exports: [RouterDirective]
})
export class TitlesModule { }
