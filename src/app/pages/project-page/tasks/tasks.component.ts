import { Component } from '@angular/core';
import { ProjectMenu } from '../../../components/toolbars/project-menu/project-menu.component';
import { CreateButton } from '../../../components/buttons/create-btn/create-btn.component';
import { SearchComponent } from '../../../components/misc/search-field/search.component';
import { TaskCard } from '../../../components/cards/task-card/task-card.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    ProjectMenu,
    CreateButton,
    SearchComponent,
    TaskCard
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  tasks = Array.from({ length: 12 }, (_,i) => i );
}
