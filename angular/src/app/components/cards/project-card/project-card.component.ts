import { Component, Input } from '@angular/core';
import { TskDateBadge } from '../../badges/date-badge/date-badge.component';
import { Team } from '../../team/team.component';
import { Project } from '../../../service/project';
import { Router } from '@angular/router';
import { Subtitle } from "../../base/subtitle/subtitle.component";
import { TskTitle } from "../../base/title/title.component";
import { Badge } from "../../badges/badge/badge.component";

@Component({
  selector: 'project-card',
  standalone: true,
  imports: [
    TskDateBadge,
    Team,
    Subtitle,
    TskTitle,
    Badge
],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCard {
  constructor (private router: Router) {}
  
  @Input() data: Project = {
    title: 'projeto',
    description: 'projeto teste'
  };

  openProject() {
    console.log('clicado');
    
    this.router.navigate(['/home/project']);
  }
}
