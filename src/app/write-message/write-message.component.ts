import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as forge from 'node-forge';
import { combineLatest, Subscription, timer } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { MessageMetadata } from './models/message-metadata.model';
import { WriteMessageRequestService } from './write-message-request.service';

@Component({
  selector: 'app-write-message',
  templateUrl: './write-message.component.html',
  styleUrls: ['./write-message.component.scss']
})
export class WriteMessageComponent implements OnInit, OnDestroy {

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

    this.messageMetadata = null;
    this.error = null;
    const { message, password } = this.form.value;

    const meta$ = this.reqSv.getKey().pipe(
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
