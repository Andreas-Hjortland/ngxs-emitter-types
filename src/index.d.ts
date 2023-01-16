import type { Emittable, EmitterAction } from '@ngxs-labs/emitter';
import type { Observable } from 'rxjs';

declare type SelectableFunction<T extends (...args: any) => any> = Observable<ReturnType<T>>;

type EmitterFunctionBase = (ctx: any, action: EmitterAction<any>) => any;
type EmittableParams<T extends EmitterFunctionBase> = T extends (
  ctx: any,
  action: infer TAction
) => any
  ? TAction extends EmitterAction<infer TPayload>
    ? TPayload
    : void
  : never;
declare type EmittableFunction<
  T extends EmitterFunctionBase,
  U = any
> = Emittable<EmittableParams<T>, U>;

declare module '@ngxs-labs/emitter' {
  interface EmitterService {
    action<T extends EmitterFunctionBase, U = any>(
      receiver: T
    ): Emittable<EmittableParams<T>, U>;
  }
}
