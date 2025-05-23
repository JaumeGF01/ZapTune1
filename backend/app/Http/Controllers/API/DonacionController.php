<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Donacion;
use Illuminate\Http\Request;

class DonacionController extends Controller
{
    public function index()
    {
        return Donacion::with(['donante','artista'])->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'donante_id' => 'required|exists:usuarios,id',
            'artista_id' => 'required|exists:usuarios,id',
            'cantidad'   => 'required|numeric',
            'mensaje'    => 'nullable|string',
        ]);

        $donacion = Donacion::create($data);
        return response()->json($donacion, 201);
    }

    public function show($id)
    {
        return Donacion::with(['donante','artista'])->findOrFail($id);
    }

    public function destroy($id)
    {
        Donacion::destroy($id);
        return response()->noContent();
    }
}
