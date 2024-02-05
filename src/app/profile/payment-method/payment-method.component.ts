import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
})
export class PaymentMethodComponent  {

  public addPaymentMethodForm: FormGroup;
  public editPaymentMethodForm: FormGroup;
  public hasPM: boolean = false;
  public createPM: boolean = false;
  public editPM: boolean = false;
  public typeOfCard: any;
  public cardURL: any;
  public paymentMethod: any;
  public ownerName: any;
  public cardNumber: any;
  public expiryDate: any;
  public cvv: any;

  constructor(
    private fb: FormBuilder,
    private fb2: FormBuilder,
    private userService: UserService,
    private loadingController: LoadingController,
    private router: Router,
  ) {
    this.addPaymentMethodForm = this.fb.group({
      ownerName: ['',[Validators.required]],
      cardNumber: ['',[Validators.required]],
      expiryDate: ['', [Validators.required]],
      bank: ['', [Validators.required]],
    })

    this.editPaymentMethodForm = this.fb2.group({
      ownerName: [''],
      cardNumber: [''],
      expiryDate: [''],
      bank: [''],
    })
   }


  ionViewWillEnter(){
    this.presentLoading()
    this.hasPM = false
    this.createPM = false
    this.editPM = false
    this.editPM = false
    this.checkPaymentMethod()
  }

  checkPaymentMethod() {
    this.userService.getPaymentMethod().subscribe(response => {
      if(response.paymentMethod != null){
        this.typeOfCard = response.paymentMethod.bank
        this.getBank()
      }
      this.paymentMethod = response.paymentMethod
      if(this.paymentMethod != null){
        this.hasPM = true
      }
      this.loadingController.dismiss();

    }, error => {
      console.log("error");
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando método de pago',
      spinner: 'bubbles'
    });
    await loading.present();
  }

  public addPaymentMethod(){
    this.createPM = true

  }

  public createPaymentMethod(){
    if(this.addPaymentMethodForm.invalid) {
      return
    }

    this.userService.createPaymentMethod(this.addPaymentMethodForm.value).subscribe(response => {
      console.log(response)
    }, error => {
      console.log("error");
    });
    this.router.navigate(['/tabs/tab3'])
  }
  public activeEditPaymentMethod(){
    this.hasPM = false
    this.createPM = false
    this.editPM = true
  }

  public editPaymentMethod(){
    if(this.editPaymentMethodForm.value['ownerName'] === '' && this.editPaymentMethodForm.value['cardNumber'] === '' && this.editPaymentMethodForm.value['expiryDate'] === '' && this.editPaymentMethodForm.value['bank'] === ''){
      console.log('botón desactivado')
    }else{
      this.userService.updatePaymentMethod(this.editPaymentMethodForm.value).subscribe((response) => {
        this.router.navigate(['/tabs/tab3'])
      })
    }
  }

  public cancelEditPaymentMethod(){
    this.hasPM = true
    this.createPM = false
    this.editPM = false
  }

  public deletePaymentMethod(){
    this.userService.deletePaymentMethod().subscribe(response => {
      console.log(response)
    }, error => {
      console.log("error");
    });
    this.router.navigate(['/tabs/tab3'])
  }

  public getBank(){
    this.typeOfCard = this.typeOfCard.toLowerCase()
    switch(this.typeOfCard){
      case 'visa': {
        this.cardURL = '../../../assets/images/visaIcon.svg';
        break;
      }
      case 'mastercard': {
        this.cardURL = '../../../assets/images/mastercardIcon.svg';
        break;
      }
      default:
        this.cardURL = '../../../assets/images/Logo.svg';
    }
  }
}
