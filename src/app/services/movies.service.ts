import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Character} from "../model/character";
import {catchError, map} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {Movie} from "../model/movie";
import {ApiResponse} from "../model/apiResponse";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getCharacters(apiResponse: ApiResponse, next: boolean): Observable<ApiResponse> {
    return this.http
      .request<ApiResponse>('GET', next ? apiResponse.nextPage : apiResponse.previousPage)
      .pipe(
        map((response) => this.convertDataToCharacter(response, apiResponse)),
        catchError((error: HttpErrorResponse) => throwError(error))
      );
  }

  convertDataToCharacter(response: any, apiResponse: ApiResponse){
    const movie = apiResponse.movie;
    const data = Movie.DISNEY === movie ? response.data : response.results;

    const mapped = data.map( (d: any) =>{
      const id = Movie.DISNEY === movie ? d._id : d.id;
      const name = d.name;
      const image = Movie.DISNEY === movie ? d.imageUrl : d.image;
      return new Character(id, name, image);
    });
    const count =  mapped.length;
    const pages =  Movie.DISNEY === movie ? count * response.totalPages : count * response.info.pages;
    const previousPage =  Movie.DISNEY === movie ? response.previousPage : response.info.prev;
    const nextPage =  Movie.DISNEY === movie ? response.nextPage : response.info.next;

    return new ApiResponse(count, pages, previousPage, nextPage, movie, mapped);
  }


}
