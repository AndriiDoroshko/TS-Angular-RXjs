import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {EmailSenderModel} from "../emailSender.model";
import {emailListData} from "../../../assets/emailList.data";

@Injectable({
  providedIn: 'root'
})
export class EmailSenderService {
  constructor(private httpclient: HttpClient) {}

  public getEmails(): Observable<EmailSenderModel[]> {
    return of(emailListData);
  }

  public sendEmails(payload: EmailSenderModel[]): Observable<EmailSenderModel[]> {
    return this.httpclient.post<EmailSenderModel[]>('/create', JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
