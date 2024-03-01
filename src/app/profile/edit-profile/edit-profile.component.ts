import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent  {

  public updateProfileForm: FormGroup;
  public pwdText: any;
  public pwdIcon: any;
  public noData: boolean = true;
  public wrongEditProfile: boolean = false;


  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router,
  ) {
    this.updateProfileForm = this.fb.group({
      new_name: [''],
      new_surname: [''],
      new_password: [''],
    })
  }

  public updateProfile(){
    if(this.updateProfileForm.value['new_name'] === '' && this.updateProfileForm.value['new_surname'] === '' && this.updateProfileForm.value['new_password'] === '' ){
      this.wrongEditProfile = true
    }else{
      this.authService.updateProfile(this.updateProfileForm.value).subscribe((response) => {
        this.wrongEditProfile = false
        this.router.navigate(['/tabs/tab2'])
      })
    }
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
    if(this.updateProfileForm.value['new_name'] === '' && this.updateProfileForm.value['new_surname'] === '' && this.updateProfileForm.value['new_password'] === '' ){
      this.noData = true
    }else{
      this.noData = false
    }
  }
}
