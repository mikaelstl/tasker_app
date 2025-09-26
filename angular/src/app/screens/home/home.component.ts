import { AfterViewInit, Component } from '@angular/core';
import { AppBar } from '../../components/toolbars/app-bar/app-bar.component';
import { NavBarComponent } from '../../components/toolbars/nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    RouterOutlet,
    AppBar,
    NavBarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class Home {}