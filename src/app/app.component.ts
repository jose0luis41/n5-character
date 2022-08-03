import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {fromEvent} from "rxjs";

@Component({
  selector: 'mf-character',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'mf-character';
  language$ = fromEvent(window, 'language');

  constructor(private translate: TranslateService) {
  }

  ngOnInit(): void {
    const languageSaved = sessionStorage.getItem('language');
    this.translate.use(languageSaved as string);
    this.language$.subscribe((l: any) =>{
      const value = l['detail']['answer'];
      this.translate.use(value);
    });
  }
}
