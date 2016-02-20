export class Movie{
    name: string;
    posterUrl: string;
    trailerUri: string;
    hype: number;

    constructor() {
        this.name = 'Bridge of spies';
        this.posterUrl = 'http://ia.media-imdb.com/images/M/MV5BMjIxOTI0MjU5NV5BMl5BanBnXkFtZTgwNzM4OTk4NTE@._V1__SX1853_SY893_.jpg';
        this.trailerUri = 'https://www.youtube.com/watch?v=mBBuzHrZBro';
        this.hype = Math.round(Math.random() * 10) + 1;
    }
}