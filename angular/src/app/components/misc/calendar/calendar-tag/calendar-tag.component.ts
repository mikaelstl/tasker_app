import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroClipboardMini, heroFlagMini } from '@ng-icons/heroicons/mini';

@Component({
  selector: 'calendar-tag',
  standalone: true,
  imports: [
    NgIconComponent,
    CommonModule,
  ],
  providers: [
    provideIcons({
      heroClipboardMini,
      heroFlagMini
    })
  ],
  templateUrl: './calendar-tag.component.html',
  styleUrl: './calendar-tag.component.scss'
})
export class CalendarTag {
  @Input() type: 'task' | 'event' = 'task';

  get Type(): string {
    return `${this.type}-tag`;
  }
}
