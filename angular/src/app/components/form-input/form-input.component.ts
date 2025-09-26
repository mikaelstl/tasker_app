import { Component, Input } from '@angular/core';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroKeySolid, heroUserSolid } from '@ng-icons/heroicons/solid';
import { heroEyeSlashMini } from '@ng-icons/heroicons/mini'

@Component({
  selector: 'form-input',
  standalone: true,
  imports: [
    NgIconComponent,
  ],
  providers: [provideIcons({ heroUserSolid, heroKeySolid, heroEyeSlashMini })],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss'
})
export class FormInput {
  @Input() placeholder: string = '';
  @Input() icon: string = '';
}
