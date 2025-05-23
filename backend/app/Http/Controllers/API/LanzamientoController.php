<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Lanzamiento;
use Illuminate\Http\Request;

class LanzamientoController extends Controller
{
    public function index()
    {
        return Lanzamiento::with('artista')->get();
    }

    public function store(Request $request)
    {
        if (!$request->user()) {
            return response()->json(['message' => 'No autenticado'], 401);
        }
        $data = $request->validate([
            'titulo'     => 'required|string',
            'portada'    => 'nullable|image',
            'tipo'       => 'required|in:sencillo',
            'cancion'    => 'required|mimes:mp3,wav|max:20480',
        ]);

        $data['artista_id'] = $request->user()->id;

        if ($request->hasFile('portada')) {
            $data['portada'] = $request->file('portada')->store('portadas', 'public');
        }

        if ($request->hasFile('cancion')) {
            $data['cancion'] = $request->file('cancion')->store('canciones', 'public');
        }

        $lanzamiento = Lanzamiento::create($data);
        return response()->json($lanzamiento, 201);
    }

    public function show($id){
        return Lanzamiento::with('artista')->findOrFail($id);
    }

    public function ultimos(){
        return Lanzamiento::with('artista')->orderBy('created_at', 'desc')->take(5)->get();
    }
    public function populares(){
        return Lanzamiento::with('artista')->orderBy('reproducciones', 'desc')->take(5)->get();
    }

    public function update(Request $request, $id)
    {
        $lanz = Lanzamiento::findOrFail($id);
        $data = $request->validate([
            'tipo' => 'required|in:sencillo',
        ]);
        $lanz->update($data);
        return response()->json($lanz);
    }

    /**
     * Elimina un lanzamiento.
     */
    public function destroy($id)
    {
        Lanzamiento::destroy($id);
        return response()->noContent();
    }
}
