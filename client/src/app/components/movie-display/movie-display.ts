import {Component, Input, OnInit} from 'angular2/core';

import {Movie} from '../../models/movie';

@Component({
    selector: 'movie-display',
    templateUrl: 'app/components/movie-display/movie-display.html',
    styleUrls: ['app/components/movie-display/movie-display.css'],
})
export class MovieDisplay implements OnInit {
    @Input() movie: Movie;
    width: number;
    height: number;

    ngOnInit() {
        let desiredWidth = 786 * this.movie.hype / 100;
        let desireHeight = 1164 * this.movie.hype / 100;
        let size = this.calculateAspectRatioFit(786, 1164, desiredWidth, desireHeight);
        this.width = size.width;
        this.height = size.height;
    }

    calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
        var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        return { width: srcWidth * ratio, height: srcHeight * ratio };
    }
}
