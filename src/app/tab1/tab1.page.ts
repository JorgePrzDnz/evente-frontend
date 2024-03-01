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
  public CategoryEvents: any;
  public CategoryConcerts: any;
  public CategoryShows: any;
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
      this.CategoryConcerts = response.events.data
      if(response.events.data.length === 0){
        this.noConcerts = true;
      }else{
        let firstConcerts = []
        for (let i = 0; i <= 4; i++){
          if(response.events.data[i]){
            firstConcerts[i] = response.events.data[i]
          }
        }
        this.nextConcerts = firstConcerts
      }
    }, error => {
      console.log("error");
    });
    this.eventService.getCategory(2).subscribe(response => {
      this.CategoryEvents = response.events.data
      if(response.events.data.length === 0){
        this.noEvents = true;
      }else{
        let firstEvents = []
        for (let i = 0; i <= 4; i++){
          if(response.events.data[i]){
            firstEvents[i] = response.events.data[i]
          }
        }
        this.nextEvents = firstEvents
      }
    }, error => {
      console.log("error");
    });
    this.eventService.getCategory(3).subscribe(response => {
      this.CategoryShows = response.events.data
      if(response.events.data.length === 0){
        this.noShows = true;
      }else{
        let firstShows = []
        for (let i = 0; i <= 4; i++){
          if(response.events.data[i]){
            firstShows[i] = response.events.data[i]
          }
        }
        this.nextShows = firstShows
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

  public allEventsDetail(categoryId: number){
    this.router.navigate(['/tabs/tab1/allEvents', categoryId])
  }

}
