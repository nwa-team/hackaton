import {Component} from 'angular2/core';
import {MovieDisplay} from '../movie-display/movie-display';

@Component({
  selector: 'movie-list',
  templateUrl: 'app/components/movie-list/movie-list.html',
  styleUrls: ['app/components/movie-list/movie-list.css'],
  directives: [MovieDisplay],
})
export class MovieList {

  constructor() {}

}
