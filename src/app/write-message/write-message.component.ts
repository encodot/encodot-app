import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { WriteMessageStore } from './write-message.store';

@Component({
  selector: 'app-write-message',
  templateUrl: './write-message.component.html',
  styleUrls: ['./write-message.component.scss'],
  providers: [ WriteMessageStore ]
})
export class WriteMessageComponent {

  public loading$ = this.writeMessageStore.loading$;
  public url$ = this.writeMessageStore.url$;
  public error$ = this.writeMessageStore.error$;

  public form = new UntypedFormGroup({
    message: new UntypedFormControl(null, [ Validators.required ]),
    password: new UntypedFormControl()
  });

  public get formInvalid(): boolean {
    return this.form.invalid;
  }

  public constructor(
    private snackbar: MatSnackBar,
    private writeMessageStore: WriteMessageStore
  ) { }

  public addMessage(): void {
    const stripParams = ({ message, password }) => ({ message, password });

    this.writeMessageStore.addMessage(stripParams(this.form.value));
  }

  public copiedToClipboard(): void {
    this.snackbar.open('Copied message URL to clipboard! :)', null, {
      duration: 2000
    });
  }

}
