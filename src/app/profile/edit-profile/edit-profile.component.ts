import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateProfileResponse } from 'src/app/models/auth';
import { Auth } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent  {

  public updateProfileForm: FormGroup;

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
      console.log('botón desactivado')
    }else{
      this.authService.updateProfile(this.updateProfileForm.value).subscribe((response) => {
        this.router.navigate(['/tabs/tab3'])
      })
    }
  }

}
