import { Component } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private postService: PostService,
  ) {}

  public getPosts(){
    this.postService.getAll().subscribe(response => {
      console.log(response)
    }, error => {
      console.log("error");
    });
  }

}
