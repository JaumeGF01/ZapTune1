<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Evento;
use Illuminate\Http\Request;

class EventoController extends Controller
{
    public function index()
    {
        return Evento::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'titulo'      => 'required|string',
            'descripcion' => 'nullable|string',
            'web'         => 'nullable|url',
            'fecha'       => 'required|date',
            'localizacion'=> 'nullable|string',
            'imagen'      => 'nullable|image',
        ]);

        if ($request->hasFile('imagen')) {
            $data['imagen'] = $request->file('imagen')->store('eventos', 'public');
        }

        $evento = Evento::create($data);
        return response()->json($evento, 201);
    }

    public function show($id)
    {
        return Evento::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $evento = Evento::findOrFail($id);
        $evento->update($request->only(['titulo', 'web','descripcion','fecha','localizacion']));
        return response()->json($evento);
    }

    public function destroy($id)
    {
        Evento::destroy($id);
        return response()->noContent();
    }
}
