import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TskText } from "../../base/text/text.component";

@Component({
  selector: 'message-card',
  standalone: true,
  imports: [
    CommonModule,
    TskText
],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageCard {
  @Input() type: 'sent' | 'recived' = 'sent';

  get Type(): string {
    return this.type;
  }
}
