import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent  implements OnInit {

  private eventId: any;
  public event: any;
  public eventName: any;
  public eventDescription: any;
  public eventImage: any;
  public eventPlace: any;
  public eventPrice: any;
  public eventDate: any;
  public hasPM: boolean = false;
  public firstBuyScreen: boolean = false;
  public buying: boolean = false;
  public addPaymentMethodForm: FormGroup;
  public addOrderForm: FormGroup;
  public noAddData: boolean = true;
  public cantBuyEntries: boolean = true
  public entriesPrice: number = 0;

  constructor(
    private eventService: EventService,
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private fb2: FormBuilder,
    private router: Router,
  ) {
    this.addPaymentMethodForm = this.fb.group({
      ownerName: ['',[Validators.required]],
      cardNumber: ['',[Validators.required]],
      expiryDate: ['', [Validators.required]],
      bank: ['', [Validators.required]],
    })

    this.addOrderForm = this.fb2.group({
      event_id: ['',[Validators.required]],
      entry_amount: ['',[Validators.required, Validators.min(1)]],
      total_price: ['',[Validators.required]],
      event_name: ['',[Validators.required]],
    })
   }

  ngOnInit() {
    this.presentLoading()
    this.route.params.subscribe(
      (params: Params) => {
        this.eventId = params['id'];
      }
    );
    this.getEvent()
  }

  public getEvent(){
    this.eventService.getEvent(this.eventId).subscribe(response => {
      this.eventName = response.event.name
      this.eventDescription = response.event.description
      this.eventImage = response.event.images_url && response.event.images_url.length > 0 ? response.event.images_url[0] : null
      this.eventPlace = response.event.place
      this.eventPrice = response.event.price
      this.eventDate = response.event.published_at_formatted
      this.loadingController.dismiss();
      this.entriesPrice = this.eventPrice
    }, error => {
      console.log("error");
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando evento',
      spinner: 'bubbles'
    });
    await loading.present();
  }

  async buy() {
    const pmLoading = await this.loadingController.create({
      message: 'Realizando compra',
      spinner: 'bubbles'
    });
    await pmLoading.present();
  }

  public startBuy(){
    this.buying = true
    this.firstBuyScreen = true
  }

  public checkPaymentMethod() {
    this.addOrderForm.value['event_id'] = this.eventId
    this.addOrderForm.value['event_name'] = this.eventName
    this.addOrderForm.value['total_price'] = this.entriesPrice
    this.userService.getPaymentMethod().subscribe(response => {
      if(response.paymentMethod != null){
        this.hasPM = true
        if(this.addOrderForm.value['entry_amount'] != null || this.addOrderForm.value['entry_amount'] != 0){
          this.finishBuy()
        }
        this.loadingController.dismiss();
      }else{
        this.firstBuyScreen = false
        this.loadingController.dismiss();
      }
    }, error => {
      console.log("error");
    });
  }

  public checkCredentials(){
    if(this.addPaymentMethodForm.value['ownerName'] === '' && this.addPaymentMethodForm.value['cardNumber'] === '' && this.addPaymentMethodForm.value['expiryDate'] === '' && this.addPaymentMethodForm.value['bank'] === ''){
      this.noAddData = true
    }else{
      this.noAddData = false
    }
  }

  public cancelBuyProcess(){
    this.buying = false
  }

  public checkEntries(){
    this.disableButton()
    this.entriesPrice = this.eventPrice * this.addOrderForm.value['entry_amount']
    return this.entriesPrice
  }

  public disableButton(){
    console.log(this.addOrderForm.value['entry_amount'])
    if(this.addOrderForm.value['entry_amount'] == null || this.addOrderForm.value['entry_amount'] == 0){
      this.cantBuyEntries = true
    }else{
      this.cantBuyEntries = false
    }
  }

  public cancelBuy(){
    this.buying = false
    this.firstBuyScreen = true
  }

  public finishBuy(){
    this.buy()
    this.eventService.buyEntries(this.addOrderForm.value).subscribe(response => {
      setTimeout(() => {
        this.loadingController.dismiss();
      }, 1000);
      setTimeout(() => {
        this.router.navigate(['/buyCompleted'])
      }, 1000);
    }, error => {
      console.log("error");
    });
  }

}
