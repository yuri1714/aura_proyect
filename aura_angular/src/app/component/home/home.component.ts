import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import Echo from 'laravel-echo';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // All the products from DDBB
  allProduct: any[] = [];

  // First 4 products with category "Cars"
  fourCars: any[] = [];

  // First 4 products with category "Series"
  fourSeries: any[] = [];

  // First 4 products with category "Games"
  fourGames: any[] = [];

  // First 4 products with category "Books"
  fourBooks: any[] = [];

  // First 4 products with category "Sports"
  fourSports: any[] = [];

  constructor(private products: ProductService){

  }

  ngOnInit(): void {

    const echo = new Echo({
      broadcaster: 'pusher',
      key: '02ba44eb9676739d361f',
      wsHost: window.location.hostname,
      cluster: 'eu',
      wsPort: 6001,
      forceTLS: false,    // Important Line
      disableStats: true,
      enabledTransports: ['ws']
    });
    echo.channel('chat')
      .listen('ChatEvent', (res: any) => {
        console.log('Chat Event Data : ', res);
      });


    // Get all the products and save the first 4 products from each category
    this.products.getProducts().subscribe((data:any) => {
      this.allProduct = data;
      this.allProduct.forEach((product: any) => {
        if(this.fourCars.length<4){
          if(product.category == 'Cars'){
          this.fourCars.push(product);
        }
        }
        if(this.fourBooks.length<4){
          if(product.category == 'Books'){
          this.fourBooks.push(product);
        }
        }
        if(this.fourGames.length<4){
          if(product.category == 'Games'){
          this.fourGames.push(product);
        }
        }
        if(this.fourSeries.length<4){
          if(product.category == 'Series'){
          this.fourSeries.push(product);
        }
        }
        if(this.fourSports.length<4){
          if(product.category == 'Sports'){
          this.fourSports.push(product);
        }
        }
      });
    });
    

  }

}
