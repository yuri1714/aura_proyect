import { Component, ElementRef, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LikeProductService } from 'src/app/service/like-product.service';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { UserService } from 'src/app/service/user.service';
import { Product } from 'src/app/Models/products/products.module';
import { User } from 'src/app/Models/user/user.module';
import * as L from 'leaflet';

@Component({
  selector: 'app-catalog',
  templateUrl: './product-profile.component.html',
  styleUrls: ['./product-profile.component.css'],
})
export class ProductProfileComponent implements OnInit {

  //MARKER
  marker!: L.Marker;

  constructor(
    private route: ActivatedRoute,
    private products: ProductService,
    private userService: UserService,
    private authServer: AuthServiceService,
    private like: LikeProductService,
    private router: Router,
    private elementRef: ElementRef
  ) {
    
  }

  id_product_selected: any;
  allProducts: Product[] = [];
  product_selected!: Product;
  id_user: any;
  id_selected_user: any;
  user_owner_info!: User;
  id_logged_user: any;
  selected_is_the_same: boolean = false;
  heart_color: string = 'gray';
  paypal: any;
  id_user_paypal: any;
  lat!: any;
  lng!: any;
  loggedRole: string = '';


  ngOnInit(): void {

    // Gets the id of the route to know the id of the product.
    this.id_product_selected = this.route.snapshot.paramMap.get('id');
    const userLogged = JSON.parse(localStorage.getItem('actualUser') || '[]');
    this.loggedRole = userLogged.role;
    /**
     * Get all products of the DDBB and gets the information of the product selected.
     * Also validates the owner of the product to know if it is the same that the user logged.
     */
    this.products.getProducts().subscribe((data: Product[]) => {
      this.allProducts = data;
      for (let index = 0; index < this.allProducts.length; index++) {
        if (this.allProducts[index].id == this.id_product_selected) {
          this.product_selected = this.allProducts[index];
          break;
        }
      }
      const user_id = {
        user_id: this.product_selected.user_id,
      };
      this.userService.getUserOwner(user_id).subscribe({
        next: (data: User) => {
          this.user_owner_info = data;
          console.log(this.user_owner_info);

          if (this.user_owner_info.id == userLogged.id) {
            this.selected_is_the_same = true;
          } else {
            this.selected_is_the_same = false;
          }
        },
        error: (err) => {
          console.log('error: ', err);
        },
      });
      // Declaration of the latitude and longitude of the product.
      this.lat = this.product_selected.lat
      this.lng = this.product_selected.lng
      
      // Creation of the map with the exact location of the product.
      const map = L.map('map').setView([this.lat, this.lng], 13);

      // Adds a base map
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);
    
      // Adds a control to select the locations
      this.marker = L.marker([this.lat, this.lng], {
        draggable: false,
      }).addTo(map);

    });

    const productLike = {
      id_user: userLogged.id,
      id_product: this.id_product_selected,
    };
    console.log(productLike);

    this.like.searchLikeProduct(productLike).subscribe((data) => {
      if(data == 1){
        this.heart_color = 'text-red-500 bg-red-200';
      } else {
        this.heart_color = 'text-gray-500 bg-gray-200';
      }
    });
  }

  /**
   * Saves the like of the product that the user clicks, but if the user is
   * not logged then it redirects to the login page.
   */
  saveLikeProduct() {
    if(this.heart_color == 'text-gray-500 bg-gray-200'){
      this.heart_color = 'text-red-500 bg-red-200';
    } else {
      this.heart_color = 'text-gray-500 bg-gray-200';
    }
    if (localStorage.getItem('isLoggedIn') == 'true') {
      const userLogged = JSON.parse(localStorage.getItem('actualUser') || '[]');
      const productLike = {
        id_user: userLogged.id,
        id_product: this.id_product_selected,
      };
      console.log(productLike);

      this.like.addLikeProduct(productLike).subscribe((data) => {
        console.log('addlike: ' + data);
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  /**
   * Validates to sends the user to his own profile or to the profile of
   * the other user.
   * @param id of the user clicked
   */
  setUserIds(id: number): void {
    if(localStorage.getItem('isLoggedIn') == 'true'){
      this.id_selected_user = id;
    console.log('ID SELECTED: ' + this.id_selected_user);
    const userLogged = JSON.parse(localStorage.getItem('actualUser')!);
    this.id_logged_user = userLogged.id;
    console.log(this.id_logged_user);
    if (this.id_selected_user == this.id_logged_user) {
      this.selected_is_the_same = true;
    } else {
      this.selected_is_the_same = false;
    }
    if(this.selected_is_the_same){
      this.router.navigate(['/ownprofile']);
    } else {
      this.router.navigate(['/profile/', id]);
    }
    } else {
      this.router.navigate(['/login']);
    }
    
  }

  /**
   * This function deletes the product that the user select when he click "Delete".
   * Then, redirects to the main page.
   * @param id_product_selected ID of the product that the user clicks
   */
  deleteProduct(id_product_selected: any) {
    if(confirm('Do you want to delete this product?')){
      const id_product = {
        id: id_product_selected,
      };
      this.products.deleteProduct(id_product).subscribe((data) => {
        console.log(data);
      });
      this.router.navigate(['/']);
    }
    
  }
}
