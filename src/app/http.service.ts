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
    return this.http.post(AppSettings.API_FEEDBACK_PATH, new FeedbackModel(formData), AppSettings.httpOptions);
  }

  getAllNotebooks(): Observable<any[]> {
    return this.http.get<any[]>(AppSettings.API_NOTEBOOKS_PATH, AppSettings.httpOptions);
  }

  createNotebook(notebookName: string): Observable<any> {
    return this.http.post(AppSettings.API_NOTEBOOKS_PATH, {name: notebookName}, AppSettings.httpOptions);
  }

  updateNotebook(nbId: number, nbName: string): Observable<any> {
    return this.http.put(`${AppSettings.API_NOTEBOOKS_PATH}${nbId}/`,
      {id: nbId, name: nbName}, AppSettings.httpOptions);
  }

  deleteNotebook(nbId: number): Observable<any> {
    return this.http.delete(`${AppSettings.API_NOTEBOOKS_PATH}${nbId}/`, AppSettings.httpOptions);
  }

  getAllNotes(): Observable<any[]> {
    return this.http.get<any[]>(AppSettings.API_NOTES_PATH, AppSettings.httpOptions);
  }

}
