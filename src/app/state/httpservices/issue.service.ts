import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import Issue from '../issue.model';
import {issueListData} from 'src/assets/IssueListData';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  constructor(private httpclient: HttpClient) {}

  public getIssueList(): Observable<Issue[]> {
    return of(issueListData);
  }

  public createNewIssue(payload: Issue): Observable<Issue> {
    return this.httpclient.post<Issue>('/create', JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
