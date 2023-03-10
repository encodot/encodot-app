import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { EncodotApiService } from '@shared/encodot-api';
import { exhaustMap, Observable } from 'rxjs';

export interface WriteMessageState {
  loading: boolean;
  url: string;
  error: string;
}

@Injectable()
export class WriteMessageStore extends ComponentStore<WriteMessageState> {

  // Selectors

  public readonly loading$ = this.select(({ loading }) => loading);
  public readonly url$ = this.select(({ url }) => url);
  public readonly error$ = this.select(({ error }) => error);

  // Effects

  public readonly addMessage = this.effect((addMessageDto$: Observable<{ message: string, password: string }>) =>
    addMessageDto$.pipe(
      exhaustMap(({ message, password }) => {
        this.patchState({ loading: true, error: null });
        return this.apiSv.addMessage(message, password).pipe(
          tapResponse(
            res => {
              const url = this.getUrl(this.document.location.origin, res.id, res.urlPassword, password?.length > 0);
              this.patchState({ loading: false, error: null, url });
            },
            e => {
              console.error('Could not send message', e);
              this.patchState({ loading: false, error: 'Could not send message', url: null });
            }
          )
        )
      })
    )
  );

  public constructor(private apiSv: EncodotApiService, @Inject(DOCUMENT) private document: Document) {
    super({
      loading: false,
      url: null,
      error: null
    });
  }

  private getUrl(origin: string, messageId: string, urlPassword: string, usePassword: boolean): string {
    let url = `${ origin }/read-message?id=${ messageId }&urlPw=${ urlPassword }`;

    if (usePassword) {
      url += '&promptPw=true';
    }

    return url;
  }

}
