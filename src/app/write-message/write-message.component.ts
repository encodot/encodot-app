import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EncodotApiService } from '@shared/encodot-api';
import { combineLatest, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-write-message',
  templateUrl: './write-message.component.html',
  styleUrls: ['./write-message.component.scss']
})
export class WriteMessageComponent implements OnDestroy {

  public actionSub: Subscription;

  public form = new FormGroup({
    message: new FormControl(null, [ Validators.required ]),
    password: new FormControl()
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

    this.actionSub = combineLatest([
      meta$,
      timer(1000)
    ]).subscribe(([ m ]) => {
      const { id, urlPassword } = m;
      console.log('Got message metadata', m);
      this.url = this.getUrl(window.location.origin, id, urlPassword, password?.length > 0)
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
