<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $req)
    {
        $data = $req->validate([
            'nombre' => 'required|string',
            'mail'   => 'required|email|unique:usuarios,mail',
            'password' => 'required|min:6|confirmed',
            'rol'    => 'required|in:artista,oyente',
            'avatar' => 'nullable|string',
            'bio' => 'nullable|string',
        ]);

        $user = Usuario::create([
            'nombre' => $data['nombre'],
            'mail'   => $data['mail'],
            'password' => Hash::make($data['password']),
            'rol'    => $data['rol'],
            'avatar' => $data['avatar'],
            'bio' => $data['bio'],
        ]);

        $token = $user->createToken('token-mvp')->plainTextToken;
        return response()->json(['token' => $token, 'user' => $user], 201);
    }

    public function login(Request $req)
    {
        $req->validate([
            'mail'     => 'required|email',
            'password' => 'required'
        ]);

        $user = Usuario::where('mail', $req->mail)->first();
        if (! $user || ! Hash::check($req->password, $user->password)) {
            throw ValidationException::withMessages([
                'mail' => ['Credenciales inválidas.']
            ]);
        }

        // Opcional: revocar tokens anteriores
        $user->tokens()->delete();

        $token = $user->createToken('token-mvp')->plainTextToken;
        return response()->json(['token' => $token, 'user' => $user]);
    }

    public function update(Request $req)
    {
        $user = $req->user();
        $data = $req->validate([
            'nombre' => 'required|string',
            'avatar' => 'nullable|string',
            'bio' => 'nullable|string',
        ]);

        $user->nombre = $data['nombre'];
        $user->avatar = $data['avatar'];
        $user->bio = $data['bio'];
        $user->save();
        return response()->json($user);
    }

    public function logout(Request $req)
    {
        $req->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logout OK']);
    }

    public function user(Request $req)
    {
        return $req->user();
    }
}
