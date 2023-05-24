<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class UserController extends Controller
{

    /**
     * Function to get all users with the fields ('id','name','lastname','email','location', 'icon', 'role')
     * and send it for the admin view.
     */
    public function viewUsers()
    {
        $allUsers = User::all('id', 'name', 'lastname', 'email', 'icon', 'role');
        return $allUsers;
    }

    /**
     * Function to login in the web by email and password.
     */
    public function login(Request $request)
    {
        $user = new User();
        $allUsers = User::all();

        $user->email = $request->email;
        $user->password = $request->password;

        foreach ($allUsers as $allUser) {
            if ($allUser->email == $user->email) {
                if ($allUser->password == $user->password) {
                    return $allUser;
                }
            }
        }
        return false;
    }

    /**
     * Function to register in the website and save the user in DDBB.
     */
    public function register(Request $request)
    {

        $allUsers = User::all();

        foreach ($allUsers as $allUser) {
            if ($allUser->email == $request->email) {
                return false;
            }
        }

        $user = new User();

        $user->name = $request->name;
        $user->lastname = $request->lastname;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->birthdate = $request->birthdate;
        $user->role =  "user";
        $user->assignRole("user");

        $allUsers = User::all();
        $id_user = 0;
        foreach ($allUsers as $users) {
            $id_user = $users->id + 1;
        }

        if ($id_user == 0) {
            $id_user = 1;
        }

        $image = $request->file('img');
        if ($request->hasFile('img')) {
            $img_name = $id_user . '_icon.png';
            $image->move(public_path('/image'), $img_name);
            $user->icon = 'http://be.auras.social/api/image/' . $img_name;
            $user->save();
            return response()->json($img_name . ' img added');
        } else {
            return response()->json('image null');
        }

    }

    /**
     * Function to get one user with the fields ('id','name','lastname','email','location', 'icon', 'role')
     * and send it for the client view.
     */
    public function show(Request $request)
    {
        $user = User::find($request->user_id);

        $user_to_show = new User();

        $user_to_show->id = $user->id;
        $user_to_show->name = $user->name;
        $user_to_show->lastname = $user->lastname;
        $user_to_show->email = $user->email;
        $user_to_show->icon = $user->icon;
        $user_to_show->role = $user->role;

        if (is_null($user)) {
            return response()->json('You can not get a user that does not exists', 404);
        }
        return $user_to_show;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {   
        $user = User::find($request->id);
        $user->id = $request->id;
        $user->name = $request->name;
        $user->lastname = $request->lastname;
        $user->email = $user->email;
        $user->password = $request->password;

        //Cache-busting technique:
        $randomNumber = random_int(1, 100);

        $image = $request->file('img');
        if ($request->hasFile('img')) {
            $img_name = $request->id . '_icon' . 'v=' . $randomNumber .  '.png';
            File::delete(public_path('/image'), $img_name);
            $image->move(public_path('/image'), $img_name);
            $user->icon = 'http://be.auras.social/api/image/' . $img_name;
            $user->update();
            return response()->json($img_name . ' img added');
        } else {
            $user->update();
            return response()->json('User updated but NO img added');
        }

    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy(Request $request)
    {
        $user = User::find($request->id);

        if (is_null($user)) {
            return response()->json('You can not delete a user that does not exists', 404);
        }
        $user->delete();

        return response()->noContent();
    }
}
