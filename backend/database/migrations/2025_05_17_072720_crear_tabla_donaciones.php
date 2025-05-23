<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('donaciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('donante_id')->constrained('usuarios')->onDelete('cascade');
            $table->foreignId('artista_id')->constrained('usuarios')->onDelete('cascade');
            $table->decimal('cantidad', 10, 2);
            $table->text('mensaje')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('donaciones');
    }
};
