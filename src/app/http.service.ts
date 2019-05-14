import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {FeedbackModel} from './model/feedback.model';
import {Observable} from 'rxjs';
import {APP_CONFIG, IAppConfig} from './app.config';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  API_BASE_PATH = this.config.apiEndpoint;
  API_FEEDBACK_PATH = `${this.API_BASE_PATH}feedback/`;
  API_NOTEBOOKS_PATH = `${this.API_BASE_PATH}notebooks/`;
  API_NOTES_PATH = `${this.API_BASE_PATH}notes/`;
  API_COMMAND_PATH = `${this.API_BASE_PATH}command/`;
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.config.apiAuth)
    })
  };

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: IAppConfig) {
  }

  postFeedback(formData: any): Observable<any> {
    return this.http.post(this.API_FEEDBACK_PATH, new FeedbackModel(formData), this.httpOptions);
  }

  postCommand(command: string): Observable<any> {
    return this.http.post(this.API_COMMAND_PATH, {command}, this.httpOptions);
  }

  getAllNotebooks(): Observable<any[]> {
    return this.http.get<any[]>(this.API_NOTEBOOKS_PATH, this.httpOptions);
  }

  createNotebook(notebookName: string): Observable<any> {
    return this.http.post(this.API_NOTEBOOKS_PATH, {name: notebookName}, this.httpOptions);
  }

  updateNotebook(nbId: number, nbName: string): Observable<any> {
    return this.http.put(`${this.API_NOTEBOOKS_PATH}${nbId}`,
      {id: nbId, name: nbName}, this.httpOptions);
  }

  deleteNotebook(nbId: number): Observable<any> {
    return this.http.delete(`${this.API_NOTEBOOKS_PATH}${nbId}`, this.httpOptions);
  }

  deleteNote(nbId: number): Observable<any> {
    return this.http.delete(`${this.API_NOTES_PATH}${nbId}`, this.httpOptions);
  }

  getAllNotes(): Observable<any[]> {
    return this.http.get<any[]>(this.API_NOTES_PATH, this.httpOptions);
  }

  createNote(title: string, text: string, id: number): Observable<any> {
    return this.http.post(this.API_NOTES_PATH, {title, text, notebook: {id}}, this.httpOptions);
  }

  updateNote(id: number, title: string, text: string, nbId: number): Observable<any> {
    return this.http.put(`${this.API_NOTES_PATH}${id}`,
      {id, title, text, notebook: {id: nbId}}, this.httpOptions);
  }

  getAllNotesByNotebook(nbId: number): Observable<any[]> {
    return this.http.get<any[]>(this.API_NOTES_PATH,
      {params: new HttpParams().set('nbId', String(nbId)), ...this.httpOptions});
  }

}
