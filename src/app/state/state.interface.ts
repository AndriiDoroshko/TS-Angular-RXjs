import Issue from "./issue.model";
import {EmailSenderModel} from "./emailSender.model";

export interface IssueStateInterface {
  issues: Array<Issue>;
  issueError: Error | null;
}

export interface EmailSenderInterface {
  emailInforms: EmailSenderModel[];
  emailInformError: null;
  emailInformSuccess: null;
}

export interface EmailFormSuccessInterface {
  name: string;
  message: string;
}
