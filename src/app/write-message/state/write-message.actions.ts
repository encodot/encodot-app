import { createAction, props } from '@ngrx/store';

export const sendMessageAction = createAction(
  '[Write Message] sendMessageAction',
  props<{ message: string, password: string }>()
);

export const sendMessageSuccessAction = createAction(
  '[Write Message] sendMessageSuccessAction',
  props<{ url: string}>()
);

export const sendMessageFailedAction = createAction(
  '[Write Message] sendMessageFailedAction',
  props<{ error: Error }>()
);

