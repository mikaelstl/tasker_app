import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'avatar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class Avatar {
  @Input() size: 'small' | 'large' | 'medium' = 'medium';

  @Input() online: boolean = false;

  get Size(): string {
    return `avtr-${this.size}`;
  }
}
