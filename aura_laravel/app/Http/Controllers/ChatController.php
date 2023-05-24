<?php

namespace App\Http\Controllers;
use App\Models\ChatMessages;
use App\Models\StartedChats;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use PHPUnit\Event\TestSuite\Started;

class ChatController extends Controller
{
    public function message(Request $request){
        $allMessages = ChatMessages::all();
        $messages = new Collection();
        foreach ($allMessages as $message) {
            if($message->dest_user == $request->user_dest && $message->sender_user == $request->user_logged){
                $messages->push(new ChatMessages(['dest_user' => $request->user_dest, 'sender_user' => $request->user_logged, 'message' => $message->message]));
            }
            if($message->dest_user == $request->user_logged && $message->sender_user == $request->user_dest){
                $messages->push(new ChatMessages(['dest_user' => $request->user_logged, 'sender_user' => $request->user_dest, 'message' => $message->message ]));
            }
        }

        return $messages;
        
    }

    public function createChat(Request $request){
        $newChat = new StartedChats();
        $newChat->id_user1 = $request->id_user1;
        $newChat->id_user2 = $request->id_user2;
        $allChats = StartedChats::all();

        foreach ($allChats as $chat) {
            if($chat->id_user1 == $newChat->id_user1 || $chat->id_user1 == $newChat->id_user2){
                return $newChat;
            } else if($chat->id_user2 == $newChat->id_user1 || $chat->id_user2 == $newChat->id_user2) {
                return $newChat;
            }
        }
        $newChat->save();
        return $newChat;

    }

    public function getChat(){
       return StartedChats::all();
    }

}
