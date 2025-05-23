<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use Notifiable, HasFactory, HasApiTokens;

    protected $table = 'usuarios';

    protected $fillable = ['nombre', 'mail', 'password', 'bio', 'rol', 'avatar'];

    protected $hidden = ['password', 'remember_token'];

    public function lanzamientos()
    {
        return $this->hasMany(Lanzamiento::class, 'artista_id');
    }

    public function donacionesRecibidas()
    {
        return $this->hasMany(Donacion::class, 'artista_id');
    }

    public function donacionesRealizadas()
    {
        return $this->hasMany(Donacion::class, 'donante_id');
    }
}