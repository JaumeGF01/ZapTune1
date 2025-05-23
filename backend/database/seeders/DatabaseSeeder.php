<?php

namespace Database\Seeders;
use App\Models\Usuario;
use App\Models\Lanzamiento;
use App\Models\Evento;
use App\Models\Donacion;
use App\Models\Meta;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Crear usuarios de prueba
        Usuario::factory()->count(10)->create();

        // Crear lanzamientos asociados a artistas existentes
        Lanzamiento::factory()->count(20)->create();

        // Crear eventos
        Evento::factory()->count(5)->create();

        // Crear donaciones
        Donacion::factory()->count(15)->create();

        // Crear metas
        Meta::factory()->count(8)->create();
    }
}