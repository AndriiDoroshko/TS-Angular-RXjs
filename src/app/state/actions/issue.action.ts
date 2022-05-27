import { createAction, props } from '@ngrx/store';
import Issue from '../issue.model';

export const GetIssueAction = createAction('[Issue] - Get Issue');

export const CreateIssueAction = createAction(
  '[Issue] - Create Issue',
  props<Issue>()
);

export const BeginGetIssueAction = createAction('[Issue] - Begin Get Issue');

export const SuccessGetIssueAction = createAction(
  '[Issue] - Success Get Issue',
  props<{ payload: Issue[] }>()
);

export const BeginCreateIssueAction = createAction(
  '[Issue] - Begin Create Issue',
  props<{ payload: Issue }>()
);

export const BeginEditIssueAction = createAction(
  '[Issue] - Begin Edit Issue',
  props<{ payload: Issue }>()
);

export const SuccessEditIssueAction = createAction(
  '[Issue] - Edit Issue',
  props<{ payload: Issue }>()
);

export const SuccessCreateIssueAction = createAction(
  '[Issue] - Success Create Issue',
  props<{ payload: Issue }>()
);

export const ErrorIssueAction = createAction('[Issue] - Error', props<Error>());
