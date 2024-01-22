import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PostResponse } from "../models/post";
import { Api } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class PostService extends Api{

  public getPosts(){
    return this.get<PostResponse>("/posts")
  }

  public loadMorePosts(page: number){
    return this.get<PostResponse>('/posts?page=' + page);
  }
}
