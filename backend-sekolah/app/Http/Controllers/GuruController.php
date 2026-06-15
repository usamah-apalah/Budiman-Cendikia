<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use Illuminate\Http\Request;

class GuruController extends Controller
{
    public function index(Request $request)
    {
        try {
            // Validasi parameter query unit atau unit_sekolah secara aman
            $validated = $request->validate([
                'unit' => 'nullable|string|in:sd,smp,SD,SMP',
                'unit_sekolah' => 'nullable|string|in:sd,smp,SD,SMP',
            ]);

            // Dapatkan value unit dari salah satu parameter yang tersedia
            $unitVal = $validated['unit'] ?? $validated['unit_sekolah'] ?? null;

            if (empty($unitVal)) {
                return response()->json([
                    'error' => 'Validasi gagal. Parameter unit (sd/smp) wajib diisi.',
                ], 422);
            }

            // Normalisasi unit ke lowercase agar sesuai dengan database enum ('sd', 'smp')
            $unit = strtolower($unitVal);

            // Mengambil guru yang terdaftar pada unit yang bersangkutan dan berstatus aktif
            $guruList = Guru::where('unit', $unit)
                            ->where('is_aktif', true)
                            ->get();

            // Mengembalikan format array langsung agar tidak merusak frontend yang ada
            return response()->json($guruList);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Validasi gagal. Parameter unit atau unit_sekolah (sd/smp) wajib diisi.',
                'messages' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error("GuruController@index error: " . $e->getMessage());
            return response()->json(['error' => 'Terjadi kesalahan pada server'], 500);
        }
    }

    public function show($id)
    {
        try {
            // Cari data guru berdasarkan id dan pastikan statusnya aktif
            $guru = Guru::where('id', $id)->where('is_aktif', true)->first();

            if (!$guru) {
                return response()->json([
                    'error' => 'Data guru tidak ditemukan atau tidak aktif.'
                ], 404);
            }

            return response()->json($guru);
        } catch (\Exception $e) {
            \Log::error("GuruController@show error: " . $e->getMessage());
            return response()->json(['error' => 'Terjadi kesalahan pada server'], 500);
        }
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
            'gmail'          => 'nullable|string',
            'whatsapp'       => 'nullable|string',
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
            'gmail'          => 'nullable|string',
            'whatsapp'       => 'nullable|string',
            'is_aktif'       => 'boolean',
        ]);

        $guru->update($validated);
        return response()->json($guru);
    }

    public function destroy($id)
    {
        $deleted = Guru::where('id', $id)->delete();
        
        if ($deleted) {
            return response()->json(['message' => 'Data guru berhasil dihapus', 'status' => 'success']);
        }
        
        return response()->json(['message' => 'Gagal menghapus atau data tidak ditemukan', 'status' => 'failed'], 404);
    }

    public function indexWeb($unit)
    {
        $guru = Guru::where('unit', $unit)->get();
        return view('admin.guru.index', compact('guru', 'unit'));
    }

    public function editWeb($id)
    {
        $guru = Guru::findOrFail($id);
        $unit = $guru->unit;
        return view('admin.guru.edit', compact('guru', 'unit'));
    }

    public function updateWeb(Request $request, $id)
    {
        $guru = Guru::findOrFail($id);
        $validated = $request->validate([
            'nama'           => 'required|string|max:255',
            'nip'            => 'nullable|string',
            'jabatan'        => 'required|string',
            'mata_pelajaran' => 'nullable|string',
            'gmail'          => 'nullable|string',
            'whatsapp'       => 'nullable|string',
        ]);

        $guru->update($validated);

        return redirect()->route('guru.index', $guru->unit)->with('success', 'Data guru berhasil diperbarui!');
    }
}

