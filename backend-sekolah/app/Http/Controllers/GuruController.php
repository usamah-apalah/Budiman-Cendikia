<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use Illuminate\Http\Request;

class GuruController extends Controller
{
    public function index(Request $request)
    {
        $query = Guru::query();
        if ($request->has('unit')) {
            $query->where('unit', $request->unit);
        }
        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'unit'           => 'required|in:sd,smp',
            'nama'           => 'required|string|max:255',
            'nip'            => 'nullable|string',
            'jabatan'        => 'required|string',
            'mata_pelajaran' => 'nullable|string',
            'foto'           => 'nullable|string',
            'email'          => 'nullable|email',
        ]);

        $guru = Guru::create($validated);
        return response()->json($guru, 201);
    }

    public function update(Request $request, Guru $guru)
    {
        $validated = $request->validate([
            'unit'           => 'sometimes|required|in:sd,smp',
            'nama'           => 'sometimes|required|string|max:255',
            'nip'            => 'nullable|string',
            'jabatan'        => 'sometimes|required|string',
            'mata_pelajaran' => 'nullable|string',
            'foto'           => 'nullable|string',
            'email'          => 'nullable|email',
            'is_aktif'       => 'boolean',
        ]);

        $guru->update($validated);
        return response()->json($guru);
    }

    public function destroy(Guru $guru)
    {
        $guru->delete();
        return response()->json(['message' => 'Data guru berhasil dihapus']);
    }
}
