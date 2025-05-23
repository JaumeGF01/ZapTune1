<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('lanzamientos', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->foreignId('artista_id')->constrained('usuarios')->onDelete('cascade');
            $table->string('portada')->nullable();
            $table->enum('tipo', ['sencillo'])->default('sencillo');
            $table->string('cancion');
            $table->unsignedBigInteger('reproducciones')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('lanzamientos');
    }
};
