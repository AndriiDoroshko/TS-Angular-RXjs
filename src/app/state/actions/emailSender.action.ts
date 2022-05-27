import { createAction, props } from '@ngrx/store';
import {EmailSenderModel} from "../emailSender.model";

export const GetEmailSenderAction = createAction('[EmailSender] - Get Emails');

export const SuccessGetEmailSenderAction = createAction(
  '[EmailSender] - Success Get Emails',
  props<{ payload: EmailSenderModel[] }>()
);

export const CreateEmailSenderAction = createAction(
  '[EmailSender] - Create Emails',
  props<{ payload: EmailSenderModel[] }>()
);

export const SuccessEmailSenderAction = createAction(
  '[EmailSender] - Success Create Emails',
  props<{ payload: EmailSenderModel[] }>()
);

export const ErrorEmailSenderAction = createAction('[EmailSender] - Error', props<Error>());
