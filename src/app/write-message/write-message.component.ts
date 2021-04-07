import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { WriteMessageRequestService } from './write-message-request.service';
import * as forge from 'node-forge';

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

  public constructor(
    private reqSv: WriteMessageRequestService
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
    }, e => {
      console.error('Could not send message :(', e);
    })
  }

}
