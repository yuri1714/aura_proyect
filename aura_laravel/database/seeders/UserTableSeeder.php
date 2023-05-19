<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user1 = \App\Models\User::create([
            'name' => 'Alejandro',
            'lastname' => 'Martinez',
            'email' => 'alejandro@gmail.com',
            'password' => 'admin777',
            'birthdate' => '2003-08-07',
            'icon' => '',
            'role' => 'admin'
        ]);
        $user1->assignRole('admin');
        
        $user2 = \App\Models\User::create([
            'name' => 'alejandro',
            'lastname' => 'lopez',
            'email' => 'yuri@gmail.com',
            'password' => 'eljuegoo',
            'birthdate' => '2000-01-01',
            'icon' => '',
            'role' => 'user'
        ]);
        $user2->assignRole('user');

        $user3 = \App\Models\User::create([
            'name' => 'pau',
            'lastname' => 'lopez',
            'email' => 'pau@gmail.com',
            'password' => 'ssecreet',
            'birthdate' => '2000-01-01',
            'icon' => '',
            'role' => 'user'
        ]);
        $user3->assignRole('user');

        $user4 = \App\Models\User::create([
            'name' => 'laura',
            'lastname' => 'mendiga',
            'email' => 'laura@gmail.com',
            'password' => 'lmendi1234',
            'birthdate' => '2000-01-01',
            'icon' => '',
            'role' => 'user'
        ]);
        $user4->assignRole('user');

        $user5 = \App\Models\User::create([
            'name' => 'jessica',
            'lastname' => 'torres',
            'email' => 'jess@gmail.com',
            'password' => 'jtorre4567',
            'birthdate' => '2000-01-01',
            'icon' => '',
            'role' => 'user'
        ]);
        $user5->assignRole('user');

    }
}
