import { Component } from '@angular/core';
import { Avatar } from '../../components/misc/avatar/avatar.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChatBubbleOvalLeftSolid } from '@ng-icons/heroicons/solid';
import { heroUsersMini } from '@ng-icons/heroicons/mini';
import { ScrollerComponent } from '../../components/misc/scroller/scroller.component';
import { ProjectCard } from '../../components/cards/project-card/project-card.component';
import { ProjectItem } from "../../components/cards/project-item/project-item.component";

@Component({
  selector: 'profile',
  standalone: true,
  imports: [
    Avatar,
    NgIconComponent,
    ProjectItem
],
  providers: [
    provideIcons({
      heroChatBubbleOvalLeftSolid,
      heroUsersMini
    })
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class Profile {
  projects = Array.from({ length: 8 }, (_, i) => i);
}
