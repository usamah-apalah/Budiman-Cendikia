<?php

namespace App\Http\Controllers;

use App\Models\Ppdb;
use Illuminate\Http\Request;

class PpdbController extends Controller
{
    public function index(Request $request)
    {
        $query = Ppdb::latest();
        if ($request->has('unit')) {
            $query->where('unit', $request->unit);
        }
        $ppdb = $query->paginate(10);
        return response()->json($ppdb);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'unit'            => 'required|in:sd,smp',
            'nama_lengkap'    => 'required|string|max:255',
            'nisn'            => 'nullable|string|unique:ppdb,nisn',
            'tanggal_lahir'   => 'required|date',
            'jenis_kelamin'   => 'required|in:L,P',
            'asal_sekolah'    => 'required|string',
            'nama_ortu'       => 'required|string',
            'no_hp'           => 'required|string',
            'email'           => 'required|email',
        ]);

        $ppdb = Ppdb::create($validated);

        return response()->json($ppdb, 201);
    }

    public function updateStatus(int $id, Request $request)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,diterima,ditolak',
        ]);

        $ppdb = Ppdb::findOrFail($id);
        $ppdb->update(['status' => $validated['status']]);

        return response()->json($ppdb);
    }

    public function destroy(Ppdb $ppdb)
    {
        $ppdb->delete();
        return response()->json(['message' => 'Data PPDB dihapus']);
    }
}
