import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EncodotApiService } from '@shared/encodot-api';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { sendMessageAction, sendMessageFailedAction, sendMessageSuccessAction } from './write-message.actions';

@Injectable()
export class WriteMessageEffects {

  readonly sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendMessageAction),
      switchMap(({ message, password }) => {
        return this.apiSv.addMessage(message, password).pipe(
          map(meta => ({ ...meta, usePassword: !!password?.length }))
        )
      }),
      map(({ id, urlPassword, usePassword }) => sendMessageSuccessAction({ url: this.getUrl(this.document.location.origin, id, urlPassword, usePassword) })),
      catchError(error => of(sendMessageFailedAction({ error })))
    )
  );

  public constructor(
    private actions$: Actions,
    private apiSv: EncodotApiService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  private getUrl(origin: string, messageId: string, urlPassword: string, usePassword: boolean): string {
    let url = `${ origin }/read-message?id=${ messageId }&urlPw=${ urlPassword }`;

    if (usePassword) {
      url += '&promptPw=true';
    }

    return url;
  }

}
