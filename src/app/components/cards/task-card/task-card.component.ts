import { Component } from '@angular/core';
import { TskDateBadge } from '../../labels/date-badge/date-badge.component';
import { Avatar } from '../../misc/avatar/avatar.component';

@Component({
  selector: 'task-card',
  standalone: true,
  imports: [
    TskDateBadge,
    Avatar
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCard {

}
