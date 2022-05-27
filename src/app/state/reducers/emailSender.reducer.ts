import { Action, createReducer, on } from '@ngrx/store';
import * as EmailSenderActions from '../actions/emailSender.action';
import { initializeEmailState } from '../emailSender.state';
import EmailSenderState from "../emailSender.state";
import {EmailSenderModel} from "../emailSender.model";
import {EmailFormSuccessInterface} from "../state.interface";

const initialEmailState = initializeEmailState();

const reducerEmailSender = createReducer(
  initialEmailState,
  on(EmailSenderActions.GetEmailSenderAction, state => state),

  on(EmailSenderActions.SuccessGetEmailSenderAction, (state: EmailSenderState, data: { payload: EmailSenderModel[] }) => {
    return { ...state, emailInforms: data.payload, emailInformError: null };
  }),

  on(EmailSenderActions.CreateEmailSenderAction, (state: EmailSenderState, data: { payload: EmailSenderModel[] }) => {
    const emailInformList: EmailSenderModel[] = state.emailInforms.concat(data.payload);
    return { ...state, emailInforms: emailInformList, emailInformError: null, emailInformSuccess: null};
  }),

  on(EmailSenderActions.SuccessEmailSenderAction, (state: EmailSenderState, data: { payload: EmailSenderModel[] }) => {
    const emailInformSuccess: EmailFormSuccessInterface = {name: 'Success', message: 'Your request has been sent.'}
    return { ...state, emailInforms: data.payload, emailInformSuccess: emailInformSuccess } ;
  }),

  on(EmailSenderActions.ErrorEmailSenderAction, (state: EmailSenderState, error: Error) => {
    // remove below line and use different telemetry logging
    console.error(error);
    return { ...state, emailInformSuccess: null, emailInformError: error };
  })
);

export function emailSenderReducer(
  state: EmailSenderState | undefined,
  action: Action
): EmailSenderState {
  return reducerEmailSender(state, action);
}
