import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {Observable, of} from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as EmailSenderActions from '../actions/emailSender.action';
import {EmailSenderModel} from "../emailSender.model";
import {EmailSenderService} from "../httpservices/emailSender.service";


@Injectable()
export class EmailSenderEffects {
  constructor(private emailSenderService: EmailSenderService, private action$: Actions) {}

  GetEmails$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(EmailSenderActions.GetEmailSenderAction),
      mergeMap(action =>
        this.emailSenderService.getEmails().pipe(
          map((data: EmailSenderModel[]) => {
            return EmailSenderActions.SuccessGetEmailSenderAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(EmailSenderActions.ErrorEmailSenderAction(error));
          })
        )
      )
    )
  );

  SendEmails$: Observable<Action> = createEffect(() => {
      return this.action$.pipe(
        ofType(EmailSenderActions.CreateEmailSenderAction),
        mergeMap(action => {
            return of(EmailSenderActions.SuccessEmailSenderAction({payload: action.payload}))

          // Here should be request
            // this.emailSenderService.sendEmails(action.payload).pipe(
            //   map((data: EmailSenderModel[]) => {
            //     return EmailSenderActions.SuccessEmailSenderAction({payload: data});
            //   }),
            //   catchError((error: Error) => {
            //     return of(EmailSenderActions.ErrorEmailSenderAction(error));
            //   })
            // )
          }
        )
      )
    }
  );
}
