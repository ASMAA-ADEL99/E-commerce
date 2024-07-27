import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buy'
})
export class BuyPipe implements PipeTransform {
//pipe is a transform function take a parameter and return data
  transform(title:string): unknown {
    return `buy ${title}`;
  }

}
