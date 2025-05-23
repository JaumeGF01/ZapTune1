<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Meta extends Model
{
    use HasFactory;
    
    protected $fillable = ['artista_id', 'titulo', 'descripcion', 'cantidad_objetivo', 'recompensa'];

    public function artista()
    {
        return $this->belongsTo(Usuario::class, 'artista_id');
    }
}