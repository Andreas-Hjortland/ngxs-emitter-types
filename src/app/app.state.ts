import { Injectable } from '@angular/core';
import { EmitterAction, Receiver } from '@ngxs-labs/emitter';
import { Selector, State, StateContext } from '@ngxs/store';

export type Post = {
  id: number;
  title: string;
  content: string;
};
export type AppStateModel = {
  posts: Post[];
};

@State<AppStateModel>({
  name: 'app',
  defaults: {
    posts: [
      { id: 1, title: 'Hello, world', content: 'This is a test' },
      { id: 2, title: 'Another one', content: 'Hiya =)' },
    ],
  },
})
@Injectable()
export class AppState {
  @Selector()
  static getPosts(state: AppStateModel): Post[] {
    return state.posts;
  }

  @Receiver()
  static addPost(
    ctx: StateContext<AppStateModel>,
    { payload }: EmitterAction<{ content: string; title: string }>
  ) {
    const existing = ctx.getState();
    ctx.setState({
      ...existing,
      posts: [
        ...existing.posts,
        {
          id: existing.posts.at(-1).id + 1,
          content: payload.content,
          title: payload.title
        },
      ],
    });
  }

  @Receiver()
  static removePost(
    ctx: StateContext<AppStateModel>,
    { payload }: EmitterAction<Post>
  ) {
    const existing = ctx.getState();
    ctx.setState({
      ...existing,
      posts: existing.posts.filter((post) => post.id !== payload.id),
    });
  }
}
