<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Lanzamiento extends Model
{
    use HasFactory;
    protected $fillable = ['titulo', 'artista_id', 'portada', 'tipo', 'cancion', 'reproducciones'];

    public function artista()
    {
        return $this->belongsTo(Usuario::class, 'artista_id');
    }
}
