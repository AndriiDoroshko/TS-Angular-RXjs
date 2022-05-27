import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {TabsComponent} from './tabs/app-tabs.component';
import {select, Store} from "@ngrx/store";
import IssueState from "./state/issue.state";
import {Observable, Subscription} from "rxjs";
import Issue, {PriorityType} from "./state/issue.model";
import * as ToDoActions from "./state/actions/issue.action";
import * as EmailSenderActions from "./state/actions/emailSender.action";
import {map} from "rxjs/operators";
import {EmailFormSuccessModel, EmailSenderModel} from "./state/emailSender.model";
import EmailSenderState from "./state/emailSender.state";

@Component({
  selector: 'app',
  template: `
    <div class="container">
      <app-tabs>
        <my-tab [tabTitle]="'ToDo List'">
          <mat-card>
            <h3>{{ issueList.length }} Issues: </h3>
            <issue-list
              [issueList]="issueList"
              (createIssue)="createNewIssue()"
              (editIssue)="onEditIssue($event)">
            </issue-list>
          </mat-card>
          <hr/>
          <mat-card>
            <h3>Want to send ToDo List on email:</h3>

            <div class="row">
              <div class="col-9">
              <send-email (sendEmail)="onSendEmail($event)" [emailSenderSuccess]="emailSenderSuccess"></send-email>
            </div>

            <cdk-accordion class="col-3">
              <cdk-accordion-item
                #accordionItem="cdkAccordionItem"
                class="example-accordion-item"
                role="button"
                tabindex="0"
                [attr.id]="'accordion-header'"
                [attr.aria-expanded]="accordionItem.expanded"
                [attr.aria-controls]="'accordion-body'">
                <button mat-raised-button class="d-flex align-items-center" (click)="accordionItem.toggle()">
                  <mat-icon> {{ accordionItem.expanded ? 'lock' : 'lock_open'}}</mat-icon>
                  <h4 class="m-0">
                    Invited people
                  </h4>
                </button>
                <div
                  class="example-accordion-item-body card card-body"
                  role="region"
                  [style.display]="accordionItem.expanded ? '' : 'none'"
                  [attr.id]="'accordion-body'"
                  [attr.aria-labelledby]="'accordion-header'">
                  <div *ngFor="let emailInfo of emailList">
                    <p>To {{emailInfo.email}} for {{emailInfo.name}}</p>
                  </div>
                </div>
              </cdk-accordion-item>
            </cdk-accordion>
            </div>

          </mat-card>
          <hr/>
          <button mat-raised-button (click)="onOpenAbout()">
            <mat-icon>info</mat-icon>
            About this component
          </button>
        </my-tab>
      </app-tabs>

      <ng-template let-issue="person" #personEdit>
        <issue-edit [issue]="issue" (saveIssue)="onIssueFormSubmit($event)"></issue-edit>
      </ng-template>

      <ng-template #about>
        <about></about>
      </ng-template>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('personEdit') editPersonTemplate: ElementRef | undefined;
  @ViewChild('about') aboutTemplate: ElementRef | undefined;
  @ViewChild(TabsComponent) tabsComponent!: TabsComponent;

  public issueList$: Observable<IssueState>;
  public emailSender$: Observable<EmailSenderState>;
  public issueListSubscription: Subscription | undefined;
  public emailSenderSubscription: Subscription | undefined;
  public issueList: Array<Issue> = [];
  public emailList: Array<EmailSenderModel> = [];

  public todoError: Error | null = null;
  public emailSenderError: Error | null = null;
  public emailSenderSuccess: EmailFormSuccessModel | null = null;

  constructor(private storeIssue: Store<{ issueList: IssueState }>,
              private storeEmailSender: Store<{ emailSender: EmailSenderState }>) {
    this.issueList$ = storeIssue.pipe(select('issueList'));
    this.emailSender$ = storeEmailSender.pipe(select('emailSender'));
  }

  public ngOnInit(): void {
    this.issueListSubscription = this.issueList$
      .pipe(
        map(x => {
          this.issueList = x.issues || [];
          this.todoError = x.issueError;
        })
      )
      .subscribe();

    this.emailSenderSubscription = this.emailSender$
      .pipe(
        map((emailInfo: EmailSenderState) => {
          this.emailList = emailInfo.emailInforms || [];
          this.emailSenderError = emailInfo.emailInformError;
          this.emailSenderSuccess = emailInfo.emailInformSuccess;
        })
      ).subscribe();

    this.storeIssue.dispatch(ToDoActions.BeginGetIssueAction());
    this.storeEmailSender.dispatch(EmailSenderActions.GetEmailSenderAction());
  }

  public onSendEmail(model: EmailSenderModel): void {
    const emailList: EmailSenderModel[] = [model];
    this.storeIssue.dispatch(EmailSenderActions.CreateEmailSenderAction({payload: emailList}));
  }

  public onEditIssue(issue: Issue): void {
    this.tabsComponent.openTab(
      `Editing ${issue.title}`,
      this.editPersonTemplate,
      issue,
      true
    );
  }

  public onIssueFormSubmit(dataModel: Issue): void {
    this.issueList = this.issueList.map(issue => {
      if (issue.id === dataModel.id) {
        return dataModel;
      } else {
        return issue;
      }
    });

    if (this.issueList.some((issues: Issue) => issues.id === dataModel.id)) {
      this.storeIssue.dispatch(ToDoActions.BeginEditIssueAction({payload: dataModel}));
    } else {
      this.issueList.push(dataModel);
      this.storeIssue.dispatch(ToDoActions.BeginCreateIssueAction({payload: dataModel}));
    }

    this.tabsComponent.closeActiveTab();
  }

  public onOpenAbout(): void {
    this.tabsComponent.openTab('About', this.aboutTemplate, null, true);
  }

  public createNewIssue(): void {
    this.tabsComponent.openTab('Create New issue', this.editPersonTemplate, AppComponent.newEmptyIssue(), true);
  }

  private static newEmptyIssue(): Issue {
    return {
      id: Math.round(Math.random() * 100),
      title: '',
      description: '',
      priority: PriorityType.Medium,
      assignee: '',
      isCompleted: false
    };
  }

  public ngOnDestroy(): void {
    if (this.issueListSubscription) {
      this.issueListSubscription.unsubscribe();
    }
    if (this.emailSenderSubscription) {
      this.emailSenderSubscription.unsubscribe();
    }
  }
}
