<?php

namespace Database\Factories;

use App\Models\Lanzamiento;
use App\Models\Usuario;
use Illuminate\Database\Eloquent\Factories\Factory;

class LanzamientoFactory extends Factory
{
    protected $model = Lanzamiento::class;

    public function definition()
    {
        // Obtener o crear un artista
        $artista = Usuario::where('rol', 'artista')->inRandomOrder()->first() ?? Usuario::factory()->create(['rol' => 'artista']);

        return [
            'titulo'         => $this->faker->sentence(2),
            'artista_id'     => $artista->id,
            'portada'        => $this -> faker -> imageUrl(200, 200, 'song'),
            'tipo'           => 'sencillo',
            'cancion'        => $this -> faker -> text(50),
            'reproducciones' => $this->faker->numberBetween(0, 1000),
        ];
    }
}