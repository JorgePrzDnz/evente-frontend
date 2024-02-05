import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  public posts: any;
  public likedPosts: any;
  public likedPost: any;
  public page: any;
  public finishedDownloading: boolean = false;
  public isLiked: any;
  public like: any;

  constructor(
    private postService: PostService,
    private loadingController: LoadingController,
  ) {}

  ngOnInit() {
    this.presentLoading()
    this.finishedDownloading = false
    this.getPosts()
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando publicaciones',
      spinner: 'bubbles'
    });
    await loading.present();
  }

  public getPosts(){
    this.postService.getPosts().subscribe(response => {
      this.posts = response.posts.data
      this.page = response.posts.current_page+1
      this.loadingController.dismiss();
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

  public unlikePost(postid: number) {
    this.postService.unlikePost(postid).subscribe(response => {
      const postUnliked = this.filterPostById(postid)
      postUnliked.is_liked = false;
      this.posts = [...this.posts]
    });
  }

  public likePost(postid: number) {
    this.postService.likePost(postid).subscribe(response => {
      const postLiked = this.filterPostById(postid)
      postLiked.is_liked = true;
      this.posts = [...this.posts]
    });
  }

  private filterPostById(postid: number){
    return this.posts.find((post: any) => postid === post.id)
  }
}
