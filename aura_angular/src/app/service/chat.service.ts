import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  //private apiUrl = 'http://localhost:8000/api/message';
  private apiUrl = 'http://be.auras.social/api/message';

  constructor(private http: HttpClient) { }

  /**
   * Function from obtain chats
   * @param info Send the values to obtain the respons 
   * @returns information of the database 
   */
  getMessages(info: any){
    return this.http.post(this.apiUrl, info);
  }

  /**
   * 
   * @param info ID of users talking to each other
   * @returns a new chat between two users
   */
  startChat(info: any){
    return this.http.post('http://be.auras.social/api/createChat', info);
  }

  /**
   * Function from search and show chats
   * @returns All chats between two users
   */
  getAllChats(){
    return this.http.get('http://be.auras.social/api/getChats');
  }
  
}
