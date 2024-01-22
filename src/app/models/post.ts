export interface Post {
  id: number,
  name: string,
  description: string,
  media: string[],
  published_at: Date,
  images_url: string[]

}

export interface PostResponse {
  posts: PostsModel
}

export interface PostsModel {
  current_page: number;
  next_page_url: string;
  data: Post[];
}
