export interface PaymentMethodResponse{
  paymentMethod: PaymentMethod,
}

export interface PaymentMethod{
  ownerName: string,
  cardNumber: number,
  expiryDate: string,
  bank: string,
  user_id: number
}

export interface addPaymentMethodRequest{
  ownerName: string,
  cardNumber: number,
  expiryDate: string,
  bank: string,
  user_id: number
}

export interface AddPaymentMethodResponse{
  status: string,
  paymentMethod: PaymentMethod
}

export interface editPaymentMethodRequest{
  ownerName: string,
  cardNumber: number,
  expiryDate: string,
  bank: string,
}

export interface EditPaymentMethodResponse{
  status: string,
  paymentMethod: PaymentMethod
}

export interface DeletePaymentMethodResponse{
  status: string
}

