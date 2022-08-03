import {Character} from "./character";
import {Movie} from "./movie";

export class ApiResponse{
  count: number;
  pages: number;
  previousPage: string;
  nextPage: string;
  results: Character[];
  movie: Movie;

  constructor(count: number, pages: number, previousPage: string, nextPage: string, movie: Movie, results: Character[]) {
    this.count = count;
    this.pages = pages;
    this.previousPage = previousPage;
    this.nextPage = nextPage;
    this.movie = movie;
    this.results = results;
  }
}
