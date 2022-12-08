export class Comment {
  id?: number;
  content: string;
  reported: boolean;
  num_likes: number;
  user_id: number;
  post_id: number;
  reported_by?: number;
  created_at?: Date;
  updated_at?: Date;

  constructor(title: string, user_id: number, image_id: number) {
    this.content = title;
    this.reported = false;
    this.num_likes = 0;
    this.user_id = user_id;
    this.post_id = image_id;
  }
}
