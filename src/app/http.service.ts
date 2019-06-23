import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FeedbackModel} from './model/feedback.model';
import {Observable} from 'rxjs';
import {APP_CONFIG, IAppConfig} from './app.config';
import {UserModel} from './model/user.model';
import {LoginModel} from './model/login.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  API_BASE_PATH = this.config.apiEndpoint;
  API_FEEDBACK_PATH = `${this.API_BASE_PATH}feedback/`;
  API_NOTEBOOKS_PATH = `${this.API_BASE_PATH}notebooks/`;
  API_NOTES_PATH = `${this.API_BASE_PATH}notes/`;
  API_USERS_PATH = `${this.API_BASE_PATH}users/`;
  API_LOGIN_PATH = `${this.API_BASE_PATH}login/`;
  API_COMMAND_PATH = `${this.API_BASE_PATH}command/`;
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: IAppConfig) {
  }

  postCommand(command: string): Observable<any> {
    return this.http.post(this.API_COMMAND_PATH, {command}, this.httpOptions);
  }

  postFeedback(formData: any): Observable<any> {
    return this.http.post(this.API_FEEDBACK_PATH, new FeedbackModel(formData), this.httpOptions);
  }

  postLogin(formData: any): Observable<any> {
    return this.http.post(this.API_LOGIN_PATH, new LoginModel(formData), this.httpOptions);
  }

  postNewUser(formData: any): Observable<any> {
    return this.http.post(this.API_USERS_PATH, new UserModel(formData), this.httpOptions);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(this.API_USERS_PATH + 'current', this.httpOptions);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.API_USERS_PATH, this.httpOptions);
  }

  getAllNotebooks(): Observable<any[]> {
    return this.http.get<any[]>(this.API_NOTEBOOKS_PATH, this.httpOptions);
  }

  getAllNotesByNotebook(nbId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_NOTEBOOKS_PATH}${nbId}/notes`, this.httpOptions);
  }

  createNotebook(notebookName: string): Observable<any> {
    return this.http.post(this.API_NOTEBOOKS_PATH, {name: notebookName}, this.httpOptions);
  }

  updateNotebook(nbId: number, name: string): Observable<any> {
    return this.http.put(`${this.API_NOTEBOOKS_PATH}${nbId}`,
      {name}, this.httpOptions);
  }

  deleteNotebook(nbId: number): Observable<any> {
    return this.http.delete(`${this.API_NOTEBOOKS_PATH}${nbId}`, this.httpOptions);
  }

  createNote(title: string, text: string, notebookId: number): Observable<any> {
    return this.http.post(this.API_NOTES_PATH, {title, text, notebookId}, this.httpOptions);
  }

  updateNote(id: number, title: string, text: string, notebookId: number): Observable<any> {
    return this.http.put(`${this.API_NOTES_PATH}${id}`, {title, text, notebookId}, this.httpOptions);
  }

  deleteNote(nbId: number): Observable<any> {
    return this.http.delete(`${this.API_NOTES_PATH}${nbId}`, this.httpOptions);
  }

}
