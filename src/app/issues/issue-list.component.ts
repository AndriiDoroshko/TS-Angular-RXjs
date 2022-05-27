import { Component, Input, Output, EventEmitter } from '@angular/core';
import Issue from "../state/issue.model";

@Component({
  selector: 'issue-list',
  template: `
    <table class="table table-striped todoList--table">
      <thead>
        <th>Title</th>
        <th>Description</th>
        <th>Priority</th>
        <th>Assignee</th>
        <th>Completed?</th>
        <th></th>
      </thead>
      <tbody>
        <tr *ngFor="let todo of issueList">
          <td>{{ todo.title }}</td>
          <td>{{ todo.description }}</td>
          <td>{{ todo.priority }}</td>
          <td><a href="https://twitter.com/{{ todo.assignee }}" target="_blank">{{ todo.assignee }}</a></td>
          <td><ng-template [ngIf]="todo.isCompleted"><mat-icon>check</mat-icon></ng-template></td>

          <td><button mat-raised-button color="primary" (click)="editIssue.emit(todo)" id="editIssueButton">Edit</button></td>
        </tr>
      </tbody>
    </table>
    <button mat-raised-button color="primary" (click)="createIssue.emit()" id="createIssueButton">Create issue</button>
  `
})
export class IssueListComponent {
  @Input() issueList: Array<Issue> = [];
  @Output() createIssue = new EventEmitter<any>();
  @Output() editIssue = new EventEmitter<Issue>();
}
