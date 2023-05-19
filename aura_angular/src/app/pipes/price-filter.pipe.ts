import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFilter'
})
export class PriceFilterPipe implements PipeTransform {
  transform(items: any[], priceRange: number[]): any[] {
    if (!items) return [];
    if (!priceRange) return items;
    return items.filter(item => {
      return item.price >= priceRange[0] && item.price <= priceRange[1];
    });
  }
}