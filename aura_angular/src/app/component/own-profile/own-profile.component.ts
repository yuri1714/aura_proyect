import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LikeProductService } from 'src/app/service/like-product.service';
import { LikeUserService } from 'src/app/service/like-user.service';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';
import { Product } from 'src/app/Models/products/products.module';
import { User } from 'src/app/Models/user/user.module';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-own-profile',
  templateUrl: './own-profile.component.html',
  styleUrls: ['./own-profile.component.css'],
})
export class OwnProfileComponent implements OnInit {
  allProducts: Product[] = [];
  allLikeProducts: any;
  allLikeUsers: any;
  allUsers: User[] = [];
  allChats!: any;
  startedChats: any[] = [];
  productsProfile: boolean = true;
  favoritesProfile: boolean = false;
  chatProfile: boolean = false;
  favProducts: boolean = false;
  favUsers: boolean = false;
  id_selected_user: any;
  id_logged_user: any;
  selected_user!: User;
  selected_is_the_same: boolean = false;
  user_products: Product[] = [];
  user_fav_products: Product[] = [];
  user_fav_users: any[] = [];
  id!: number;
  heart_color: string = 'text-red-500 bg-red-200';
  heart_color_prod: string = 'text-red-500 bg-red-200';

  constructor(
    private userService: UserService,
    private products: ProductService,
    private route: Router,
    private likeProducts: LikeProductService,
    private likeUser: LikeUserService,
    private chatService: ChatService
  ) {}

  /**
   * When starting the component,
   * everything inside this function
   * will be executed.
   */
  ngOnInit(): void {
    const userLogged = JSON.parse(localStorage.getItem('actualUser') || '[]');
    this.id_selected_user = userLogged.id;

    this.setAllProfileDataFromUser(this.id_selected_user);
  }


  /**
   * Saves the like of the product that the user clicks, but if the user is
   * not logged then it redirects to the login page.
   */
   saveLikeProduct(id: any) {
    if(this.heart_color_prod == 'text-gray-500 bg-gray-200'){
      this.heart_color_prod = 'text-red-500 bg-red-200';
    } else {
      this.heart_color_prod = 'text-gray-500 bg-gray-200';
    }
    if (localStorage.getItem('isLoggedIn') == 'true') {
      const userLogged = JSON.parse(localStorage.getItem('actualUser') || '[]');
      const productLike = {
        id_user: userLogged.id,
        id_product: id,
      };

      this.likeProducts.addLikeProduct(productLike).subscribe((data) => {
      });
    } else {
      this.route.navigate(['/login']);
    }
  }

  /**
   * Function for call likeUsers for service
   */
  saveLikeUser(user_saved: any) {
    if(this.heart_color == 'text-gray-500 bg-gray-200'){
      this.heart_color = 'text-red-500 bg-red-200';
    } else {
      this.heart_color = 'text-gray-500 bg-gray-200';
    }
    const userLike = {
      user_clicks: this.id_logged_user,
      user_saved: user_saved,
    };

    this.likeUser.addLikeUser(userLike).subscribe((response) => {});
  }

  /**
   * Function for the product button to display the "product" information.
   */
  producCheck() {
    this.productsProfile = true;
    this.favoritesProfile = false;
    this.chatProfile = false;
    this.favProducts = false;
    this.favUsers = false;
  }

  /**
   * Function for the favorites button to display the "favorites" information.
   */
  favoritesCheck() {
    this.productsProfile = false;
    this.favoritesProfile = true;
    this.chatProfile = false;
    this.favProducts = true;
    this.favUsers = false;
  }

  /**
   * Function for the chat button to display the "chat" information.
   */
  chatCheck() {
    this.productsProfile = false;
    this.favoritesProfile = false;
    this.chatProfile = true;
    this.favProducts = false;
    this.favUsers = false;
  }

  /**
   * Function for the favsProducts button to display the "favsProducts" information.
   */
  favsProducts() {
    this.favProducts = true;
    this.favUsers = false;
  }

  /**
   * Function for the favsUsers button to display the "favsUsers" information.
   */
  favsUsers() {
    this.favProducts = false;
    this.favUsers = true;
  }

  setUserIds(id: number): void {
    this.id_selected_user = id;
    const userLogged = JSON.parse(localStorage.getItem('actualUser')!);
    this.id_logged_user = userLogged.id;
    if (this.id_selected_user == this.id_logged_user) {
      this.selected_is_the_same = true;
    } else {
      this.selected_is_the_same = false;
    }
  }
  
