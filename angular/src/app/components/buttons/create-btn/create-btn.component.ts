import { Component, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPlusSmallSolid, heroPlusSolid } from '@ng-icons/heroicons/solid';
import { TskText } from "../../base/text/text.component";

@Component({
  selector: 'create-btn',
  standalone: true,
  imports: [
    NgIconComponent,
    TskText
],
  providers: [
    provideIcons({
      heroPlusSolid
    })
  ],
  templateUrl: './create-btn.component.html',
  styleUrl: './create-btn.component.scss'
})
export class CreateButton {
  @Input() text: string = '';
}
