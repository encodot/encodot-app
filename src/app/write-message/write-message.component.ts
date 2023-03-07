import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Store } from '@ngrx/store';
import { sendMessageAction } from './state/write-message.actions';
import { selectWriteMessageError, selectWriteMessageLoading, selectWriteMessageUrl } from './state/write-message.selectors';

@Component({
  selector: 'app-write-message',
  templateUrl: './write-message.component.html',
  styleUrls: ['./write-message.component.scss']
})
export class WriteMessageComponent {

  public loading$ = this.store.select(selectWriteMessageLoading);
  public url$ = this.store.select(selectWriteMessageUrl);
  public error$ = this.store.select(selectWriteMessageError);

  public form = new UntypedFormGroup({
    message: new UntypedFormControl(null, [ Validators.required ]),
    password: new UntypedFormControl()
  });

  public constructor(
    private snackbar: MatSnackBar,
    private store: Store
  ) { }

  public addMessage(): void {
    const stripParams = ({ message, password }) => ({ message, password });
    this.store.dispatch(sendMessageAction(stripParams(this.form.value)));
  }

  public copiedToClipboard(): void {
    this.snackbar.open('Copied message URL to clipboard! :)', null, {
      duration: 2000
    });
  }

}
