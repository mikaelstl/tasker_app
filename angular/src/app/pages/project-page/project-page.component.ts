import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectMenu } from '../../components/toolbars/project-menu/project-menu.component';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [
    RouterOutlet,
    ProjectMenu
  ],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.scss'
})
export class ProjectPage {

}
