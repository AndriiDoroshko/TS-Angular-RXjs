import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';
import Issue, {PriorityType} from "../state/issue.model";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import AppValues from "../common/app.values";

@Component({
  selector: 'issue-edit',
  template: `
    <div class="row">
      <div class="col-6">
        <form [formGroup]="form" (ngSubmit)="onPersonFormSubmit(issueModel)">
          <formly-form [form]="form" [fields]="fields" [model]="issueModel" [options]="options"></formly-form>
          <button mat-raised-button color="primary" class="mt-3" type="submit">Save</button>
        </form>
      </div>
      <div class="col-6" *ngIf="isCaptcha">
        <form [formGroup]="captchaForm" (ngSubmit)="submitCaptcha()">
          <formly-form [model]="captchaModel" [fields]="captchaFields" [options]="captchaOptions"
                       [form]="captchaForm"></formly-form>
        </form>
      </div>
    </div>
  `
})
export class IssueEditComponent implements OnInit {
  @Input() issue!: Issue;
  @Output() saveIssue = new EventEmitter<Issue>();

  public isCaptcha: boolean = false;
  public captchaForm = new FormGroup({});
  public captchaModel: { text: string, textConfirm: string } = {text: '', textConfirm: ''};
  public captchaOptions: FormlyFormOptions = {};
  public captchaFields: FormlyFieldConfig[] = [{
    type: 'stepper',
    fieldGroup: [
      {
        templateOptions: {label: 'I am not a robot'},
        validators: {
          validation: [
            {name: 'fieldMatch', options: {errorPath: 'textConfirm'}},
          ],
        },
        fieldGroup: [
          {
            key: 'text',
            type: 'input',
            templateOptions: {
              type: 'text',
              readonly: true,
              label: 'Captcha',
            },
          },
          {
            key: 'textConfirm',
            type: 'input',
            templateOptions: {
              type: 'text',
              label: 'Repeat text',
              placeholder: 'Please enter this text',
              required: true,
            },
          },
        ],
      }]
  }];

    public issueModel
:
  Issue = new Issue;
  public form = new FormGroup({});
  public options: FormlyFormOptions = {};
  public fields: FormlyFieldConfig[] = [
    {
      key: 'id',
      type: 'input',
      templateOptions: {
        label: 'id',
      },
      hideExpression: 'true',
    },
    {
      key: 'title',
      type: 'input',
      templateOptions: {
        label: 'Title',
        placeholder: 'Title',
        required: true,
      },
    },
    {
      key: 'description',
      type: 'input',
      className: 'mt-2 d-block',
      templateOptions: {
        label: 'Description',
        placeholder: 'Description'
      },
    },
    {
      key: 'priority',
      type: 'select',
      className: 'mt-2 d-block',
      templateOptions: {
        label: 'Priority',
        placeholder: 'Priority',
        required: true,
        options: Object.values(PriorityType).map((type: string) => {
          return {value: type, label: type};
        })
      },
    },
    {
      key: 'assignee',
      type: 'input',
      className: 'mt-2 d-block',
      templateOptions: {
        placeholder: 'Assignee',
        required: true,
        addonLeft: {
          class: 'input-group-text__icon fa fa-at',
        },
        label: 'Assignee',
      },
    },
    {
      key: 'isCompleted',
      type: 'checkbox',
      className: 'mt-4 d-block',
      templateOptions: {
        label: 'Completed?',
      },
    },
  ];

  constructor() {
  }

  public ngOnInit(): void {
    this.issueModel = Object.assign({}, this.issue);
    this.captchaModel = {text: AppValues.randomString(6), textConfirm: ''};
  }

  public onPersonFormSubmit(model: Issue): void {
    if (this.form.valid) {
      this.issueModel = model;
      this.isCaptcha = true;
    }
  }

  public submitCaptcha(): void {
    if (this.form.valid && this.captchaForm.valid) {
      this.saveIssue.emit(this.issueModel);
    }
  }
}
