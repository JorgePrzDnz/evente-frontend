import { Injectable } from "@angular/core";
import { loginRequest, LoginResponse, registerRequest, RegisterResponse, updateProfileRequest, UpdateProfileResponse, ProfileResponse} from "../models/auth";
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

  public getProfile(){
    return this.get<ProfileResponse>("/profile")
  }

  public updateProfile(updateProfileCredentials: updateProfileRequest){
    return this.put<UpdateProfileResponse>('/profile/edit', updateProfileCredentials)
  }

  public logout(){
    localStorage.removeItem('EVE-TOKEN');
    Api.token = null;
  }
}
