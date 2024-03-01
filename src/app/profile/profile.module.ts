import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileRoutingModule } from './profile-routing.module'
import { PaymentMethodComponent } from '../profile/payment-method/payment-method.component';
import { MyFavsComponent } from './my-favs/my-favs.component';
import { MyBuysComponent } from './my-buys/my-buys.component';




@NgModule({
  declarations: [EditProfileComponent, PaymentMethodComponent, MyFavsComponent, MyBuysComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ProfileModule { }
