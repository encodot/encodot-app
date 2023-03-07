import { createReducer, on } from '@ngrx/store';
import { sendMessageAction, sendMessageFailedAction, sendMessageSuccessAction } from './write-message.actions';

export interface WriteMessageState {
  loading: boolean;
  url: string;
  error: Error;
}

export const initialWriteMessageState: WriteMessageState = {
  loading: false,
  url: null,
  error: null
};

export const writeMessageReducer = createReducer(
  initialWriteMessageState,
  on(
    sendMessageAction,
    state => ({
      ...state,
      loading: true,
      error: null
    })
  ),
  on(
    sendMessageSuccessAction,
    (state, { url }) => ({
      ...state,
      loading: false,
      url,
      error: null
    })
  ),
  on(
    sendMessageFailedAction,
    (state, { error }) => ({
      ...state,
      loading: false,
      url: null,
      error
    })
  )
);
