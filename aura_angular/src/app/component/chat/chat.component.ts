import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private renderer: Renderer2
  ){}

  ngOnInit(): void {

    this.idClient = JSON.parse(localStorage.getItem('actualUser') || '[]').id;
    this.idDest = this.Aroute.snapshot.paramMap.get('id');

    console.log('ID logged user: ' + this.idClient);
    console.log('ID chat user: ' + this.idDest);
    const info = {
      user_dest: this.idDest,
      user_logged: this.idClient,
    }
    this.chatService.getMessages(info).subscribe({
      next: (data) => {
        console.log('messages get!');
        this.ownMessages = data;
        console.log(this.ownMessages);

      },
      error: (err) => {
        console.log('error: ', err);
      },
    });

    console.log(window.location.hostname);
    this.ws = new WebSocket('ws://node.auras.social:6001/');

    this.ws.addEventListener("open", (event:any) => {
      console.log("open");
      this.ws.send(JSON.stringify({action: 'id', idUser: this.idClient}))
    });

    this.ws.addEventListener("error", (event:any) => {
      console.log("WebSocket error: ", event);
    });

    this.ws.addEventListener("message", (event:any) => {
      console.log("del servidor: " + event.data);

      this.ownMessages.push({dest_user: this.idClient, sender_user: this.idDest, message: event.data});

    });

    this.ws.addEventListener("close", (event:any) => {
      console.log("close");
    });

    this.scrollContainer = document.getElementById('scrollContainer');
    if(this.scrollContainer){
      this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight;
      this.scrollContainer.addEventListener('DOMSubtreeModified',  () => {
        this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight;
      });
    }

    this.getOtherUser();
  }

  /**
   * Function for with send message, the message save a database and the other user see the message
   */
  send_message(): void{
    if(this.formChat.value.message && !this.formChat.invalid){
      console.log(this.formChat.value.message);

    this.ws.send(JSON.stringify({action: 'message', sender: this.idClient, dest: this.idDest, text: this.formChat.value.message }));
    this.ownMessages.push({dest_user: this.idDest, sender_user: this.idClient, message: this.formChat.value.message});

    // Create chat conexion with the two users
    const info = {
      id_user1: this.idClient,
      id_user2: this.idDest
    }
    this.chatService.startChat(info).subscribe({
      next: (data) => {
        console.log('messages get!');
      },
      error: (err) => {
        console.log('error: ', err);
      },
    });

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
        console.log('error: ', err);
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
      return 'bg-blue-400 hover:bg-blue-500'
    }
  }

}
