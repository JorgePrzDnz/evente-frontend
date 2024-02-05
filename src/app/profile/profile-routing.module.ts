import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { MyFavsComponent } from './my-favs/my-favs.component';

const routes: Routes = [
  {
    path: 'editProfile',
    component: EditProfileComponent
  },
  {
    path: 'paymentMethod',
    component: PaymentMethodComponent
  },
  {
    path: 'myFavs',
    component: MyFavsComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ProfileRoutingModule {}
