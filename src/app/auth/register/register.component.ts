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
  public pwdText: any;
  public pwdIcon: any;
  public pwdConfirmText: any;
  public pwdConfirmIcon: any;
  public noData: boolean = true;
  public wrongRegister: boolean = false;


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
      this.wrongRegister = true
    }

    this.authService.register(this.registerForm.value).subscribe((response) => {
      this.handleUserSetting(response)
    }, error => {
      this.wrongRegister = true
    });
  }

  private handleUserSetting(response: RegisterResponse) {
    this.authService.setToken(response.token)
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

  public showConfirmPassword(passwordInput: any, passwordIcon: any){
    this.pwdConfirmText = passwordInput
    this.pwdConfirmIcon = passwordIcon
    if(passwordInput.type === 'password'){
      passwordInput.type = 'text';
      passwordIcon.name = 'eye-off-outline';

    }else{
      passwordInput.type = 'password';
      passwordIcon.name = 'eye-outline';
    }
  }

  public checkCredentials(){
    if(this.registerForm.value['name'] === '' &&this.registerForm.value['surname'] === ''  && this.registerForm.value['email'] === '' && this.registerForm.value['password'] === '' && this.registerForm.value['password_confirmation'] === ''){
      this.noData = true
    }else{
      this.noData = false
    }
  }
}
