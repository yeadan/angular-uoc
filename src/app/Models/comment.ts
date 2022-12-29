export class Comment {
  id?: number;
  content: string;
  reported: boolean;
  user_id: number;
  post_id: number;
  reported_by?: number | null;
  created_at?: Date;
  updated_at?: Date;

  constructor(content: string, user_id: number, post_id: number) {
    this.content = content;
    this.reported = false;
    this.user_id = user_id;
    this.post_id = post_id;
  }
}
