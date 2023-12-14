import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/models/auth';
import { Auth } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router,
  ){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  public login() {

    if(this.loginForm.invalid) {
      return
    }

    this.authService.login(this.loginForm.value).subscribe((response) => {
      this.handleUserSetting(response)
    })
  }

  private handleUserSetting(response: LoginResponse) {
    this.authService.setToken(response.token)
    console.log(response.token)
  }

}
