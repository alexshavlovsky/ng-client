import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from './AppSettings';
import {FeedbackDTO} from './model/FeedbackDTO';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  postFeedback(feedback: FeedbackDTO): Observable<any> {
    return this.http.post(`${AppSettings.API_BASE_PATH}feedback/`, feedback, AppSettings.httpOptions);
  }

}
