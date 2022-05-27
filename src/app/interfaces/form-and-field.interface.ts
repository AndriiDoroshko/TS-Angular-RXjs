import {ValidatorFn} from '@angular/forms';

export interface AppTab {
  id: string;
  name: string;
  tabContent: TabContent
}
export interface TabContent {
  elements: AppTabContentElement[];
  valueClassFront?: string;
}
export interface AppTabContentElement {
  type: ComponentInfoType;
  data: FormConstructorContent | BoxConstructorContent;
}
export enum ComponentInfoType {
  box = 'box',
  form = 'form'
}
export enum FormTypes {
  BASE='base',
  USER = 'user',
  ISSUE = 'issue',
}
export interface BoxConstructorContent {
  attributes: DOMAttribute[];
  data: AttributeValue[] | {};
}
export interface DOMAttribute {
  nameAttribute: string;
  typeAttribute: string;
  readOnly: boolean;
  dataTestId: string;
  valueClassFront?: string;
  elementStyles?: ElementStyles;
  childNameAttribute?: DOMAttribute[];
}
export interface FormConstructorContent {
  formAttribute?: FormAttribute;
  fieldAttributes: FieldAttribute[];
  data: AttributeValue[] | {};
}

export interface AttributeValue {
  name: string;
  value: string;
}

export interface Attribute {
  name: string;
  valueClassFront: string;
  minLength: number;
  maxLength: number;
  typeAttribute: string;
  required: boolean;
  readOnly: boolean;
  label?: string;
  viewLabel?: string;
  placeholder?: string;
  security?: boolean;
  enabledIf?: AttributeValue;
}

export interface Attributes {
  attributes: Attribute[];
}

export interface ElementStyles {
  containerStyle?: string;
  contentStyle?: string;
  labelStyle?: string;
}

export interface FieldAttribute {
  elementDataTestId: string;
  id: string;
  errorDataTestId: string;
  elementStyles?: ElementStyles;
  options?: SelectorOption[];
  validators?: ValidatorFn[];
  hidden?: boolean;
  multiple?: boolean;
  backendAttribute: Attribute;
}

export interface FormAttribute {
  type: FormTypes;
  titleId?: string;
  dataTestId: string;
}

export interface SelectorOption {
  entity_id: string;
  title: string;
}



export interface Tab {
  id: string;
  options?: {
    label: string;
    disable?: boolean;
  }
}

export interface TabContentElement {
  id: string;
  tabID: string;
  elements: FieldAttribute[];
}

export interface ContentData {
  tabContentId: string;
  value: {[prop: string]: any}
}
