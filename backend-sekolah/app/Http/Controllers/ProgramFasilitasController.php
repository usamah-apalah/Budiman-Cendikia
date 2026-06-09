<?php

namespace App\Http\Controllers;

use App\Models\ProgramFasilitas;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProgramFasilitasController extends Controller
{
    public function index(Request $request)
    {
        $query = ProgramFasilitas::query();

        if ($request->has('unit')) {
            $query->where('unit', $request->unit);
        }

        $items = $query->latest()->get();
        return response()->json($items);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'unit'      => 'required|in:sd,smp',
            'nama'      => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'ikon'      => 'nullable|string',
            'url'       => 'nullable|string|max:255',
        ]);

        $validated['slug'] = Str::slug($validated['nama']) . '-' . Str::random(5);

        $item = ProgramFasilitas::create($validated);

        return response()->json($item, 201);
    }

    public function show(ProgramFasilitas $programFasilitas)
    {
        return response()->json($programFasilitas);
    }

    public function showBySlug($slug)
    {
        $item = ProgramFasilitas::where('slug', $slug)->firstOrFail();
        return response()->json($item);
    }

    public function update(Request $request, $id)
    {
        $programFasilitas = ProgramFasilitas::findOrFail($id);

        $validated = $request->validate([
            'unit'      => 'sometimes|required|in:sd,smp',
            'nama'      => 'sometimes|required|string|max:255',
            'deskripsi' => 'nullable|string',
            'ikon'      => 'nullable|string',
            'url'       => 'nullable|string|max:255',
        ]);

        if (isset($validated['nama']) && $validated['nama'] !== $programFasilitas->nama) {
            $validated['slug'] = Str::slug($validated['nama']) . '-' . Str::random(5);
        }

        $programFasilitas->update($validated);

        return response()->json($programFasilitas);
    }

    public function destroy($id)
    {
        $item = ProgramFasilitas::findOrFail($id);
        $item->delete();

        return response()->json(['message' => 'Program/Fasilitas berhasil dihapus', 'status' => 'success']);
    }
}
