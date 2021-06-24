import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EncodotApiService } from '@shared/encodot-api';
import { MessageMetadata } from '@shared/models';
import * as forge from 'node-forge';
import { combineLatest, concat, Observable, of, Subscription } from 'rxjs';
import { catchError, concatMap, last, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.scss']
})
export class TestApiComponent implements OnInit, OnDestroy {

  public actionSub: Subscription;

  public form = new FormGroup({
    testCycles: new FormControl(10, [ Validators.required, Validators.min(1), Validators.max(10000) ]),
    msgMin: new FormControl(1, [ Validators.required, Validators.min(1), Validators.max(1000) ]),
    msgMax: new FormControl(500, [ Validators.required, Validators.min(2), Validators.max(10000) ]),
    passwordMin: new FormControl(1, [ Validators.required, Validators.min(1), Validators.max(50) ]),
    passwordMax: new FormControl(50, [ Validators.required, Validators.min(2), Validators.max(1000) ]),
    specialChars: new FormControl(false)
  });

  public results: (number | Error)[] = [];

  public constructor(
    private apiSv: EncodotApiService,
    private snackbar: MatSnackBar
  ) { }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.actionSub?.unsubscribe();
  }

  public startTest(): void {
    if (this.actionSub?.closed === false) {
      return;
    }

    const { testCycles, msgMin, msgMax, pwMin, pwMax, specialChars } = this.form.value;
    this.results = [];

    const testCycles$ = new Array(testCycles).fill(null).map(() => {
      return this.runTestCycle(msgMin, msgMax, pwMin, pwMax, specialChars).pipe(
        tap((res: number | Error) => {
          console.log('Test completed', res);
          this.results.push(res);
        })
      );
    });

    this.actionSub = concat(...testCycles$).pipe(last()).subscribe(() => {
      console.log('Finished all test cycles! :)');
      this.snackbar.open(`Finished tests! :) ${this.results.filter(r => typeof(r) !== 'number').length} errors`);
    }, e => {
      console.error('Something went wrong bro!', e);
    });
  }

  private runTestCycle(msgMin: number, msgMax: number, pwMin: number, pwMax: number, specialChars: boolean): Observable<number | Error> {
    const msg = this.getRandomString(msgMin, msgMax, specialChars);
    const pw = this.getRandomString(pwMin, pwMax, specialChars);

    const key$ = this.apiSv.getKey().pipe(
      map(({ key }) => forge.pki.publicKeyFromPem(key))
    );

    const addMessage = (key: forge.pki.rsa.PublicKey) => {
      const messageEnc = forge.util.encode64(key.encrypt(forge.util.encodeUtf8(msg)));
      const passwordEnc = forge.util.encode64(key.encrypt(forge.util.encodeUtf8(pw)));

      return combineLatest([
        of(key),
        this.apiSv.addMessage(messageEnc, passwordEnc)
      ]);
    };

    const getMessage = (key: forge.pki.rsa.PublicKey, meta: MessageMetadata) => {
      const { id, urlPassword } = meta;
      const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair(1024);
      const publicKeyPem = forge.pki.publicKeyToPem(publicKey);

      return combineLatest([
        of(privateKey),
        this.apiSv.getMessage(
          publicKeyPem,
          forge.util.encode64(key.encrypt(forge.util.encodeUtf8(id))),
          forge.util.encode64(key.encrypt(forge.util.encodeUtf8(pw))),
          forge.util.encode64(key.encrypt(forge.util.encodeUtf8(urlPassword)))
        )
      ]);
    };

    let startTime: number;

    return of(null).pipe(
      tap(() => {
        startTime = Date.now();
      }),
      concatMap(() => key$),
      concatMap(k => addMessage(k)),
      concatMap(([ key, meta ]) => getMessage(key, meta)),
      map(([ privateKey, res ]) => {
        const clearMessage = forge.util.decodeUtf8(privateKey.decrypt(forge.util.decode64(res.message)));

        if (clearMessage !== msg) {
          throw new Error(`Message missmatch! ${msg} ${clearMessage}`);
        }

        return Date.now() - startTime;
      }),
      catchError(e => {
        console.error('Test cycle failed', e);
        return of(e);
      })
    )
  }

  private getRandomString(min: number, max: number, specialChars: boolean): string {
    const strLen = min + Math.floor(Math.random() * (max - min));
    let str = '';

    const randomChar = (): string => {
      if (!specialChars) {
        const charMap = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return charMap[Math.floor(Math.random() * charMap.length)];
      }

      return String.fromCharCode(Math.floor(Math.random() * 65535));
    };

    for (let i = 0; i < strLen; i++) {
      str += randomChar();
    }

    return str;
  }

}
