import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';

const routes: Routes = [
  {
    path: 'editProfile',
    component: EditProfileComponent
  },
  {
    path: 'paymentMethod',
    component: PaymentMethodComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ProfileRoutingModule {}
