import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface ReadMessageStore {
  promptPassword: boolean;
  message: string;
  loading: boolean;
}

@Injectable()
export class ReadMessageStore extends ComponentStore<ReadMessageStore> {
  readonly load = this.effect(() => {

  });
}
