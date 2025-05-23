<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\LanzamientoController;
use App\Http\Controllers\API\EventoController;
use App\Http\Controllers\API\DonacionController;
use App\Http\Controllers\API\MetaController;

Route::post('register', [AuthController::class,'register']);
Route::post('login',    [AuthController::class,'login']);

Route::get('lanzamientos/ultimos',   [LanzamientoController::class, 'ultimos']);
Route::get('lanzamientos/populares',  [LanzamientoController::class, 'populares']);
Route::post('lanzamientos/{lanzamiento}/play', [LanzamientoController::class,'play']);
Route::apiResource('lanzamientos', LanzamientoController::class)
->only(['index','show']);

Route::apiResource('eventos', EventoController::class)
->only(['index','show']);



Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class,'logout']);
    Route::get('user',   [AuthController::class,'user']);
    Route::put('user', [AuthController::class,'update']);
    
    Route::apiResource('lanzamientos', LanzamientoController::class)
    ->only(['store','update','destroy']);

    Route::apiResource('eventos', LanzamientoController::class)
    ->only(['store','update','destroy']);

});

// Route::apiResource('donaciones', DonacionController::class)
// ->only(['index','store','show','destroy']);

// Route::get('metas', MetaController::class);