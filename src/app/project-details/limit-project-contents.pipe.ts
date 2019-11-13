import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitProjectContents'
})
export class LimitProjectContentsPipe implements PipeTransform {

  transform(value: any, limitFactor: number): any {
    console.log('value :', value.length);
    console.log('type :', typeof value);
    console.log('limitFactor :', limitFactor);
    return value;
  }

}
