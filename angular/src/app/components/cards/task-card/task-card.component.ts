import { Component } from '@angular/core';
import { TskDateBadge } from '../../badges/date-badge/date-badge.component';
import { Avatar } from '../../misc/avatar/avatar.component';
import { TskTitle } from '../../base/title/title.component';
import { Subtitle } from '../../base/subtitle/subtitle.component';

@Component({
  selector: 'task-card',
  standalone: true,
  imports: [
    TskDateBadge,
    Avatar,
    TskTitle,
    Subtitle
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCard {

}
