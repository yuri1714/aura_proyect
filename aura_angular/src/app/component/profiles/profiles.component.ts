import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { LikeProductService } from 'src/app/service/like-product.service';

import { LikeUserService } from 'src/app/service/like-user.service';
import { UserService } from 'src/app/service/user.service';
import { Product } from 'src/app/Models/products/products.module';
import { User } from 'src/app/Models/user/user.module';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css'],
})
export class ProfilesComponent implements OnInit {
  allProducts: Product[] = [];
  productsProfile: boolean = true;
  id_selected_user: any;
  id_logged_user: any;
  selected_user: any;
  selected_is_the_same: boolean = false;
  user_products: Product[] = [];
  id!: number;
  role_user!: string;
  allLikeProducts: any;
  allLikeUsers: any;
  heart_color!: string;

  constructor(
    private userService: UserService,
    private products: ProductService,
    private Aroute: ActivatedRoute,
    private route: Router,
    private likeUser: LikeUserService,
    private likeProducts: LikeProductService
  ) {}

  ngOnInit(): void {
    this.id_selected_user = this.Aroute.snapshot.paramMap.get('id');
    const userLogged = JSON.parse(localStorage.getItem('actualUser') || '[]');
    const userLike = {
      user_clicks: userLogged.id,
      user_saved: this.id_selected_user,
    };
    console.log(userLike);

    this.likeUser.searchLikeUser(userLike).subscribe((data) => {
      if(data == 1){
        this.heart_color = 'text-red-500 bg-red-200';
      } else {
        this.heart_color = 'text-gray-500 bg-gray-200';
      }
    });

    this.setAllProfileDataFromUser(this.id_selected_user);

    this.role_user = userLogged.role;
    console.log(this.role_user);
  }

  /**
   * Function for call likeUsers for service
   */
  saveLikeUser() {
    if(this.heart_color == 'text-gray-500 bg-gray-200'){
      this.heart_color = 'text-red-500 bg-red-200';
    } else {
      this.heart_color = 'text-gray-500 bg-gray-200';
    }
    const userLike = {
      user_clicks: this.id_logged_user,
      user_saved: this.id_selected_user,
    };

    this.likeUser.addLikeUser(userLike).subscribe((response) => {});
  }

  /**
   * Function for the product button to display the "product" information.
   */
  producCheck() {
    this.productsProfile = true;
  }

  // Function to delete a user 
  deleteUsers() {
    if(confirm('Do you want to delete your account and all your products?')){
      //Create variable to put the user id
    const id = {
      id: this.id_selected_user,
    };
    console.log(id);

    //This For is to delete all the products of the user
    for (let index = 0; index < this.allProducts.length; index++) {
      if (this.allProducts[index].user_id == this.id_selected_user) {
        const id_prod = {
          id: this.allProducts[index].id,
        };
        console.log(id_prod);
        this.products.deleteProduct(id_prod).subscribe({
          next: (data) => {
            console.log('deleteProduct get!');
          },
          error: (err) => {
            console.log('error: ', err);
          },
        });
        
        this.likeProducts.getLikeProducts().subscribe({
          next: (data) => {
            this.allLikeProducts = data;
            console.log('likeProducts get!');
            //Delete like products of user.
            for (let index = 0; index < this.allLikeProducts.length; index++) {
              if (this.allLikeProducts[index].id_user == this.id_selected_user || this.allLikeProducts[index].id_product == this.allProducts[index].id) {
                const id_likeP = {
                  id: this.allLikeProducts[index].id,
                };
                this.likeProducts.deleteLikeProduct(id_likeP).subscribe({
                  next: (data) => {
                    console.log('deleteLikeP get!');
                  },
                  error: (err) => {
                    console.log('error: ', err);
                  },
                });
              }
            }
          },
          error: (err) => {
            console.log('error: ', err);
          },
        });

      }
    }

    this.likeUser.getLikeUsers().subscribe({
      next: (data) => {
        this.allLikeUsers = data;
        console.log('deleteUser get!');

        for (let index = 0; index < this.allLikeUsers.length; index++) {
          if (this.allLikeUsers[index].user_clicks == this.id_selected_user || this.allLikeUsers[index].user_saved == this.id_selected_user) {
            const id_like_user = {
              id: this.allLikeUsers[index].id,
            };
            this.likeUser.deleteLikeUser(id_like_user).subscribe({
              next: (data) => {
                console.log('deleteLikeUser get!');
              },
              error: (err) => {
                console.log('error: ', err);
              },
            });
          }
        }
      },
      error: (err) => {
        console.log('error: ', err);
      },
    });

    //Function to delete the user
    this.userService.deleteUser(id).subscribe({
      next: (data) => {
        console.log('deleteUser get!');
      },
      error: (err) => {
        console.log('error: ', err);
      },
    });

    this.route.navigate(['/user-catalogue']);
    }
    
    
  }

  /**
   *
   * @param id
   */
  setUserIds(id: number): void {
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
  }

  /**
   * funcion for view information user
   */
  getUserOwner(): void {
    const user_id = {
      user_id: this.id_selected_user,
    };
    this.userService.getUserOwner(user_id).subscribe({
      next: (data: User) => {
        this.selected_user = data;
        console.log('owner get!');
      },
      error: (err) => {
        console.log('error: ', err);
      },
    });
  }

  getUserProducts(): void {
    this.products.getProducts().subscribe((prod: Product[]) => {
      this.allProducts = prod;
      for (let index = 0; index < this.allProducts.length; index++) {
        if (this.allProducts[index].user_id == this.id_selected_user) {
          this.user_products.push(this.allProducts[index]);
        }
      }
    });
  }

  /**
   * Function to call all functions on web startup
   * @param id
   */
  public setAllProfileDataFromUser(id: number): void {
    this.route.navigate(['/profile/', id]);

    this.allProducts = [];
    this.productsProfile = true;
    this.id_selected_user = '';
    this.id_logged_user = '';
    this.selected_user = '';
    this.selected_is_the_same = false;
    this.user_products = [];

    this.setUserIds(id);
    this.getUserOwner();
    this.getUserProducts();
  }
}
