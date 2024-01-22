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
