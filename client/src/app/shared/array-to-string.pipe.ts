import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToString',
})
export class ArrayToStringPipe implements PipeTransform {
  transform(value: Array<any>, keyName?: string): any {
    if (!value) {
      return '';
    }

    if (!Array.isArray(value)) {
      throw Error('Value must be an array.');
    }

    if (!value.length) {
      return '';
    }

    return value
      .map((valueItem) => keyName ? valueItem[keyName] : valueItem)
      .filter((valueItem) => valueItem !== null && valueItem !== undefined)
      .join(', ');
  }
}
