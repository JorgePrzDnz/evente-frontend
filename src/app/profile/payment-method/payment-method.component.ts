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
  public noAddData: boolean = true;
  public wrongPayment: boolean = false;
  public wrongPaymentAdd: boolean = false;


  constructor(
    private fb: FormBuilder,
    private fb2: FormBuilder,
    private userService: UserService,
    private loadingController: LoadingController,
    private router: Router,
  ) {
    this.addPaymentMethodForm = this.fb.group({
      ownerName: [null,[Validators.required]],
      cardNumber: [null,[Validators.required, Validators.minLength(16), Validators.maxLength(19)]],
      expiryDate: [null, [Validators.required]],
      bank: [null, [Validators.required]],
    })

    this.editPaymentMethodForm = this.fb2.group({
      ownerName: [null,[Validators.required]],
      cardNumber: [null,[Validators.required, Validators.minLength(16), Validators.maxLength(19)]],
      expiryDate: [null, [Validators.required]],
      bank: [null, [Validators.required]],
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
      this.wrongPaymentAdd = true
    }else{
      this.userService.createPaymentMethod(this.addPaymentMethodForm.value).subscribe(response => {
        this.wrongPayment = false
        this.router.navigate(['/tabs/tab3'])
      }, error => {
        this.wrongPayment = true
        this.wrongPaymentAdd = true
      });
    }
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

  public checkCredentials(){
    if(this.addPaymentMethodForm.value['ownerName'] === '' && this.addPaymentMethodForm.value['cardNumber'] === '' && this.addPaymentMethodForm.value['expiryDate'] === '' && this.addPaymentMethodForm.value['bank'] === ''){
      this.noAddData = true
    }else{
      this.noAddData = false
    }
  }
}
