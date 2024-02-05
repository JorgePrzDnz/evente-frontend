import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PostResponse, LikeResponse, LikedPostsResponse } from "../models/post";
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

  public likePost(id:number) {
    return this.post<LikeResponse>('/post/like/' + id, {});
  }
  public unlikePost(id:number) {
    return this.delete<LikeResponse>('/post/unlike/' + id, {});
  }

  public getLikedPosts() {
    return this.get<LikedPostsResponse>('/likedPosts');
  }
}
