import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../Models/products/products.module';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {
  transform(products: Product[], category: string): Product[] {
    //If category is null or "undefined", the array products is returned without any filter applied.
    if (!category || category === 'undefined') {
      return products;
    }
    /*If category has a valid value, the filter method is 
    used on the products array. This method creates a new array
    containing only the products elements that meet the specified 
    condition.*/
    return products.filter(product => product.category === category);
  }
}