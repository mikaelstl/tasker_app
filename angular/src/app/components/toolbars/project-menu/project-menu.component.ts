import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUserGroupMini } from '@ng-icons/heroicons/mini';
import { heroCalendarSolid, heroClipboardSolid, heroWindowSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'project-menu',
  standalone: true,
  imports: [
    NgIconComponent
  ],
  providers: [
    provideIcons({
      heroWindowSolid,
      heroClipboardSolid,
      heroUserGroupMini,
      heroCalendarSolid
    })
  ],
  templateUrl: './project-menu.component.html',
  styleUrl: './project-menu.component.scss'
})
export class ProjectMenu {
  constructor (private router: Router){};
  
  gotTo(page:string) {
    this.router.navigate([`home/project/${page}`])
  }
}
