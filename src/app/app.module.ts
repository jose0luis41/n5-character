import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {EmptyRouteComponent} from "./empty-route/empty-route.component";
import { CharacterComponent } from './components/character/character.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { ListComponent } from './components/list/list.component';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MyTranslate} from "./shared/pipes/translationPipe";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'http://localhost:4200/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    EmptyRouteComponent,
    CharacterComponent,
    ListComponent,
    MyTranslate
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
