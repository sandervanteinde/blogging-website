import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-badge-container',
  templateUrl: './badge-container.component.html',
  styleUrls: ['./badge-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeContainerComponent {
  @Input() categories: Array<string> = [];
}
