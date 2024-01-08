import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EventsPerCategoryResponse } from "../models/event";
import { Api } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class EventService extends Api{

  public getCategory(id: number){
    return this.get<EventsPerCategoryResponse>("/events/category/"+ id)
  }
}
