<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Donacion extends Model
{
    use HasFactory;
    protected $fillable = ['donante_id', 'artista_id', 'cantidad', 'mensaje'];
    protected $table = 'donaciones';
    public function donante()
    {
        return $this->belongsTo(Usuario::class, 'donante_id');
    }

    public function artista()
    {
        return $this->belongsTo(Usuario::class, 'artista_id');
    }
}