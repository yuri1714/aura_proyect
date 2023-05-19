<?php

namespace App\Http\Controllers;

use App\Models\UsersLikeProducts;
use Illuminate\Http\Request;


class LikeProducts extends Controller
{
    /**
     * Display a listing of the resource.
     * despliega una lista del recurso
     */
    public function allLikeProducts()
    {
        return UsersLikeProducts::all();
    }

    /**
     * Store a newly created resource in storage.
     * Store crea un nuevo recurso en el almacenamiento
     */
    public function save_like(Request $request)
    {
        $allLikes = UsersLikeProducts::all();

        foreach ($allLikes as $allLike) {
            if ($allLike->id_user == $request->id_user && $allLike->id_product == $request->id_product) {

                $existLikeProducts = UsersLikeProducts::find($allLike->id);

                if (is_null($existLikeProducts)) {
                    return response()->json('Can not delete a inexistent product', 404);
                }

                $existLikeProducts->delete();
                return false;
            }
        }

        $likeProducts = new UsersLikeProducts();

        $likeProducts->id_user = $request->id_user;
        $likeProducts->id_product = $request->id_product;

        $likeProducts->save();

        return true;
    }

    /**
     * Searchs if the user has the like in the specific product.
     */
    public function search_like(Request $request)
    {
        $allLikes = UsersLikeProducts::all();

        foreach ($allLikes as $allLike) {
            if ($allLike->id_user == $request->id_user && $allLike->id_product == $request->id_product) {
                // If the product haves the like of the user:
                return true;
            }
        }
        // If the product dont haves the like of the user:
        return response()->json('like not exist', 200);
    }

    /**
     * Display the specified resource.
     * despliega un recurso en especifico
     */
    public function show(UsersLikeProducts $products)
    {
        return $products;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UsersLikeProducts $products)
    {

        $products->title = $request->title;
        $products->img = "";
        $products->price = $request->price;
        $products->description = $request->description;
        $products->category = $request->category;

        $products->update();

        return $products;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $likeProducts = UsersLikeProducts::find($request->id);

        if (is_null($likeProducts)) {
            return response()->json('Can not delete a inexistent product', 404);
        }
        $likeProducts->delete();

        return response()->noContent();
    }
}
