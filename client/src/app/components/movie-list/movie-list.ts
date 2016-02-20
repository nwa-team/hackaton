import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';

import {MovieDisplay} from '../movie-display/movie-display';
import {Movie} from '../../models/movie';

@Component({
  selector: 'movie-list',
  templateUrl: 'app/components/movie-list/movie-list.html',
  styleUrls: ['app/components/movie-list/movie-list.css'],
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, MovieDisplay]
})
export class MovieList {
  movies: Movie[];

  constructor() {
      this.movies = [];
      for (var i = 0; i < 10; i++) {
            this.movies.push(new Movie());
        }
    }
}
