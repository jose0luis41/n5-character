import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MoviesService} from "../../services/movies.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Character} from "../../model/character";
import {PageEvent} from "@angular/material/paginator";
import {ApiResponse} from "../../model/apiResponse";
import {Movie} from "../../model/movie";

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list: Character[] = [];
  length: number = 20
  pageSize: number = 20;
  apiResponse: ApiResponse | undefined;
  apiRickyUrl: string = 'https://rickandmortyapi.com/api/character';
  disneyRickyUrl: string = 'https://api.disneyapi.dev/characters';

  // MatPaginator Output
  pageEvent: PageEvent | undefined;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private moviesService: MoviesService) { }

  ngOnInit(): void {
    const route: string = this.route.snapshot.paramMap.get('movie') as string;
    const currentMovie = this.getCurrentMovie(route);
    const currentApiUrl = currentMovie === Movie.DISNEY ? this.disneyRickyUrl : this.apiRickyUrl
    this.apiResponse = new ApiResponse(0, 0, currentApiUrl, currentApiUrl, currentMovie,[]);
    this.loadData(true);
  }

  public getServerData(event: PageEvent): PageEvent{
    const next = (event.previousPageIndex as number) < (event.pageIndex as number);
    this.loadData(next);
    return event;
  }

  public loadData(next: boolean):void {
    this.moviesService.getCharacters(this.apiResponse as ApiResponse, next).subscribe(resp=> {
      const { count, pages, previousPage, nextPage, movie, results} = resp;
      this.apiResponse = new ApiResponse(count, pages, previousPage, nextPage, movie, results);

      this.length = pages;
      this.pageSize = count;
      this.list = results;
    });
  }

  private getCurrentMovie(param: any){
    const movie = Object.values(Movie as unknown as string).find( m => m === param);
    return Movie.DISNEY === movie ? Movie.DISNEY : Movie.RICK;
  }

  public backToHome(){
    this.router.navigate([`/home/`]);
  }

}
