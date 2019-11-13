import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatProjectContents'
})
export class FormatProjectContentsPipe implements PipeTransform {

  transform(value: number): string | number {
    let formattedString = '';
    if (value != null) {
      if ((value % 100) > 9) {
        formattedString = '( ' + value + ' drawings )';
      } else {
        formattedString = '( 0' + value + ' drawings )';
      }
      return formattedString.trim();
    }
    return value;
  }

}
