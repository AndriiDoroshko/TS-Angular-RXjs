import {
  AppTab,
  Attribute, AttributeValue,
  ComponentInfoType,
  ElementStyles,
  FormTypes,
  SelectorOption,
  Tab
} from "../app/interfaces/form-and-field.interface";
import {ValidatorFn} from "@angular/forms";

export const tabListData: AppTab[] =  [
  {
    id: '0',
    name: 'Tab#1',
    tabContent: {
      elements: [
        {
          type: ComponentInfoType.form,
          data: {
            fieldAttributes: [{
                elementDataTestId: 'firstName',
                id: 'firstName',
                errorDataTestId: 'firstNameError',
                backendAttribute: {
                  name: 'first_name',
                  valueClassFront: 'formField',
                  minLength: 3,
                  maxLength: 100,
                  typeAttribute: 'input',
                  required: true,
                  readOnly: false
                }
              }
            ],
            data: [{
              name: 'firstName',
              value: 'John'
            }]
          }
        },
        {
          type: ComponentInfoType.box,
          data: {
            attributes: [{
              nameAttribute: 'block1',
              typeAttribute: 'div',
              readOnly: true,
              dataTestId: 'block1',
              childNameAttribute: [{
                nameAttribute: 'text_block1',
                typeAttribute: 'p',
                readOnly: true,
                dataTestId: 'textBlock1',
              }]
            }],
            data: [
              {
                name: 'text_block1',
                value: 'Some test text'
              }
            ]
          }
        }
      ]
    }
  },
  {
    id: '1',
    name: 'Tab#2',
    tabContent: {
      elements: [
        {
          type: ComponentInfoType.form,
          data: {
            formAttribute: {
              type: FormTypes.USER,
              titleId: 'userForm',
              dataTestId: 'userForm'
            },
            fieldAttributes: [
              {
                elementDataTestId: 'firstName',
                id: 'firstName',
                errorDataTestId: 'firstNameError',
                backendAttribute: {
                  name: 'first_name',
                  valueClassFront: 'formField',
                  minLength: 3,
                  maxLength: 100,
                  typeAttribute: 'input',
                  required: true,
                  readOnly: false,
                  label: 'First name',
                  placeholder: 'First name',
                  security: false,
                  enabledIf: {
                    name: 'firstName',
                    value: 'John',
                  }
                }
              }
            ],
            data: [{
              name: 'firstName',
              value: 'John'
            }]
          }
        },
        {
          type: ComponentInfoType.form,
          data: {
            formAttribute: {
              type: FormTypes.USER,
              titleId: 'userForm',
              dataTestId: 'userForm'
            },
            fieldAttributes: [
              {
                elementDataTestId: 'firstName',
                id: 'firstName',
                errorDataTestId: 'firstNameError',
                backendAttribute: {
                  name: 'first_name',
                  valueClassFront: 'formField',
                  minLength: 3,
                  maxLength: 100,
                  typeAttribute: 'input',
                  required: true,
                  readOnly: false,
                  label: 'First name',
                  placeholder: 'First name',
                  security: false,
                  enabledIf: {
                    name: 'firstName',
                    value: 'John',
                  }
                }
              }
            ],
            data: [{
              name: 'firstName',
              value: 'John'
            }]
          }
        }
      ]
    }
  },
  {
    id: '2',
    name: 'Tab#3',
    tabContent: {
      elements: [
        {
          type: ComponentInfoType.box,
          data: {
            attributes: [{
              nameAttribute: 'block1',
              typeAttribute: 'div',
              readOnly: true,
              dataTestId: 'block1',
              childNameAttribute: [{
                nameAttribute: 'text_block1',
                typeAttribute: 'p',
                readOnly: true,
                dataTestId: 'textBlock1',
              }]
            }],
            data: [
              {
                name: 'text_block1',
                value: 'Some test text'
              }
            ]
          }
        },
        {
          type: ComponentInfoType.box,
          data: {
            attributes: [{
              nameAttribute: 'block1',
              typeAttribute: 'div',
              readOnly: true,
              dataTestId: 'block1',
              childNameAttribute: [{
                nameAttribute: 'text_block1',
                typeAttribute: 'p',
                readOnly: true,
                dataTestId: 'textBlock1',
              }]
            }],
            data: [
              {
                name: 'text_block1',
                value: 'Some test text'
              }
            ]
          }
        }
      ]
    }
  }
];
