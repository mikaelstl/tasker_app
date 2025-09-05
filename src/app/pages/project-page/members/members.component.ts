import { Component } from '@angular/core';
import { ProjectMenu } from '../../../components/toolbars/project-menu/project-menu.component';
import { CreateButton } from '../../../components/buttons/create-btn/create-btn.component';
import { SearchComponent } from '../../../components/misc/search-field/search.component';
import { User } from '../../../components/user/user.component';
import { Badge } from '../../../components/labels/badge/badge.component';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [
    ProjectMenu,
    CreateButton,
    SearchComponent,
    User,
    Badge
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent {
  members = Array.from({ length: 4 }, (_, i) => i);
}
