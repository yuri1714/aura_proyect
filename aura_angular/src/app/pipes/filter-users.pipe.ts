import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUsers',
})
export class FilterUsersPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    //First, we check if items is null. If so, an empty array is returned.
    if (!items) return [];
    if (!searchTerm) return items;
    //change everything to lowercase
    searchTerm = searchTerm.toLowerCase();
    /** The filter method is used on the items array.
     *  This method creates a new array
     *  containing only the items elements. */
    return items.filter(item => {
      return item.name.toLowerCase().includes(searchTerm);
    });
  }
}
