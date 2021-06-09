import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EncodotApiService } from '@shared/encodot-api';
import { MessageMetadata } from '@shared/models';
import * as forge from 'node-forge';
import { combineLatest, Subscription, timer } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.scss']
})
export class TestApiComponent implements OnInit, OnDestroy {

  public actionSub: Subscription;

  public form = new FormGroup({
    message: new FormControl(null, [ Validators.required ]),
    password: new FormControl(null, [ Validators.required ])
  });

  public messageMetadata: MessageMetadata;
  public error: string;

  public get url(): string {
    const { id, urlPassword } = this.messageMetadata;
    return `${ window.location.origin }/read-message?messageId=${ id }&urlPassword=${ urlPassword }`;
  }

  public constructor(
    private apiSv: EncodotApiService,
    private snackbar: MatSnackBar
  ) { }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.actionSub?.unsubscribe();
  }

  public addMessage(): void {
    if (this.actionSub?.closed === false || this.form.invalid) {
      return;
    }

    this.messageMetadata = null;
    this.error = null;
    const { message, password } = this.form.value;

    const meta$ = this.apiSv.getKey().pipe(
      tap(k => {
        console.log('Got api public key', k);
      }),
      concatMap(k => {
        const { key: publicKeyPem } = k;
        const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

        const messageEnc = forge.util.encode64(publicKey.encrypt(message));
        const passwordEnc = forge.util.encode64(publicKey.encrypt(password));

        return this.apiSv.addMessage(messageEnc, passwordEnc);
      })
    );

    this.actionSub = combineLatest([
      meta$,
      timer(500)
    ]).subscribe(([ m ]) => {
      console.log('Got message metadata', m);
      this.messageMetadata = m;
    }, e => {
      console.error('Could not send message :(', e);
      this.error = 'Something went wrong :(';
    })
  }

  public successfullyCopiedToClipboard(): void {
    this.snackbar.open('Copied message URL to clipboard! :)', null, {
      duration: 2000
    });
  }

}
