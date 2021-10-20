import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EncodotApiService } from '@shared/encodot-api';
import { delayAtLeast } from '@shared/rxjs';
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
  public promptPassword = true;

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
    this.messageId = queryParams.id;
    this.urlPassword = queryParams.urlPw;
    this.promptPassword = queryParams.promptPw === 'true';

    if (!this.promptPassword) {
      this.form.controls.password.disable();
      this.getMessage();
    }
  }

  public ngOnDestroy(): void {
    this.actionSub?.unsubscribe();
  }

  public getMessage(): void {
    if (this.actionSub?.closed === false && this.promptPassword) {
      return;
    }

    this.clearMessage = null;
    this.error = null;

    const password = this.form.value.password;

    this.actionSub = this.apiSv.getMessage(this.messageId, password, this.urlPassword).pipe(
      delayAtLeast(1000)
    ).subscribe(({ message }) => {
      console.log('Got message', message);
      this.clearMessage = message;
    }, e => {
      console.error('Could not load message', e);
      this.error = 'Something went wrong :(';
    });
  }

}
