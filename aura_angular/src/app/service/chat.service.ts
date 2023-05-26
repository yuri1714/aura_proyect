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
   * Displays all messages in a chat between two users
   * @param info
   * @return messages between two users
   */
  getMessages(info: any){
    return this.http.post(this.apiUrl, info);
  }

  /**
   * Receives the IDs of the two users who want to start a conversation and creates a new chat channel.
   * @param info
   * @return A new chat channel
   */
  startChat(info: any){
    return this.http.post('http://be.auras.social/api/createChat', info);
  }

  getAllChats(){
    return this.http.get('http://be.auras.social/api/getChats');
  }
  
}
