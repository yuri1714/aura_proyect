<?php

namespace App\Http\Controllers;

use App\Models\UsersLikeUsers;
use Illuminate\Http\Request;


class LikeUsers extends Controller
{
    /**
     * Display a listing of the resource.
     * despliega una lista del recurso
     */
    public function allLikeUsers()
    {
        return UsersLikeUsers::all();
    }

    /**
     * Store a newly created resource in storage.
     * Store crea un nuevo recurso en el almacenamiento
     */
    public function save_like_user(Request $request)
    {
        $allLikes = UsersLikeUsers::all();

        foreach ($allLikes as $allLike) {
            if ($allLike->user_clicks == $request->user_clicks && $allLike->user_saved == $request->user_saved) {

                $existLikeUsers = UsersLikeUsers::find($allLike->id);

                if (is_null($existLikeUsers)) {
                    return response()->json('Data not found in DDBB', 404);
                }
                $existLikeUsers->delete();
                return false;
            }
        }

        $likeUsers = new UsersLikeUsers();

        $likeUsers->user_clicks = $request->user_clicks;
        $likeUsers->user_saved = $request->user_saved;

        $likeUsers->save();

        return $likeUsers;
    }

    /**
     * Searchs if the user has the like in the specific user.
     */
    public function search_like(Request $request)
    {
        $allLikes = UsersLikeUsers::all();

        foreach ($allLikes as $allLike) {
            if ($allLike->user_clicks == $request->user_clicks && $allLike->user_saved == $request->user_saved) {
                // If the user haves the like of the other user:
                return true;
            }
        }
        // If the user dont haves the like of the other user:
        return response()->json('like not exist', 200);
    }

    /**
     * Remove the specified resource from storage.
     * Elimina un recursoe en especifico del almacenamieto
     */
    public function destroy(Request $request)
    {
        $likeUsers = UsersLikeUsers::find($request->id);

        if (is_null($likeUsers)) {
            return response()->json('Can not delete a like that do not exists', 404);
        }
        $likeUsers->delete();

        return response()->noContent();
    }
}
