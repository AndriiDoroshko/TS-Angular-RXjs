import {Injectable} from "@angular/core";
import {AbstractControl} from "@angular/forms";

@Injectable()
export default class AppValues {
  public static emailPattern: RegExp = new RegExp(
    /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/i,
  );

  public static randomString(length: number) {
    let result: string = '';
    const chars: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

  public static fieldMatchValidator(control: AbstractControl) {
    const {text, textConfirm} = control.value;

    if (!textConfirm || !text) {
      return null;
    }
    if (textConfirm === text) {
      return null;
    }
    return {fieldMatch: {message: 'Password Not Matching'}};
  }
}
