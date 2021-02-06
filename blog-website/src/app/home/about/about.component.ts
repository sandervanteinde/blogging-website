import { Component } from '@angular/core';
import { TitledComponent } from 'src/app/utils/titled-component';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements TitledComponent {
  getTitleForComponent(): string {
    return 'About me';
  }
}
