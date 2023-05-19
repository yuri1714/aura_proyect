import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../Models/products/products.module';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {
  transform(products: Product[], category: string): Product[] {
    if (!category || category === 'undefined') {
      return products;
    }
    return products.filter(product => product.category === category);
  }
}