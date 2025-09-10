import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'badge',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'
})
export class Badge {
  @Input() content: string = '';

  @Input() color: 'red' | 'blue' = 'red';

  get Color(): string {
    return `${this.color}`;
  }
}
