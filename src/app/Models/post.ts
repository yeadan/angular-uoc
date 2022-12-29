export class Post {
  id?: number;
  title: string;
  description: string;
  public: boolean;
  reported: boolean;
  num_likes: number;
  user_id: number;
  image_id: number;
  reported_by?: number | null;
  created_at?: Date;
  updated_at?: Date;

  constructor(
    title: string,
    description: string,
    isPublic: boolean,
    user_id: number,
    image_id: number
  ) {
    this.title = title;
    this.description = description;
    this.public = isPublic;
    this.reported = false;
    this.num_likes = 0;
    this.user_id = user_id;
    this.image_id = image_id;
  }
}
