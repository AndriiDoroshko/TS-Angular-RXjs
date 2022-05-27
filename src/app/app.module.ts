import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TabsComponent} from "./tabs/app-tabs.component";
import {TabComponent} from "./tabs/tab/app-tab.component";
import {IssueListComponent} from "./issues/issue-list.component";
import {IssueEditComponent} from "./issues/issue-edit.component";
import {DynamicTabsDirective} from "./tabs/dynamic-tabs.directive";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EffectsModule } from '@ngrx/effects';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatCardModule} from "@angular/material/card";
import { StoreModule } from '@ngrx/store';

import { IssueEffects } from "./state/effects/issue.effects";
import {issueReducer} from "./state/reducers/issue.reducer";
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import {MatIconModule} from "@angular/material/icon";
import {AboutComponent} from "./components/about/about.component";
import {SendEmailComponent} from "./components/send-email/send-email.component";
import {emailSenderReducer} from "./state/reducers/emailSender.reducer";
import {EmailSenderEffects} from "./state/effects/emailSender.effects";
import AppValues from "./common/app.values";
import {FormlyFieldStepper} from "./components/forms/formlyFieldStepper";
import {MatStepperModule} from "@angular/material/stepper";
import {reducers} from "./state";


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    TabsComponent,
    TabComponent,
    DynamicTabsDirective,
    IssueListComponent,
    IssueEditComponent,
    SendEmailComponent,
    FormlyFieldStepper
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    CdkAccordionModule,
    MatCardModule,
    MatIconModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([IssueEffects, EmailSenderEffects]),
    ReactiveFormsModule,
    MatStepperModule,
    FormlyModule.forRoot({
      extras: { lazyRender: true },
      validators: [
        { name: 'fieldMatch', validation: AppValues.fieldMatchValidator },
      ],
      types: [
        { name: 'stepper', component: FormlyFieldStepper, wrappers: [] },
      ],
    }),
    FormlyBootstrapModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
