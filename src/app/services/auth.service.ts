import { Injectable } from "@angular/core";
import { loginRequest, LoginResponse, registerRequest, RegisterResponse, updateProfileRequest, UpdateProfileResponse} from "../models/auth";
import { Api } from "./api.service";

@Injectable({
  providedIn: 'root'
})

export class Auth extends Api{

  public login(loginCredentials: loginRequest){
    return this.post<LoginResponse>('/login', loginCredentials)
  }

  public register(registerCredentials: registerRequest){
    return this.post<RegisterResponse>('/register', registerCredentials)
  }

  public updateProfile(updateProfileCredentials: updateProfileRequest){
    return this.put<UpdateProfileResponse>('/profile/edit', updateProfileCredentials)
  }

}
