import { Component } from '@angular/core';
import { Avatar } from '../../misc/avatar/avatar.component';
import { Team } from '../../team/team.component';
import { TskTitle } from "../../base/title/title.component";
import { TskText } from "../../base/text/text.component";
import { Badge } from "../../badges/badge/badge.component";
import { TskLabel } from "../../base/label/label.component";
import { Subtitle } from "../../base/subtitle/subtitle.component";

@Component({
  selector: 'chat-card',
  standalone: true,
  imports: [
    Avatar,
    TskTitle,
    Badge,
    Subtitle
],
  templateUrl: './chat-card.component.html',
  styleUrl: './chat-card.component.scss'
})
export class ChatCard {

}
