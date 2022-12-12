export class Like {
  id?: number;
  user_id: number;
  post_id: number;
  created_at?: Date;
  updated_at?: Date;

  constructor(user_id: number, post_id: number) {
    this.user_id = user_id;
    this.post_id = post_id;
  }
}
