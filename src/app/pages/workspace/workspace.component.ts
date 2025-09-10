import { Component } from '@angular/core';
import { ProjectCard } from '../../components/cards/project-card/project-card.component';
import { ProgressLabel } from '../../components/misc/progress-label/progress-label.component';
import { ScrollerComponent } from '../../components/misc/scroller/scroller.component';
import { User } from '../../components/user/user.component';
import { TaskCard } from '../../components/cards/task-card/task-card.component';
import { TskText } from '../../components/base/text/text.component';
import { TskTitle } from '../../components/base/title/title.component';

@Component({
  selector: 'workspace',
  standalone: true,
  imports: [
    ProjectCard,
    ScrollerComponent,
    User,
    TaskCard,
    TskText,
    TskTitle
  ],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class Workspace {
  projects = Array.from({ length: 10 }, (_, i) => i);
}
