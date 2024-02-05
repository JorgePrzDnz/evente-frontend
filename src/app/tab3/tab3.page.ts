import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Auth } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{
  public userName: any;
  public userSurname: any;
  public userNameFirstLetter: any;
  public userSurnameFirstLetter: any;

  constructor(
    private router: Router,
    private authService: Auth,
    private loadingController: LoadingController,
  ) {}

  ionViewWillEnter(){
    this.presentLoading()
    this.getProfile()
  }

  public getProfile(){
    this.authService.getProfile().subscribe((response) => {
      this.userName = response.user.name
      this.userSurname = response.user.surname
      this.abbreviation()
    })
  }

  public logOut() {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }

  public abbreviation(){
    this.userNameFirstLetter = this.userName.substring(0,1).toUpperCase()
    this.userSurnameFirstLetter =this.userSurname.substring(0,1).toUpperCase()
    this.loadingController.dismiss();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando perfil',
      spinner: 'bubbles'
    });
    await loading.present();
  }

}
