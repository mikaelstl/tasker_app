import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroBellSolid, heroClipboardSolid } from '@ng-icons/heroicons/solid';
import { Avatar } from '../../misc/avatar/avatar.component';
import { Router } from '@angular/router';
import { LogoIcon } from "../../icons/logo-icon/logo-icon.component";

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [
    NgIconComponent,
    Avatar,
    LogoIcon
],
  providers: [ 
    provideIcons({ 
      heroBellSolid,
      heroClipboardSolid
    })
  ],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss'
})
export class AppBar {
  constructor (private router: Router) {}

  goToProfile() {
    this.router.navigate(['/home/profile']);
  }

}
