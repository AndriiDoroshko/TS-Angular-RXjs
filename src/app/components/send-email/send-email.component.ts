import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import AppValues from "../../common/app.values";
import {EmailFormSuccessModel, EmailSenderModel} from "../../state/emailSender.model";

@Component({
  selector: 'send-email',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit(emailModel)">
      <formly-form [form]="form" [fields]="fields" [model]="emailModel" [options]="options"></formly-form>
      <button mat-raised-button color="primary" class="mt-3" type="submit">Submit</button>
    </form>

    <div *ngIf="emailSenderSuccess?.message" class="mt-3">
      <div class="alert alert-success alert-dismissible fade show" role="alert" id="emailFormSuccessMessage">
        {{emailSenderSuccess?.message}}
      </div>
    </div>
  `
})
export class SendEmailComponent {
  @Input() emailSenderSuccess?: EmailFormSuccessModel | null;
  @Output() sendEmail = new EventEmitter<EmailSenderModel>();

  public emailModel: EmailSenderModel = {email: '', name: ''};
  public form = new FormGroup({});
  public options: FormlyFormOptions = {};
  public fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
        type: "email",
      },
      validators: {
        email: {
          expression: (c: { value: string; }) => !c.value || AppValues.emailPattern.test(c.value),
          message: (error: any, field: FormlyFieldConfig) =>
            `${field.formControl?.value} is not a valid email`
        }
      }
    },
    {
      key: 'name',
      type: 'input',
      className: 'mt-2 d-block',
      templateOptions: {
        label: 'First name',
        placeholder: 'Enter your first name',
        required: true,
      }
    }
  ];

  constructor() {}

  public onSubmit(model: EmailSenderModel): void {
    if (this.form.valid) {
      this.sendEmail.emit(model);
    }
  }
}
