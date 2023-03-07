import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WriteMessageState } from './write-message.reducer';

export const WRITE_MESSAGE_STATE = 'writeMessage';

export const selectWriteMessage = createFeatureSelector<WriteMessageState>(WRITE_MESSAGE_STATE);

export const selectWriteMessageLoading = createSelector(selectWriteMessage, ({ loading }) => loading);
export const selectWriteMessageError = createSelector(selectWriteMessage, ({ error }) => error);
export const selectWriteMessageUrl = createSelector(selectWriteMessage, ({ url }) => url);
