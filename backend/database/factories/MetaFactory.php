<?php

namespace Database\Factories;

use App\Models\Meta;
use App\Models\Usuario;
use Illuminate\Database\Eloquent\Factories\Factory;

class MetaFactory extends Factory
{
    protected $model = Meta::class;

    public function definition()
    {
        $artista = Usuario::where('rol', 'artista')->inRandomOrder()->first() ?? Usuario::factory()->create(['rol' => 'artista']);

        return [
            'artista_id'         => $artista->id,
            'titulo'             => $this->faker->sentence(4),
            'descripcion'        => $this->faker->paragraph,
            'cantidad_objetivo'  => $this->faker->randomFloat(2, 50, 500),
            'recompensa'         => $this->faker->sentence(3),
        ];
    }
}
