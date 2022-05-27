import {EmailFormSuccessModel, EmailSenderModel} from "./emailSender.model";

export default class EmailSenderState {
  emailInforms!: EmailSenderModel[];
  emailInformSuccess!: EmailFormSuccessModel | null;
  emailInformError!: Error | null;
}

export const initializeEmailState = (): EmailSenderState => {
  return { emailInforms: Array<EmailSenderModel>(), emailInformError: null, emailInformSuccess: null };
};
