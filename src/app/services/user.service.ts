import { Injectable } from "@angular/core";
import { PaymentMethodResponse } from "../models/user";
import { Api } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends Api {
  public getPaymentMethod(){
    return this.get<PaymentMethodResponse>("/paymentMethod")
  }
}
