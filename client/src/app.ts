import {bootstrap} from 'angular2/platform/browser';
import {ClientApp} from './app/client';
import {ROUTER_PROVIDERS} from 'angular2/router';

bootstrap(ClientApp, [
  ROUTER_PROVIDERS
]);
