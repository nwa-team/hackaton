import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {MovieList} from './components/movie-list/movie-list';

@Component({
  selector: 'client-app',
  templateUrl: 'app/client.html',
  directives: [ROUTER_DIRECTIVES, MovieList],
})
@RouteConfig([

])
export class ClientApp {
  defaultMeaning: number = 42;

  meaningOfLife(meaning?: number) {
    return `The meaning of life is ${meaning || this.defaultMeaning}`;
  }

  pressMe() {
      console.log('pressed');
  }
}
