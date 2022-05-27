import { Action, createReducer, on } from '@ngrx/store';
import * as IssueActions from '../actions/issue.action';
import Issue from '../issue.model';
import IssueState, { initializeState } from '../issue.state';

const initialIssueState = initializeState();

const reducerIssue = createReducer(
  initialIssueState,
  on(IssueActions.GetIssueAction, state => state),
  on(IssueActions.CreateIssueAction, (state: IssueState, todo: Issue) => {
    return { ...state, issues: [...state.issues, todo], issueError: null };
  }),
  on(IssueActions.SuccessGetIssueAction, (state: IssueState, { payload }) => {
    return { ...state, issues: payload, issueError: null };
  }),
  on(IssueActions.SuccessCreateIssueAction, (state: IssueState, { payload }) => {
    return { ...state, issues: [...state.issues, payload], issueError: null };
  }),
  on(IssueActions.SuccessEditIssueAction, (state: IssueState, { payload }) => {
    const todoList: Issue[] = state.issues.map((issue: Issue) => issue.id === payload.id ? payload : issue);
    return { ...state, issues: todoList, issueError: null };
  }),
  on(IssueActions.ErrorIssueAction, (state: IssueState, error: Error) => {
    // remove below line and use different telemetry logging
    console.error(error);
    return { ...state, issues: state.issues, issueError: error };
  })
);

export function issueReducer(
  state: IssueState | undefined,
  action: Action
): IssueState {
  return reducerIssue(state, action);
}
