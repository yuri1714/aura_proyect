<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function fileUpload(Request $request){
        if (!$request->hasFile('image') && !$request->file('image')->isValid()){
            return response()->json('{"error": "please provide an image"}');
        }
        try{
            
            $imageName = $request->file('image')->hashName();
            Storage::disk('local')->put($imageName, file_get_contents($request-file('image')));
            return response()->json($imageName);
        }catch(\Exception $e){
            return response()->json($e);
        }
    }
}
