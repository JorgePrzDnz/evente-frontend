import { Injectable } from "@angular/core";
import { PaymentMethodResponse } from "../models/user";
import { AddPaymentMethodResponse, addPaymentMethodRequest, EditPaymentMethodResponse, editPaymentMethodRequest, DeletePaymentMethodResponse } from "../models/user";
import { Api } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends Api {

  public createPaymentMethod(addPaymentMethodCredentials: addPaymentMethodRequest){
    return this.post<AddPaymentMethodResponse>('/paymentMethod/create', addPaymentMethodCredentials)
  }

  public updatePaymentMethod(editPaymentMethodCredentials: editPaymentMethodRequest){
    return this.put<EditPaymentMethodResponse>('/paymentMethod/update', editPaymentMethodCredentials)
  }

  public deletePaymentMethod(){
    return this.post<DeletePaymentMethodResponse>('/paymentMethod/delete', '')
  }

  public getPaymentMethod(){
    return this.get<PaymentMethodResponse>("/paymentMethod")
  }
}
