import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'scroller',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './scroller.component.html',
  styleUrl: './scroller.component.scss'
})
export class ScrollerComponent {
  @Input() axis: 'horizontal' | 'vertical' = 'horizontal';

  get Axis(): string {
    return `scrllr-${this.axis}`;
  }
}
