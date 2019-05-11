import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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
    return this.http.put(`${AppSettings.API_NOTEBOOKS_PATH}${nbId}`,
      {id: nbId, name: nbName}, AppSettings.httpOptions);
  }

  deleteNotebook(nbId: number): Observable<any> {
    return this.http.delete(`${AppSettings.API_NOTEBOOKS_PATH}${nbId}`, AppSettings.httpOptions);
  }

  deleteNote(nbId: number): Observable<any> {
    return this.http.delete(`${AppSettings.API_NOTES_PATH}${nbId}`, AppSettings.httpOptions);
  }

  getAllNotes(): Observable<any[]> {
    return this.http.get<any[]>(AppSettings.API_NOTES_PATH, AppSettings.httpOptions);
  }

  createNote(title: string, text: string, id: number): Observable<any> {
    return this.http.post(AppSettings.API_NOTES_PATH, {title, text, notebook: {id}}, AppSettings.httpOptions);
  }

  getAllNotesByNotebook(nbId: number): Observable<any[]> {
    return this.http.get<any[]>(AppSettings.API_NOTES_PATH,
      {params: new HttpParams().set('nbId', String(nbId)), ...AppSettings.httpOptions});
  }

}
