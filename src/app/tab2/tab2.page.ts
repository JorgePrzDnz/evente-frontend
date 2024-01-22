import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  public posts: any;
  public page: any;
  public finishedDownloading: boolean = false;

  constructor(
    private postService: PostService,
  ) {}

  ngOnInit() {
    this.finishedDownloading = false
    this.getPosts()

  }

  public getPosts(){
    this.postService.getPosts().subscribe(response => {
      this.posts = response.posts.data
      this.page = response.posts.current_page+1
      console.log(this.page)
    }, error => {
      console.log("error");
    });
  }

  public loadMorePosts($event:any) {
    this.postService.loadMorePosts(this.page).subscribe(response => {
      this.loadNextPosts($event, response);
    });
  }

  private loadNextPosts($event: any, response:any) {
    if (!response.posts.next_page_url) {
      this.finishedDownloading = true;
    }
    if (response.posts.data.length !== 0){
      this.page++;
      response.posts.data.map((post:any) => {
        this.posts.push(post);
        $event.target.complete();
      });
    }else{
      $event.target.disabled = true;
    }
  }
}
