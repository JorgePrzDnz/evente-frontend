import { Injectable } from "@angular/core";
import { loginRequest, LoginResponse} from "../models/auth";
import { Api } from "./api.service";

@Injectable({
  providedIn: 'root'
})

export class Auth extends Api{

  public login(loginCredentials: loginRequest){
    return this.post<LoginResponse>('/login', loginCredentials)
  }

}
