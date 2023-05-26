import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFilter'
})
export class PriceFilterPipe implements PipeTransform {
  transform(items: any[], priceRange: number[]): any[] {
    //First, we check if items is null. If so, an empty array is returned.
    if (!items) return [];
    /*If items and priceRange have valid values, 
    the filter method is used on the items array.*/
    if (!priceRange) return items;
    //This method creates a new array containing only the elements of items that meet the specified condition.
    return items.filter(item => {
      return item.price >= priceRange[0] && item.price <= priceRange[1];
    });
  }
}