import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Params } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-events-by-category',
  templateUrl: './all-events-by-category.component.html',
  styleUrls: ['./all-events-by-category.component.scss'],
})
export class AllEventsByCategoryComponent  implements OnInit {

  private categoryId: any;
  public events: any;

  constructor(
    private eventService: EventService,
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.presentLoading()
    this.route.params.subscribe(
      (params: Params) => {
        this.categoryId = params['id'];
      }
    );
    this.getEvents()
  }

  public getEvents(){
    this.eventService.getEventsByCategory(this.categoryId).subscribe(response => {
      this.events = response.events
      this.loadingController.dismiss();
    }, error => {
      console.log("error");
    });
  }

  public eventDetail(eventId: any){
    this.router.navigate(['/tabs/tab1', eventId])
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando eventos',
      spinner: 'bubbles'
    });
    await loading.present();
  }
}
