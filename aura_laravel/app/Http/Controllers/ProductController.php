<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Http\UploadedFile;


class ProductController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Products::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $products = new Products();
        
        $products->title = $request->title;
        $products->price = $request->price;
        $products->description = $request->description;
        $products->category = $request->category;
        $products->user_id = $request->user_id;
        $products->lat = $request->lat;
        $products->lng = $request->lng;

        $allProducts = Products::all();
        $id_product = 0;
        foreach ($allProducts as $product) {
            $id_product = $product->id + 1;
        }

        if ($id_product == 0) {
            $id_product = 1;
        }

        $image = $request->file('img');
        if ($request->hasFile('img')) {
            $img_name = $request->user_id . '_' . $id_product;
            $image->move(public_path('/image'), $img_name . '.png');
            $products->img = 'http://localhost:8000/api/image/' . $img_name . '.png';
            $products->save();
            return response()->json($img_name . ' img added');
        } else {
            return response()->json('image null' . $image);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Products $products)
    {
        // $caharacters = caharacters::find($id);
        return $products;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Products $products)
    {
        $product = Products::find($request->id);
        $product->id = $request->id;
        $product->title = $request->title;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->category = $request->category;
        $product->user_id = $request->user_id;

        //Cache-busting technique:
        $randomNumber = random_int(1, 100);

        $image = $request->file('img');
        if ($request->hasFile('img')) {
            $img_name = $request->user_id . '_' . $request->id . 'v=' . $randomNumber . '.png';
            File::delete(public_path('/image'), $img_name);
            $image->move(public_path('/image'), $img_name);
            $product->img = 'http://localhost:8000/api/image/' . $img_name;
            $product->update();
            return response()->json($img_name . ' img added');
        } else {
            $product->update();
            return response()->json('Product updated but NO img added');
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $products = Products::find($request->id);


        if (is_null($products)) {
            return response()->json('Can not delete a product that do not exists' . $request->id, 404);
        }
        $products->delete();

        return response()->noContent();
    }


    public function uploadImage(Request $request)
    {

        $imagePath = $request->file('img')->store('public/image');

        return response()->json([
            'imageUrl' => Storage::url($imagePath)
        ]);
    }
}
