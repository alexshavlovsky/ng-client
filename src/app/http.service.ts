import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FeedbackModel} from './model/feedback.model';
import {Observable} from 'rxjs';
import {UserModel} from './model/user.model';
import {LoginModel} from './model/login.model';
import {NoteModel} from './model/note.model';
import {IEnvConfig} from './env.injector';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  API_USERS = 'users';
  API_CURRENT_USER = 'current';
  API_LOGIN = 'login';
  API_COMMAND = 'command';
  API_FEEDBACK = 'feedback';
  API_NOTES = 'notes';
  API_NOTEBOOKS = 'notebooks';
  API_BASE_PATH = this.envConfig.apiBaseUrl;
  API_USERS_PATH = HttpService.pathJoin([this.API_BASE_PATH, this.API_USERS]);
  API_LOGIN_PATH = HttpService.pathJoin([this.API_USERS_PATH, this.API_LOGIN]);
  API_CURRENT_USER_PATH = HttpService.pathJoin([this.API_USERS_PATH, this.API_CURRENT_USER]);
  API_COMMAND_PATH = HttpService.pathJoin([this.API_BASE_PATH, this.API_COMMAND]);
  API_FEEDBACK_PATH = HttpService.pathJoin([this.API_BASE_PATH, this.API_FEEDBACK]);
  API_NOTEBOOKS_PATH = HttpService.pathJoin([this.API_BASE_PATH, this.API_NOTEBOOKS]);
  API_NOTES_PATH = HttpService.pathJoin([this.API_BASE_PATH, this.API_NOTES]);
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
  };

  // if not empty, 'switch frontend' button will be displayed on the nav bar
  switchFrontendHref = '';

  constructor(private http: HttpClient, @Inject('ENV_CONFIG') private envConfig: IEnvConfig) {
    if (envConfig.override) {
      const override = envConfig.override;
      for (const key in override) {
        if (this.hasOwnProperty(key)) {
          this[key] = override[key];
        }
      }
    }
  }

  static pathJoin(parts: string[]): string {
    return parts.join('/').replace(/[/]{2,}/g, '/');
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
    return this.http.get<any>(this.API_CURRENT_USER_PATH, this.httpOptions);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.API_USERS_PATH, this.httpOptions);
  }

  getAllNotebooks(): Observable<any[]> {
    return this.http.get<any[]>(this.API_NOTEBOOKS_PATH, this.httpOptions);
  }

  getAllNotesByNotebook(id: number): Observable<any[]> {
    return this.http.get<any[]>(HttpService.pathJoin([this.API_NOTEBOOKS_PATH, String(id), this.API_NOTES]), this.httpOptions);
  }

  createNotebook(notebookName: string): Observable<any> {
    return this.http.post(this.API_NOTEBOOKS_PATH, {name: notebookName}, this.httpOptions);
  }

  updateNotebook(id: number, name: string): Observable<any> {
    return this.http.put(HttpService.pathJoin([this.API_NOTEBOOKS_PATH, String(id)]),
      {name}, this.httpOptions);
  }

  deleteNotebook(id: number): Observable<any> {
    return this.http.delete(HttpService.pathJoin([this.API_NOTEBOOKS_PATH, String(id)]), this.httpOptions);
  }

  createNote(title: string, text: string, notebookId: number): Observable<any> {
    return this.http.post(this.API_NOTES_PATH, {title, text, notebookId}, this.httpOptions);
  }

  updateNote(note: NoteModel): Observable<any> {
    return this.http.put(HttpService.pathJoin([this.API_NOTES_PATH, String(note.id)]),
      {title: note.title, text: note.text, notebookId: note.notebookId}, this.httpOptions);
  }

  deleteNote(id: number): Observable<any> {
    return this.http.delete(HttpService.pathJoin([this.API_NOTES_PATH, String(id)]), this.httpOptions);
  }

}
