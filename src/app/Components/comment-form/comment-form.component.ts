/* Basado en el commentForm de https://github.com/monsterlessonsacadem */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/Services/comment.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent implements OnInit {
  @Input() initialText: string = '';
  @Output() handleSubmit = new EventEmitter<string>();
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      content: [this.initialText, Validators.required],
    });
  }

  onSubmit(): void {
    console.log(this.form.value.content);
    this.handleSubmit.emit(this.form.value.content);
    this.form.reset();
  }
}