  getUserOwner(): void {
    const user_id = {
      user_id: this.id_selected_user
    }
    this.userService.getUserOwner(user_id).subscribe({
      next: (data: User) => {
        this.selected_user = data;
      },
      error: (err) => {
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

  getUserLikeProducts(): void {
    this.likeProducts.getLikeProducts().subscribe((data: any) => {
      this.allLikeProducts = data;
      for (let index = 0; index < this.allLikeProducts.length; index++) {
        if (this.allLikeProducts[index].id_user == this.id_selected_user) {
          const id_product = this.allLikeProducts[index].id_product;

          for (let index = 0; index < this.allProducts.length; index++) {
            if (this.allProducts[index].id == id_product) {
              this.user_fav_products.push(this.allProducts[index]);
              
            }
          }
        }
      }
    });
  }

  getUserLikeUsers(): void {
    this.likeUser.getLikeUsers().subscribe((data: any) => {
      this.allLikeUsers = data;
      for (let index = 0; index < this.allLikeUsers.length; index++) {
        if (this.allLikeUsers[index].user_clicks == this.id_logged_user) {
          const id_saved = {
            user_id: this.allLikeUsers[index].user_saved
          }
          this.userService.getUserOwner(id_saved).subscribe({
            next: (data) => {
              this.user_fav_users.push(data);
            },
            error: (err) => {
            },
          });
        }
      }
    });
  }

  // Function to delete a user 
  deleteUsers() {
    if(confirm('Do you want to delete your account and all your products?')){
      //Create variable to put the user id
    const id = {
      id: this.id_selected_user,
    };

    //This For is to delete all the products of the user
    for (let index = 0; index < this.allProducts.length; index++) {
      if (this.allProducts[index].user_id == this.id_selected_user) {
        const id_prod = {
          id: this.allProducts[index].id,
        };
        this.products.deleteProduct(id_prod).subscribe({
        });
        
        this.likeProducts.getLikeProducts().subscribe({
          next: (data) => {
            this.allLikeProducts = data;
            //Delete like products of user.
            for (let index = 0; index < this.allLikeProducts.length; index++) {
              if (this.allLikeProducts[index].id_user == this.id_selected_user || this.allLikeProducts[index].id_product == this.allProducts[index].id) {
                const id_likeP = {
                  id: this.allLikeProducts[index].id,
                };
                this.likeProducts.deleteLikeProduct(id_likeP).subscribe({
                });
              }
            }
          },
          error: (err) => {},
        });

      }
    }

    this.likeUser.getLikeUsers().subscribe({
      next: (data) => {
        this.allLikeUsers = data;

        for (let index = 0; index < this.allLikeUsers.length; index++) {
          if (this.allLikeUsers[index].user_clicks == this.id_selected_user || this.allLikeUsers[index].user_saved == this.id_selected_user) {
            const id_like_user = {
              id: this.allLikeUsers[index].id,
            };
            this.likeUser.deleteLikeUser(id_like_user).subscribe({
            });
          }
        }
      },
      error: (err) => {
      },
    });

    //Function to delete the user
    this.userService.deleteUser(id).subscribe({
    });

    localStorage.setItem('isLoggedIn','false'); 
    localStorage.removeItem('actualUser');
    this.route.navigate(['/']);
    }
    
    
  }

  getAllUsers(){
    this.userService.getUsersForAdmin().subscribe({
      next: (data: User[]) =>{
        this.allUsers = data;
      }, error: err =>{
      }
    });
  }

  getAllChats(){
    this.chatService.getAllChats().subscribe({
      next: (data) =>{
        this.allChats = data;
        for (let index = 0; index < this.allChats.length; index++) {
          // Search the logged user in the started chats table
          const chatIndex = index;
          if(this.allChats[index].user1 == JSON.parse(localStorage.getItem('actualUser') || '[]').id){
            for (let index = 0; index < this.allUsers.length; index++) {
              if(this.allUsers[index].id == this.allChats[chatIndex].user2){
                this.startedChats.push(this.allUsers[index]);
              }
            }
          }else if(this.allChats[index].user2 == JSON.parse(localStorage.getItem('actualUser') || '[]').id){
            for (let index = 0; index < this.allUsers.length; index++) {
              if(this.allUsers[index].id == this.allChats[chatIndex].user1){
                this.startedChats.push(this.allUsers[index]);
              }
            }
          }
    
        }
      }, error: err =>{
      }
    });
    
  }

  deleteProduct(id_product_selected: any) {
    if(confirm('Do you want to delete this product?')){
      const id_product = {
        id: id_product_selected,
      };
      this.products.deleteProduct(id_product).subscribe((data) => {
      });
      this.route.navigate(['/ownprofile']);
    }
    
  }

  public setAllProfileDataFromUser(id: number): void {

    this.setUserIds(id);
    this.getUserOwner();
    this.getUserLikeProducts();
    this.getUserProducts();
    this.getUserLikeUsers();
    this.getAllUsers();
    this.getAllChats();
  }
}
