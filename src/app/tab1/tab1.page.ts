import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  public nextEvents: any;
  public slideOpts: any;
  constructor(
    private eventService: EventService,
  ){}

  ngOnInit() {
    this.eventService.getCategory(1).subscribe(response => {
          this.nextEvents = response.events.data
          console.log(this.nextEvents)
        }, error => {
          console.log("error");
        });
  }

}
