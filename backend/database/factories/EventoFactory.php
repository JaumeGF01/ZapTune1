<?php

namespace Database\Factories;

use App\Models\Evento;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventoFactory extends Factory
{
    protected $model = Evento::class;

    public function definition()
    {
        return [
            'titulo'      => $this->faker->sentence(3),
            'descripcion' => $this->faker->paragraph,
            'web'         => $this->faker->url,
            'fecha'       => $this->faker->dateTimeBetween('+1 days', '+1 month'),
            'localizacion'=> $this->faker->city,
            'imagen'      => $this -> faker -> imageUrl(370, 1400, 'event'),
        ];
    }
}