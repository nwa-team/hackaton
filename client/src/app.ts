import {bootstrap} from 'angular2/platform/browser';
import {ClientApp} from './app/client';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {ApiService} from './app/services/api-service/api-service';

bootstrap(ClientApp, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  ApiService
]);
