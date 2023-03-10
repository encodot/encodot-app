import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EncodotApiService } from '@shared/encodot-api';
import { MessageResult } from '@shared/models';
import { catchError, concatMap, filter, first, map, NEVER, Observable, switchMap, tap } from 'rxjs';

export interface ReadMessageState {
  id: string;
  urlPw: string;
  promptPw: boolean;
  loading: boolean;
  message: string;
  error: string;
}

@Injectable()
export class ReadMessageStore extends ComponentStore<ReadMessageState> {

  public readonly loadParams = this.effect((params$: Observable<{ id: string, urlPw: string, promptPw: boolean }>) => {
    return params$.pipe(
      tap(({ id, urlPw, promptPw }) => {
        this.patchState({ id, urlPw, promptPw });

        if (!promptPw) {
          this.loadMessage(null);
        }
      })
    );
  });

  public readonly loadMessage = this.effect((password$: Observable<string>) => {
    return password$.pipe(
      concatMap(pw => {
        return this.params$.pipe(
          first(),
          map(p => ({ ...p, pw }))
        );
      }),
      filter(({ id, urlPw }) => id != null && urlPw != null),
      switchMap(({ id, urlPw, pw }) => {
        this.patchState({ loading: true, error: null });
        return this.apiSv.getMessage(id, pw, urlPw).pipe(
          catchError(e => {
            this.patchState({ loading: false, error: 'Could not load message', message: null });
            return NEVER;
          })
        )
      }),
      tap((res: MessageResult) => {
        this.patchState({ loading: false, error: null, message: res.message });
      })
    );
  });

  public readonly id$ = this.select(({ id }) => id);
  public readonly urlPw$ = this.select(({ urlPw }) => urlPw);
  public readonly promptPw$ = this.select(({ promptPw }) => promptPw);
  public readonly loading$ = this.select(({ loading }) => loading);
  public readonly message$ = this.select(({ message }) => message);
  public readonly error$ = this.select(({ error }) => error);

  public readonly paramsMissing$ = this.select(this.id$, this.urlPw$, this.promptPw$, (id, urlPw, promptPw) => {
    return id == null || urlPw == null || promptPw == null;
  });
  public readonly showPasswordForm$ = this.select(this.paramsMissing$, this.loading$, this.promptPw$, this.message$, (paramsMissing, loading, promptPw, message) => {
    return !paramsMissing && !loading && promptPw === true && message == null;
  });
  public readonly params$ = this.select(this.id$, this.urlPw$, this.promptPw$, (id, urlPw, promptPw) => ({ id, urlPw, promptPw }));

  public constructor(private apiSv: EncodotApiService) {
    super({
      id: null,
      urlPw: null,
      promptPw: false,
      loading: false,
      message: null,
      error: null
    });
  }

}
