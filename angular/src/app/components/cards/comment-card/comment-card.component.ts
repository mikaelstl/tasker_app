import { Component } from '@angular/core';
import { TskDateBadge } from '../../badges/date-badge/date-badge.component';
import { Avatar } from '../../misc/avatar/avatar.component';
import { TskTitle } from '../../base/title/title.component';
import { Subtitle } from '../../base/subtitle/subtitle.component';
import { TskText } from '../../base/text/text.component';
import { TskLabel } from '../../base/label/label.component';

@Component({
  selector: 'comment-card',
  standalone: true,
  imports: [
    Avatar,
    TskText,
    TskLabel,
    Subtitle
  ],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss'
})
export class CommentCard {

}
