import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../user/user.component';
import { Badge } from '../../badges/badge/badge.component';
import { Team } from '../../team/team.component';

@Component({
  selector: 'project-item',
  standalone: true,
  imports: [
    User,
    Badge,
    Team
  ],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.scss'
})
export class ProjectItem {
  constructor (private router: Router) {}

  open() {
    this.router.navigate(['/home/project']);
  }
}
