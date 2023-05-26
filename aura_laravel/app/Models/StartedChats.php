<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StartedChats extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'user1',
        'user2',
        'updated_at',
        'created_at'
    ];
}
