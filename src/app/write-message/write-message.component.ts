import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as forge from 'node-forge';
import { Subscription } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { MessageMetadata } from './models/message-metadata.model';
import { WriteMessageRequestService } from './write-message-request.service';

@Component({
  selector: 'app-write-message',
  templateUrl: './write-message.component.html',
  styleUrls: ['./write-message.component.scss']
})
export class WriteMessageComponent implements OnInit, OnDestroy {

  private actionSub: Subscription;

  public form = new FormGroup({
    message: new FormControl(null, [ Validators.required ]),
    password: new FormControl(null, [ Validators.required ])
  });

  public messageMetadata: MessageMetadata = {
    id: 'dfkajlfkjkejljewlkfjkejjefkej',
    urlPassword: 'jdjdjdjdjdjdjjdjjdjdjddjdj'
  };

  public get url(): string {
    const { id, urlPassword } = this.messageMetadata;
    return `${ window.location.host }/read-message?messageId=${ id }&urlPassword=${ urlPassword }`;
  }

  public constructor(
    private reqSv: WriteMessageRequestService,
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

    const { message, password } = this.form.value;

    this.actionSub = this.reqSv.getKey().pipe(
      tap(k => {
        console.log('Got api public key', k);
      }),
      concatMap(k => {
        const { id, key: publicKeyPem } = k;
        const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

        const messageEnc = forge.util.encode64(publicKey.encrypt(message));
        const passwordEnc = forge.util.encode64(publicKey.encrypt(password));

        return this.reqSv.addMessage(id, messageEnc, passwordEnc);
      })
    ).subscribe(m => {
      console.log(m);
      this.messageMetadata = m;
    }, e => {
      console.error('Could not send message :(', e);
    })
  }

  public successfullyCopiedToClipboard(): void {
    this.snackbar.open('Copied message URL to clipboard! :)', null, {
      duration: 2000
    });
  }

}
