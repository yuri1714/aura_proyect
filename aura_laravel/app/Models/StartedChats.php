<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StartedChats extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'id_user1',
        'id_user2',
    ];
}
