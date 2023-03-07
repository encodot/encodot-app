import { Component, OnDestroy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { EncodotApiService } from '@shared/encodot-api';
import { delayAtLeast } from '@shared/rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-write-message',
  templateUrl: './write-message.component.html',
  styleUrls: ['./write-message.component.scss']
})
export class WriteMessageComponent implements OnDestroy {

  public actionSub: Subscription;

  public form = new UntypedFormGroup({
    message: new UntypedFormControl(null, [ Validators.required ]),
    password: new UntypedFormControl()
  });

  public error: string;
  public url: string;

  public constructor(
    private apiSv: EncodotApiService,
    private snackbar: MatSnackBar
  ) { }

  public ngOnDestroy(): void {
    this.actionSub?.unsubscribe();
  }

  public addMessage(): void {
    if (this.actionSub?.closed === false || this.form.invalid) {
      return;
    }

    this.error = null;
    this.url = null;
    const { message, password } = this.form.value;

    const meta$ = this.apiSv.addMessage(message, password === '' ? null : password);

    this.actionSub = meta$.pipe(
      delayAtLeast(1000)
    ).subscribe(({ id, urlPassword }) => {
      console.log('Got message metadata', id, urlPassword);
      this.url = this.getUrl(window.location.origin, id, urlPassword, password?.length > 0);
    }, e => {
      console.error('Could not send message', e);
      this.error = 'Something went wrong :(';
    });
  }

  public copiedToClipboard(): void {
    this.snackbar.open('Copied message URL to clipboard! :)', null, {
      duration: 2000
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
