import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(
    private http: HttpClient
  ) {}

  public getAll(){
    return this.http.get('http://127.0.0.1:8000/api/events')
  }
}
