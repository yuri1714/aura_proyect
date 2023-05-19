<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categories;

class CategoryController extends Controller
{
    public function index()
    {
        return Categories::all();
    }

    /**
     * Store a newly created resource in storage.
     * Store crea un nuevo recurso en el almacenamiento
     */
    public function store(Request $request)
    {

        // dd($request->all());

        $categories = new Categories();

        $categories->name = $request->name;
        $categories->description = $request->description;

        $categories->save();

        return $categories;
        
    }

    /**
     * Display the specified resource.
     * despliega un recurso en especifico
     */
    public function show(Categories $categories)
    {
        // $caharacters = caharacters::find($id);
        return $categories;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Categories $categories)
    {
        
        $categories->name = $request->name;
        $categories->description = $request->description;

        $categories->update();

        return $categories;
    }

    /**
     * Remove the specified resource from storage.
     * Elimina un recursoe en especifico del almacenamieto
     */
    public function destroy($id)
    {
        $categories = Categories::find($id);

        if(is_null($categories)){
            return response()->json('No puede eliminar un usuario no existente', 404);
        }
        $categories->delete();

        return response()->noContent();
    }
}
