import { Component } from '@angular/core';

@Component({
  selector: 'progress-label',
  standalone: true,
  imports: [],
  templateUrl: './progress-label.component.html',
  styleUrl: './progress-label.component.scss'
})
export class ProgressLabel {
  percent: number = 10;

  get width() {
    return `width: ${this.percent}%`;
  }
}
