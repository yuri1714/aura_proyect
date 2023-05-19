<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $cars = \App\Models\Categories::create([
            'name' => 'Cars',
            'description' => 'Description of cars',
        ]);
        
        $sports = \App\Models\Categories::create([
            'name' => 'Sports',
            'description' => 'Description of sports',
        ]);

        $books = \App\Models\Categories::create([
            'name' => 'Books',
            'description' => 'Description of books',
        ]);

        $series = \App\Models\Categories::create([
            'name' => 'Series',
            'description' => 'Description of series',
        ]);

        $games = \App\Models\Categories::create([
            'name' => 'Games',
            'description' => 'Description of games',
        ]);
    }
}
