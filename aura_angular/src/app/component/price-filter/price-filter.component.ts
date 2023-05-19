import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.css']
})
export class PriceFilterComponent {
  @Output() priceRangeChange = new EventEmitter<number[]>();
  minPrice: number = 0;
  maxPrice: number = 5000;
  rangeValue: number = 0; // Nueva propiedad con valor inicial de 0

  onPriceRangeChange() {
    const priceRange = [this.minPrice + this.rangeValue, this.maxPrice];
    this.priceRangeChange.emit(priceRange);
  }
}