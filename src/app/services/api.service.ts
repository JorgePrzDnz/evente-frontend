import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class Api {

  static TOKEN_NAME = 'EVE-TOKEN'

  protected static token? : any;
  protected host: string;

  constructor(private http: HttpClient) {
    this.host = environment.apiBaseUrl
    Api.token = localStorage.getItem(Api.TOKEN_NAME)
  }


  get<T>(uri: string) {
    return this.http.get<T>(this.host + uri, {
      headers: this.getHeaders()
    })
  }

  post<T>(uri: string, body: any) {
    return this.http.post<T>(this.host + uri, body, {
      headers: this.getHeaders(),
    })
  }

  put<T>(uri: string, body: Object) {
    return this.http.put<T>(this.host + uri, body, {
      headers: this.getHeaders(),
    })
  }

  delete<T>(uri: string, body: any) {
    return this.http.delete<T>(this.host + uri, {
      headers: this.getHeaders(),
    })
  }

  private getHeaders() {

    let headers: { Accept: string; Authorization?: string } = {
      Accept: 'application/json',
    };

    if (Api.token) {
      headers.Authorization = `Bearer ${Api.token}`;
    }

    return headers;
  }

  protected getToken() {
    return Api.token
  }

  setToken(token: string) {
    localStorage.setItem(Api.TOKEN_NAME, token)
    Api.token = token
  }

}
