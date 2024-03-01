import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EventByIdResponse, EventsPerCategoryResponse, EventsByIdResponse, addOrderRequest, AddOrderResponse, OrdersResponse } from "../models/event";
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

  public getEventsByCategory(categoryId: number){
    return this.get<EventsByIdResponse>("/getAllEvents/"+ categoryId)
  }

  public buyEntries(addOrderCredentials: addOrderRequest){
    return this.post<AddOrderResponse>('/makeAnOrder', addOrderCredentials)
  }

  public getBuys() {
    return this.get<OrdersResponse>('/orders');
  }

}
