import { ActionReducerMap } from "@ngrx/store";
import {issueReducer} from "./reducers/issue.reducer";
import {emailSenderReducer} from "./reducers/emailSender.reducer";
import EmailSenderState from "./emailSender.state";
import IssueState from "./issue.state";

interface AppState {
  issueList: IssueState;
  emailSender: EmailSenderState;
}

export const reducers: ActionReducerMap<AppState> = {
  issueList: issueReducer,
  emailSender: emailSenderReducer
};
