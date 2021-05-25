import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, of, Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { ReadMessageRequestService } from './read-message-request.service';
import * as forge from 'node-forge';

@Component({
  selector: 'app-read-message',
  templateUrl: './read-message.component.html',
  styleUrls: ['./read-message.component.scss']
})
export class ReadMessageComponent implements OnInit, OnDestroy {

  public actionSub: Subscription;
  public messageId: string;
  private urlPassword: string;

  public clearMessage: string;
  public error: string;

  public form = new FormGroup({
    password: new FormControl(null, Validators.required)
  });

  public constructor(
    private activatedRoute: ActivatedRoute,
    private reqSv: ReadMessageRequestService
  ) { }

  public ngOnInit(): void {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    this.messageId = queryParams['messageId'];
    this.urlPassword = queryParams['urlPassword'];
  }

  public ngOnDestroy(): void {
    this.actionSub?.unsubscribe();
  }

  public getMessage(): void {
    if (this.actionSub?.closed === false) {
      return;
    }

    this.clearMessage = null;
    this.error = null;

    const password = this.form.value.password;

    this.actionSub = this.reqSv.getKey().pipe(
      concatMap(({ key }) => {
        console.log('Got key', key);

        const apiPubKey = forge.pki.publicKeyFromPem(key);

        const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair(1024);
        const publicKeyPem = forge.pki.publicKeyToPem(publicKey);

        return combineLatest([
          of(privateKey),
          this.reqSv.getMessage(
            publicKeyPem,
            forge.util.encode64(apiPubKey.encrypt(this.messageId)),
            forge.util.encode64(apiPubKey.encrypt(password)),
            forge.util.encode64(apiPubKey.encrypt(this.urlPassword))
          )
        ]);
      })
    ).subscribe(([ privateKey, m ]) => {
      console.log('Got message', m);
      this.clearMessage = privateKey.decrypt(forge.util.decode64(m.message));
      console.log('Clear message', this.clearMessage);
    }, e => {
      console.error('Could not load message', e);
      this.error = 'Something went wrong :(';
    });
  }

}
