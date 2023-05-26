import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
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
      console.log(item)
      return item.title.toLowerCase().includes(searchTerm);
    });
  }
}

