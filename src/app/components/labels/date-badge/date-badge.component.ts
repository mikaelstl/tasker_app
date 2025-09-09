import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCalendarSolid } from '@ng-icons/heroicons/solid';
import { TskText } from "../../base/text/text.component";

@Component({
  selector: 'tsk-date-badge',
  standalone: true,
  imports: [
    NgIconComponent,
    TskText
  ],
  providers: [
    provideIcons({
      heroCalendarSolid
    })
  ],
  templateUrl: './date-bagde.component.html',
  styleUrl: './date-bagde.component.scss'
})
export class TskDateBadge {

}
