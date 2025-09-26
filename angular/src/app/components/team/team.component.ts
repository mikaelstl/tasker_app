import { Component } from '@angular/core';
import { Avatar } from '../misc/avatar/avatar.component';

@Component({
  selector: 'team',
  standalone: true,
  imports: [
    Avatar
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class Team {

}
