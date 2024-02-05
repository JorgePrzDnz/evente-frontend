import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Params } from '@angular/router';
import { LoadingController } from '@ionic/angular';

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

  constructor(
    private eventService: EventService,
    private loadingController: LoadingController,
    private route: ActivatedRoute,
  ) { }

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
      this.eventImage = response.event.images_url
      this.eventPlace = response.event.place
      this.eventPrice = response.event.price
      this.eventDate = response.event.published_at_formatted
      console.log(response.event)
      this.loadingController.dismiss();
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

}
