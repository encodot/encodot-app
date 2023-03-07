import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { EncodotApiService } from '@shared/encodot-api';
import { MessageMetadata } from '@shared/models';
import { concat, Observable, of, Subscription } from 'rxjs';
import { catchError, concatMap, last, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.scss']
})
export class TestApiComponent implements OnInit, OnDestroy {

  public actionSub: Subscription;

  public form = new UntypedFormGroup({
    testCycles: new UntypedFormControl(10, [ Validators.required, Validators.min(1), Validators.max(10000) ]),
    msgMin: new UntypedFormControl(1, [ Validators.required, Validators.min(1), Validators.max(1000) ]),
    msgMax: new UntypedFormControl(500, [ Validators.required, Validators.min(2), Validators.max(10000) ]),
    passwordMin: new UntypedFormControl(1, [ Validators.required, Validators.min(1), Validators.max(50) ]),
    passwordMax: new UntypedFormControl(50, [ Validators.required, Validators.min(2), Validators.max(1000) ]),
    specialChars: new UntypedFormControl(false)
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

    const addMessage = () => {
      return this.apiSv.addMessage(msg, pw);
    };

    const getMessage = (meta: MessageMetadata) => {
      const { id, urlPassword } = meta;
      return this.apiSv.getMessage(id, pw, urlPassword);
    };

    let startTime: number;

    return of(null).pipe(
      tap(() => {
        console.log('Message to encrpyt', msg);
        startTime = Date.now();
      }),
      concatMap(k => addMessage()),
      concatMap((meta) => getMessage(meta)),
      map(m => {
        if (m.message !== msg) {
          throw new Error(`Message missmatch! ${msg} ${m.message}`);
        }

        return Date.now() - startTime;
      }),
      catchError(e => {
        console.error('Test cycle failed', e);
        return of(e);
      })
    );
  }

  private getRandomString(min: number, max: number, specialChars: boolean): string {
    const strLen = min + Math.floor(Math.random() * (max - min));
    let str = '';

    const randomChar = (): string => {
      if (!specialChars) {
        const charMap = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return charMap[Math.floor(Math.random() * charMap.length)];
      }

      return String.fromCharCode(32 + Math.floor(Math.random() * (1520 - 32)));
    };

    for (let i = 0; i < strLen; i++) {
      str += randomChar();
    }

    return str;
  }

}
