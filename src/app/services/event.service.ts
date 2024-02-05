import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EventByIdResponse, EventsPerCategoryResponse } from "../models/event";
import { Api } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class EventService extends Api{

  public getCategory(id: number){
    return this.get<EventsPerCategoryResponse>("/events/category/"+ id)
  }

  public getEvent(id: number){
    return this.get<EventByIdResponse>("/events/"+ id)
  }
}
