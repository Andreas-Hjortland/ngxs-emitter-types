import { Component, VERSION } from '@angular/core';
import { Emitter, EmitterService } from '@ngxs-labs/emitter';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EmittableFunction } from 'src';
import { AppState, Post } from './app.state';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  title: string;
  content: string;

  @Select(AppState.getPosts)
  posts: Observable<ReturnType<typeof AppState.getPosts>>;

  @Emitter(AppState.addPost)
  addPost: EmittableFunction<typeof AppState.addPost>;

  constructor(private readonly emitterService: EmitterService) { }

  removePost(post: Post) {
    this.emitterService.action(AppState.removePost).emit(post);
  }

  keydown($event: KeyboardEvent) {
    if ($event.ctrlKey && $event.key === '\n') {
      this.submit($event);
    }
  }

  submit($event: Event) {
    $event.preventDefault();
    if (!this.title || !this.content) return;
    this.addPost.emit({
      title: this.title,
      content: this.content,
    }).subscribe({
      complete: () => {
        this.title = this.content = '';
      },
    });
  }
}
