<?php

namespace App\Http\Controllers;

use App\Models\Ppdb;
use Illuminate\Http\Request;

class PpdbController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ppdb = Ppdb::latest()->paginate(10);
        return response()->json($ppdb);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_lengkap'    => 'required|string|max:255',
            'nisn'            => 'nullable|string|unique:ppdb,nisn',
            'tanggal_lahir'   => 'required|date',
            'jenis_kelamin'   => 'required|in:L,P',
            'asal_sekolah'    => 'required|string',
            'nama_ortu'       => 'required|string',
            'no_hp'           => 'required|string',
            'email'           => 'required|email',
            'jenjang'         => 'required|in:sd,smp', // Tambahan untuk membedakan dashboard
        ]);

        $ppdb = Ppdb::create($validated);

        return response()->json($ppdb, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Ppdb $ppdb)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ppdb $ppdb)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ppdb $ppdb)
    {
        //
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
}
