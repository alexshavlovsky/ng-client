import {HttpHeaders} from '@angular/common/http';

export class AppSettings {
  public static API_BASE_PATH = 'https://localhost:8443/api/';
  public static API_FEEDBACK_PATH = `${AppSettings.API_BASE_PATH}feedback/`;
  public static API_NOTEBOOKS_PATH = `${AppSettings.API_BASE_PATH}notebooks/`;
  public static API_NOTES_PATH = `${AppSettings.API_BASE_PATH}notes/`;
  public static httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Basic dXNyMTpwd2Qx'
    })
  };
}
