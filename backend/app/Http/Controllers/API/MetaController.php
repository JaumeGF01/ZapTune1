<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Meta;
use Illuminate\Http\Request;

class MetaController extends Controller
{
    public function index()
    {
        return Meta::with('artista')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'artista_id'      => 'required|exists:usuarios,id',
            'titulo'          => 'required|string',
            'descripcion'     => 'nullable|string',
            'cantidad_objetivo'=> 'required|numeric',
            'recompensa'      => 'nullable|string',
        ]);

        $meta = Meta::create($data);
        return response()->json($meta, 201);
    }

    public function show($id)
    {
        return Meta::with('artista')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $meta = Meta::findOrFail($id);
        $meta->update($request->only(['titulo','descripcion','cantidad_objetivo','recompensa']));
        return response()->json($meta);
    }

    public function destroy($id)
    {
        Meta::destroy($id);
        return response()->noContent();
    }
}

