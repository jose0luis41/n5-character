import { Pipe, PipeTransform } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";

@Pipe({
  name: 'myTranslate',
  pure: false
})

export class MyTranslate extends TranslatePipe implements PipeTransform {
  transform(value: any, args?: any[]): any {
    return super.transform(value, args)
  }
}
