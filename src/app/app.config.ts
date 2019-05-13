import {InjectionToken} from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export interface IAppConfig {
  apiEndpoint: string;
  apiAuth: string;
}

export const AppConfig: IAppConfig = Object.assign({}, window['__env']);
