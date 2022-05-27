import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {Observable, of} from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as IssueActions from '../actions/issue.action';
import { IssueService } from '../httpservices/issue.service';
import Issue from '../issue.model';

@Injectable()
export class IssueEffects {
  constructor(private issueService: IssueService, private action$: Actions) {}

  GetIssueList$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(IssueActions.BeginGetIssueAction),
      mergeMap(action =>
        this.issueService.getIssueList().pipe(
          map((data: Issue[]) => {
            return IssueActions.SuccessGetIssueAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(IssueActions.ErrorIssueAction(error));
          })
        )
      )
    )
  );

  CreateNewIssue$: Observable<Action> = createEffect(() => {
      return this.action$.pipe(
        ofType(IssueActions.BeginCreateIssueAction),
        mergeMap(action => {
            return of(IssueActions.SuccessCreateIssueAction({payload: action.payload}))
          }
          // Here should be request
          // this.issueService.createNewIssue(action.payload).pipe(
          //   map((data: Issue) => {
          //     return ToDoActions.SuccessCreateToDoAction({payload: data});
          //   }),
          //   catchError((error: Error) => {
          //     return of(ToDoActions.ErrorToDoAction(error));
          //   })
          // )
        )
      )
    }
  );

  EditIssue$: Observable<Action> = createEffect(() => {
    return this.action$.pipe(
      ofType(IssueActions.BeginEditIssueAction),
      mergeMap(action => of(IssueActions.SuccessEditIssueAction({payload: action.payload})))
    );
  });
}
