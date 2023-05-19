<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\LikeProducts;
use App\Http\Controllers\LikeUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('user', [UserController::class, 'login']);
Route::post('register', [UserController::class, 'register']);
Route::post('show', [UserController::class, 'show']);
Route::get('viewUsers', [UserController::class, "viewUsers" ]);
Route::post('deleteUser', [UserController::class, "destroy"]);
Route::post('editUser', [UserController::class, "update"]);
// Route::apiResource('user', UserController::class);

Route::apiResource('product', ProductController::class);
Route::apiResource('category', CategoryController::class);
Route::post('deleteProduct', [ProductController::class, 'destroy']);
Route::post('editProduct', [ProductController::class, 'update']);

Route::get('likeProduct', [LikeProducts::class, 'allLikeProducts']);
Route::post('likeProduct', [LikeProducts::class, 'save_like']);
Route::post('searchLike', [LikeProducts::class, 'search_like']);
Route::post('deleteLikeProduct', [LikeProducts::class, 'destroy']);

Route::get('likeUser', [LikeUsers::class, 'allLikeUsers']);
Route::post('likeUser', [LikeUsers::class, 'save_like_user']);
Route::post('searchLikeUser', [LikeUsers::class, 'search_like']);
Route::post('deleteLikeUser', [LikeUsers::class, 'destroy']);

Route::get('/image/{filename}', function ($filename) {
    return response()->file(public_path('image/' . $filename));
})->name('image');

Route::post('image_upload', [FileController::class, 'fileUpload' ]);

Route::post('message', [ChatController::class, 'message']);


