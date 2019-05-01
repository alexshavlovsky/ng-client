import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from './app.settings';
import {FeedbackModel} from './model/feedback.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  postFeedback(formData: any): Observable<any> {
    return this.http.post(`${AppSettings.API_BASE_PATH}feedback/`, new FeedbackModel(formData), AppSettings.httpOptions);
  }

  getAllNotebooks(): Observable<any[]> {
    return this.http.get<any[]>(`${AppSettings.API_BASE_PATH}notebooks/`, AppSettings.httpOptions);
  }

}
