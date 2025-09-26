import { Component } from '@angular/core';

@Component({
  selector: 'circular-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './c-progress-bar.component.html',
  styleUrl: './c-progress-bar.component.scss'
})
export class CircularProgressBar {
  percentage: number = 90;
  progress = `background: conic-gradient(#0167FF ${this.percentage * 3.6}deg, white 0deg)`;
}
