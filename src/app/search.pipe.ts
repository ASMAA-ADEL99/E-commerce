import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './shared/interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(products:Product[], term:string) {
    //filter method loops on the products array and every time put one item from the array on  the product parameter
    return products.filter((product)=>product.title.toLowerCase().includes(term.toLowerCase()));
  }

}
