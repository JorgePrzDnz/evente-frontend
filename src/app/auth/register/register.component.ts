import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterResponse } from 'src/app/models/auth';
import { Auth } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  public registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      name: ['',[Validators.required]],
      surname: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]]
    })
   }

  public register() {

    if(this.registerForm.invalid) {
      return
    }

    this.authService.register(this.registerForm.value).subscribe((response) => {
      this.handleUserSetting(response)
    })
  }

  private handleUserSetting(response: RegisterResponse) {
    this.authService.setToken(response.token)
    console.log(response.token)
    this.router.navigate(['/tabs/tab1'])
  }
}
