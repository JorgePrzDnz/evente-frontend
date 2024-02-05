import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  public nextEvents: any;
  public nextConcerts: any;
  public nextShows: any;
  public slideOpts: any;
  public noEvents = false;
  public noConcerts = false;
  public noShows = false;

  constructor(
    private eventService: EventService,
    private loadingController: LoadingController,
    private router: Router,
  ){}

  ngOnInit() {
    this.presentLoading()
    this.eventService.getCategory(1).subscribe(response => {
      console.log(response.events.data)
          this.nextEvents = response.events.data
          if(this.nextEvents.length === 0){
            this.noEvents = true;
          }
        }, error => {
          console.log("error");
        });
    this.eventService.getCategory(2).subscribe(response => {
          this.nextConcerts = response.events.data
          if(this.nextConcerts.length === 0){
            this.noConcerts = true;
          }
        }, error => {
          console.log("error");
        });
    this.eventService.getCategory(3).subscribe(response => {
          this.nextShows = response.events.data
          if(this.nextShows.length === 0){
            this.noShows = true;
          }
          this.loadingController.dismiss();
        }, error => {
          console.log("error");
        });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando eventos',
      spinner: 'bubbles'
    });
    await loading.present();
  }

  public eventDetail(eventId: any){
    this.router.navigate(['/tabs/tab1', eventId])
  }

}
