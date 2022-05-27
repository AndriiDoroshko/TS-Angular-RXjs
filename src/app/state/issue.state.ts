import Issue from './issue.model';
import {IssueStateInterface} from "./state.interface";

export default class IssueState {
  issues!: Array<Issue>;
  issueError!: Error | null;
}

export const initializeState = (): IssueStateInterface => {
  return { issues: Array<Issue>(), issueError: null };
};
