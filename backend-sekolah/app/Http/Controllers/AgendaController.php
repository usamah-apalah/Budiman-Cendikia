<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use Illuminate\Http\Request;

class AgendaController extends Controller
{
    public function index(Request $request)
    {
        $query = Agenda::query();
        if ($request->has('unit')) {
            $query->where('unit', $request->unit);
        }
        return response()->json($query->latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'unit'    => 'required|in:sd,smp',
            'judul'   => 'required|string|max:255',
            'konten'  => 'required|string',
            'tanggal' => 'required|date',
            'lokasi'  => 'nullable|string',
            'image'   => 'nullable|string',
        ]);

        $agenda = Agenda::create($validated);
        return response()->json($agenda, 201);
    }

    public function update(Request $request, Agenda $agenda)
    {
        $validated = $request->validate([
            'unit'    => 'sometimes|required|in:sd,smp',
            'judul'   => 'sometimes|required|string|max:255',
            'konten'  => 'sometimes|required|string',
            'tanggal' => 'sometimes|required|date',
            'lokasi'  => 'nullable|string',
            'image'   => 'nullable|string',
        ]);

        $agenda->update($validated);
        return response()->json($agenda);
    }

    public function destroy($id)
    {
        $deleted = Agenda::where('id', $id)->delete();
        
        if ($deleted) {
            return response()->json(['message' => 'Agenda berhasil dihapus', 'status' => 'success']);
        }
        
        return response()->json(['message' => 'Gagal menghapus atau data tidak ditemukan', 'status' => 'failed'], 404);
    }
}
