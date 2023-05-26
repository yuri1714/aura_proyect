<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'title',
        'img',
        'price',
        'description',
        'user_id',
    ];

    public function categories(){
        return $this->hasOne(Categories::class);
    }

    public function users(){
        return $this->belongsTo(Users::class);
    }

}
