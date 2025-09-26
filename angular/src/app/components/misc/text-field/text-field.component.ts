import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChatBubbleOvalLeftSolid, heroPaperAirplaneSolid } from '@ng-icons/heroicons/solid';
import { TskText } from "../../base/text/text.component";

@Component({
  selector: 'text-field',
  standalone: true,
  imports: [
    NgIconComponent,
    TskText,
  ],
  providers: [
    provideIcons({
      heroChatBubbleOvalLeftSolid,
      heroPaperAirplaneSolid
    })
  ],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss'
})
export class TextField {

}
