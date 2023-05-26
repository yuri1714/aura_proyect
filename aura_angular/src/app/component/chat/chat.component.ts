import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/user/user.module';
import { ChatService } from 'src/app/service/chat.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  message!: string;
  ws: any;
  idClient!: any;
  idDest!: any;
  ownMessages!: any;
  errorMessage: string = '';
  scrollContainer: any;
  other_user!: User;

  formChat = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.maxLength(250)]),
  });

  constructor(
    private Aroute: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserService,
    private router: Router
  ){}

  ngOnInit(): void {

    this.idClient = JSON.parse(localStorage.getItem('actualUser') || '[]').id;
    this.idDest = this.Aroute.snapshot.paramMap.get('id');

    // If the user you are trying to chat its you, redirect to home
    if(this.idClient == this.idDest){
      this.router.navigate(['/']);
    }
    const info = {
      user_dest: this.idDest,
      user_logged: this.idClient,
    }
    this.chatService.getMessages(info).subscribe({
      next: (data) => {
        this.ownMessages = data;
      },
      error: (err) => {},
    });

    // Creation of the WebSocket connection
    this.ws = new WebSocket('ws://node.auras.social:6001/'); 

    // When the connection opens:
    this.ws.addEventListener("open", (event:any) => {
      this.ws.send(JSON.stringify({action: 'id', idUser: this.idClient}))
    });

    // When there is a error:
    this.ws.addEventListener("error", (event:any) => {
    });

    // When gets a message from the node
    this.ws.addEventListener("message", (event:any) => {

      this.ownMessages.push({dest_user: this.idClient, sender_user: this.idDest, message: event.data});
      
    });
    // When the connection closes:
    this.ws.addEventListener("close", (event:any) => {
    });

    // Code from the JavaScript file to put the scroll bar to the very bottom
    this.scrollContainer = document.getElementById('scrollContainer');
    if(this.scrollContainer){
      this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight;
      this.scrollContainer.addEventListener('DOMSubtreeModified',  () => {
        this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight;
      });
    }

    // Get the info of the other user you are chatting
    this.getOtherUser();
  }

  /**
   * Function for with send message, the message save a database and the other user see the message
   */
  send_message(): void{
    if(this.formChat.value.message && !this.formChat.invalid){

    this.ws.send(JSON.stringify({action: 'message', sender: this.idClient, dest: this.idDest, text: this.formChat.value.message }));
    this.ownMessages.push({dest_user: this.idDest, sender_user: this.idClient, message: this.formChat.value.message});
    
    // Create chat conexion with the two users
    const info = {
      user1: this.idClient,
      user2: this.idDest
    }
    this.chatService.startChat(info).subscribe({    });
    
    }else{
      this.errorMessage = 'messages error';
      
    }
    this.formChat.controls['message'].setValue('');
  }

  /**
   * This function validate the messages to position in the left or right side of the page.
   * @param destUser ID of the destination user
   * @returns string of the position class
   */
  getMessagePosition(destUser: any): string{
    return destUser == this.idClient ? 'justify-start ' : 'justify-end ';
  }

  /**
   * This function validate the messages to put an style or another.
   * @param destUser ID of the destination user 
   * @returns string of the style class
   */
  getMessageStyle(destUser: any): string{
    return destUser == this.idClient ? 'justify-start rounded-br-3xl rounded-tl-3xl rounded-tr-3xl bg-gray-400' : 'justify-end rounded-bl-3xl rounded-tl-3xl rounded-tr-3xl bg-blue-400';
  }

  /**
   * Function to get the info of the other user of the chat.
   */
  getOtherUser(): void{
    const user_id = {
      user_id: this.idDest,
    };
    this.userService.getUserOwner(user_id).subscribe({
      next: (data: User) => {
        this.other_user = data;
      },
      error: (err) => {
      },
    });
  }

  /**
   * This function searchs if the messages is your or not to put the icon correctly.
   * @param destUser ID of the destination user 
   * @returns string of the icon url
   */
  getIconImg(destUser: any): string{
    if(destUser != this.idClient){
      return JSON.parse(localStorage.getItem('actualUser') || '[]').icon;
    } else {
      if(this.other_user){
        return this.other_user.icon;
      }else {
        return '';
      }
      
    }
  }

  /**
   * This function validates to show the icon or not.
   * @param destUser ID of the destination user 
   * @returns string of the icon style
   */
  getImgStyle(destUser: any): string{
    if(destUser != this.idClient){
      return 'hidden';
    } else {
      return '';
    }
  }

  /**
   * This function validates to put the style of the button.
   * @returns string of the style of the send button
   */
  getSendBtn(): string{
    if(this.formChat.invalid){
      return 'bg-gray-600';
    }else {
      return 'bg-blue-400 hover:bg-blue-500 [box-shadow:0_10px_0_0_#60a5fa,0_15px_0_0_#1b70f841] hover:[box-shadow:0_10px_0_0_#3b82f6,0_15px_0_0_#1b70f841]'
    }
  }

}
