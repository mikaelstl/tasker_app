import { Component } from '@angular/core';
import { Avatar } from '../../misc/avatar/avatar.component';
import { Badge } from '../../badges/badge/badge.component';

@Component({
  selector: 'message-card',
  standalone: true,
  imports: [
    Avatar,
    Badge
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageCard {

}
