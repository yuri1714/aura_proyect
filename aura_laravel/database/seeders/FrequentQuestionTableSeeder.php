<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class FrequentQuestionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $question1 = \App\Models\FrequentQuestions::create([
            'question' => 'How can i deport a suspicious activity?',
            'answer' => 'For deport a suspicious activity you can send us a form at the footer of the website.',
        ]);
        
        $question2 = \App\Models\FrequentQuestions::create([
            'question' => 'How can i deport a suspicious activity?',
            'answer' => 'For deport a suspicious activity you can send us a form at the footer of the website.',
        ]);

        $question3 = \App\Models\FrequentQuestions::create([
            'question' => 'How can i deport a suspicious activity?',
            'answer' => 'For deport a suspicious activity you can send us a form at the footer of the website.',
        ]);

        $question4 = \App\Models\FrequentQuestions::create([
            'question' => 'How can i deport a suspicious activity?',
            'answer' => 'For deport a suspicious activity you can send us a form at the footer of the website.',
        ]);

        $question5 = \App\Models\FrequentQuestions::create([
            'question' => 'How can i deport a suspicious activity?',
            'answer' => 'For deport a suspicious activity you can send us a form at the footer of the website.',
        ]);
    }
}
