import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { ReadMessageStore } from './read-message.store';

@Component({
  selector: 'app-read-message',
  templateUrl: './read-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./read-message.component.scss'],
  providers: [ ReadMessageStore ]
})
export class ReadMessageComponent implements OnInit {

  public paramsMissing$ = this.readMessageStore.paramsMissing$;
  public showPasswordForm$ = this.readMessageStore.showPasswordForm$;
  public id$ = this.readMessageStore.id$;
  public loading$ = this.readMessageStore.loading$;
  public message$ = this.readMessageStore.message$;
  public error$ = this.readMessageStore.error$;

  public form = new UntypedFormGroup({
    password: new UntypedFormControl(null, Validators.required)
  });

  public constructor(
    private activatedRoute: ActivatedRoute,
    private readMessageStore: ReadMessageStore
  ) { }

  public ngOnInit(): void {
    const params$ = this.activatedRoute.queryParams.pipe(
      map(({ id, urlPw, promptPw }) => ({ id, urlPw, promptPw: promptPw === 'true' }))
    );

    this.readMessageStore.loadParams(params$);
  }

  public getMessage(): void {
    if (this.form.invalid) {
      console.error('Form invalid');
      return;
    }

    this.readMessageStore.loadMessage(this.form.value.password);
  }

}
