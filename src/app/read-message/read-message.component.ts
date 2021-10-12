import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EncodotApiService } from '@shared/encodot-api';
import { Subscription } from 'rxjs';

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
    private apiSv: EncodotApiService
  ) { }

  public ngOnInit(): void {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    this.messageId = queryParams.messageId;
    this.urlPassword = queryParams.urlPassword;
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

    this.actionSub = this.apiSv.getMessage(this.messageId, password, this.urlPassword).subscribe(({ message }) => {
      console.log('Got message', message);
      this.clearMessage = message;
    }, e => {
      console.error('Could not load message', e);
      this.error = 'Something went wrong :(';
    });
  }

}
