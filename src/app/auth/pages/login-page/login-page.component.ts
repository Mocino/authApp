import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private _authService = inject(AuthService)

  public myForm: FormGroup = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  login(){
    const { email, password} = this.myForm.value;

    this._authService.login(email, password)
    .subscribe({
      next: () => console.log('Todo bien'),
      error: (message) => {
        Swal.fire('Error', message, 'error')
      }
    })

  }
}
