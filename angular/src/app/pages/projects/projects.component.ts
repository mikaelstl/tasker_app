import { Component } from '@angular/core';
import { CreateButton } from '../../components/buttons/create-btn/create-btn.component';
import { SearchComponent } from '../../components/misc/search-field/search.component';
import { Avatar } from '../../components/misc/avatar/avatar.component';
import { Team } from '../../components/team/team.component';
import { ProgressLabel } from '../../components/misc/progress-label/progress-label.component';
import { ScrollerComponent } from '../../components/misc/scroller/scroller.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDoubleLeftMini, heroChevronDoubleRightMini } from '@ng-icons/heroicons/mini';
import { Router } from '@angular/router';
import { User } from '../../components/user/user.component';
import { Badge } from "../../components/badges/badge/badge.component";
import { ProjectItem } from '../../components/cards/project-item/project-item.component';

@Component({
  selector: 'projects',
  standalone: true,
  imports: [
    CreateButton,
    SearchComponent,
    ProjectItem
],
  providers: [
    provideIcons({
      heroChevronDoubleLeftMini,
      heroChevronDoubleRightMini
    })
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class Projects {
  constructor (private router: Router) {}

  rows = Array.from({ length: 12 }, (_, i) => i);

  openProject() {
    this.router.navigate(['/home/project']);
  }
}
