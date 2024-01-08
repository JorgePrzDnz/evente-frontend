import { Injectable } from "@angular/core";
import { Api } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends Api {
  // public updateProfile(profile) {
  //   return this.post<ProfileResponse>('/profile/edit', profile);
  // }
}
