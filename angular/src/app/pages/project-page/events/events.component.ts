import { Component } from '@angular/core';
import { ProjectMenu } from '../../../components/toolbars/project-menu/project-menu.component';
import { CreateButton } from '../../../components/buttons/create-btn/create-btn.component';
import { Calendar } from '../../../components/misc/calendar/calendar.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    ProjectMenu,
    CreateButton,
    Calendar
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class Events {

}
