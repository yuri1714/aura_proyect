import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/Models/user/user.module';
import { LikeUserService } from 'src/app/service/like-user.service';
import { LikeProductService } from 'src/app/service/like-product.service';

@Component({
  selector: 'app-user-catalogue',
  templateUrl: './user-catalogue.component.html',
  styleUrls: ['./user-catalogue.component.css']
})
export class UserCatalogueComponent implements OnInit{
  
  allUsers!: User[];
  searchTerm: string = '';

constructor(private userService: UserService,
            private likeUser: LikeUserService,
            private likeProducts: LikeProductService){} 
  
ngOnInit(): void {
  this.userService.getUsersForAdmin().subscribe({
    next: (data: User[]) =>{
      this.allUsers = data;
      console.log('users get!');
    }, error: err =>{
      console.log('users: ', err);
    }
  });
}

}
