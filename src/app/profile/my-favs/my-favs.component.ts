import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-my-favs',
  templateUrl: './my-favs.component.html',
  styleUrls: ['./my-favs.component.scss'],
})
export class MyFavsComponent  implements OnInit {

  public likedPosts: any;

  constructor(
    private postService: PostService,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {}

  ionViewWillEnter(){
    this.presentLoading()
    this.getLikedPosts()
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando publicaciones que te han gustado',
      spinner: 'bubbles'
    });
    await loading.present();
  }

  public getLikedPosts(){
    this.postService.getLikedPosts().subscribe(response => {
      this.likedPosts = response.posts_liked;
      this.loadingController.dismiss();
    });
  }

}
