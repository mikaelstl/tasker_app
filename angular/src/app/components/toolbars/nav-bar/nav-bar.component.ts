import { Component } from '@angular/core';
import { NgIconComponent, NgIconsModule, provideIcons } from '@ng-icons/core';
import { heroArrowLeftStartOnRectangleSolid, heroBuildingOfficeSolid, heroChatBubbleOvalLeftSolid, heroCog6ToothSolid, heroInboxStackSolid, heroUsersSolid, heroWindowSolid } from '@ng-icons/heroicons/solid';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [
    NgIconComponent
  ],
  providers: [ provideIcons({ 
    heroWindowSolid,
    heroInboxStackSolid,
    heroCog6ToothSolid,
    heroChatBubbleOvalLeftSolid,
    heroArrowLeftStartOnRectangleSolid,
    heroUsersSolid
  }) ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  constructor (
    private readonly router: Router
  ){}
  page: 'workspace' | 'projects' | 'inbox' | 'affiliations' = 'workspace';

  go(page: 'workspace' | 'projects' | 'inbox' | 'affiliations') {
    console.log(`go to ${page}`);
    this.page = page;
    this.router.navigate([`home/${page}`]);
  }
}
