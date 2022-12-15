/* Basado en el commentForm de https://github.com/monsterlessonsacadem */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/Services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit {
  @Input() initialTitle: string = '';
  @Input() initialDescription: string = '';
  @Output() handleSubmit = new EventEmitter<any>();
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [this.initialTitle, Validators.required],
      description: [this.initialDescription, Validators.required],
    });
  }

  onSubmit(): void {
    console.log({
      title: this.form.value.title,
      description: this.form.value.description,
    });
    this.handleSubmit.emit({
      title: this.form.value.title,
      description: this.form.value.description,
    });
    this.form.reset();
  }
}
