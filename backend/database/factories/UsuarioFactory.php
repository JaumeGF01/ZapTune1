<?php

namespace Database\Factories;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UsuarioFactory extends Factory
{
    protected $model = Usuario::class;

    public function definition()
    {
        return [
            'nombre'   => $this->faker->name,
            'mail'     => $this->faker->unique()->safeEmail,
            'password' => Hash::make('password'),
            'bio'      => $this->faker->sentence,
            'rol'      => $this->faker->randomElement(['artista', 'oyente']),
            'avatar'   => $this -> faker -> imageUrl(200, 200, 'people'),
        ];
    }
}
