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
export class LoginComponent{

  public loginForm: FormGroup;
  public pwdText: any;
  public pwdIcon: any;
  public noData: boolean = true;
  public wrongLogin: boolean = false;

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

  public redirectToRegister(){
    this.router.navigate(['/auth/register'])
  }

  public login() {

    if(this.loginForm.invalid) {
      this.wrongLogin = true
    }

    this.authService.login(this.loginForm.value).subscribe((response) => {
      this.handleUserSetting(response)
    }, error => {
      this.wrongLogin = true
    });
  }

  private handleUserSetting(response: LoginResponse) {
    this.authService.setToken(response.token)
    console.log(response.token)
    this.router.navigate(['/tabs/tab1'])
  }

  public showPassword(passwordInput: any, passwordIcon: any){
    this.pwdText = passwordInput
    this.pwdIcon = passwordIcon
    if(passwordInput.type === 'password'){
      passwordInput.type = 'text';
      passwordIcon.name = 'eye-off-outline';

    }else{
      passwordInput.type = 'password';
      passwordIcon.name = 'eye-outline';
    }
  }

  public checkCredentials(){
    if(this.loginForm.value['email'] === '' && this.loginForm.value['password'] === ''){
      this.noData = true
    }else{
      this.noData = false
    }
  }

}
