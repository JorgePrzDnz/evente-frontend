import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-my-buys',
  templateUrl: './my-buys.component.html',
  styleUrls: ['./my-buys.component.scss'],
})
export class MyBuysComponent  implements OnInit {

  public buys: any;
  public eventDate: any;

  constructor(
    private eventService: EventService,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {}

  ionViewWillEnter(){
    this.presentLoading()
    this.getBuys()
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando compras',
      spinner: 'bubbles'
    });
    await loading.present();
  }

  public getBuys(){
    this.eventService.getBuys().subscribe(response => {
      this.buys = response.orders
      this.loadingController.dismiss();
    }, error => {
      console.log("error");
    })
  }

  public formattedDate(createdAt: any){
    let subDate = createdAt.substring(2,10)
    let firstPartDate = createdAt.substring(8,10)
    let secondPartDate = createdAt.substring(5,7)
    let thirdPartDate = createdAt.substring(2,4)

    this.eventDate = firstPartDate + '/' + secondPartDate + '/' + thirdPartDate

    return this.eventDate
  }

}
