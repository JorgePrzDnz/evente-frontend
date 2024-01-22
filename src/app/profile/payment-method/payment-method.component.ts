import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
})
export class PaymentMethodComponent  implements OnInit {

  public hasPM: boolean = false;
  public createPM: boolean = false;
  public paymentMethod: any;
  public ownerName: any;
  public cardNumber: any;
  public expiryDate: any;
  public cvv: any;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.hasPM = false
    this.createPM = false
    this.checkPaymentMethod()
  }

  checkPaymentMethod() {
    this.userService.getPaymentMethod().subscribe(response => {
      this.paymentMethod = response.paymentMethod
      console.log(this.paymentMethod)
      if(this.paymentMethod != null){
        this.hasPM = true
      }

    }, error => {
      console.log("error");
    });
  }

  public createPaymentMethod(){
    this.createPM = true

  }
}
