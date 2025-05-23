<?php

namespace Database\Factories;

use App\Models\Donacion;
use App\Models\Usuario;
use Illuminate\Database\Eloquent\Factories\Factory;

class DonacionFactory extends Factory
{
    protected $model = Donacion::class;

    public function definition()
    {
        $donante = Usuario::where('rol', 'oyente')->inRandomOrder()->first() ?? Usuario::factory()->create(['rol' => 'oyente']);
        $artista = Usuario::where('rol', 'artista')->inRandomOrder()->first() ?? Usuario::factory()->create(['rol' => 'artista']);

        return [
            'donante_id' => $donante->id,
            'artista_id' => $artista->id,
            'cantidad'   => $this->faker->randomFloat(2, 1, 100),
            'mensaje'    => $this->faker->sentence,
        ];
    }
}
