import {HttpHeaders} from '@angular/common/http';

export class AppSettings {
  public static API_BASE_PATH = 'https://localhost:8443/api/';
  public static httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Basic dXNyMTpwd2Qx'
    })
  };
}
