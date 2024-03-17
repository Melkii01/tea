import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textLengthPipe'
})
export class TextLengthPipe implements PipeTransform {

  transform(text: string): string {
    let result: string = '';
    if (text.length <= 100) {
      result = text;
    } else if (text.length > 100) {
      result = text.slice(0, 100) + '...';
    }
    return result;
  }

}
