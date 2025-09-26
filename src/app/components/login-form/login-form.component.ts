import { Component } from '@angular/core';
import { FormInput } from '../form-input/form-input.component';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [
    FormInput
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  constructor (private router: Router) {}

  login() {
    console.log('HI');
    
    this.router.navigate(['/home/workspace']);
  }
}
