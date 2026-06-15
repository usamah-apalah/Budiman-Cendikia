<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Berita;
use App\Models\Guru;
use App\Models\Agenda;
use App\Models\Ppdb;
use App\Models\Prestasi;

class PublicController extends Controller
{
    public function getStats(Request $request)
    {
        $unit = $request->query('unit');

        $query = function($model) use ($unit) {
            if ($unit) {
                return $model::where('unit', $unit);
            }
            return $model::query();
        };

        return response()->json([
            'status' => 'success',
            'data' => [
                'berita' => $query(Berita::class)->where('is_published', true)->count(),
                'guru' => $query(Guru::class)->count(),
                'agenda' => $query(Agenda::class)->count(),
                'ppdb' => $query(Ppdb::class)->count(),
                'prestasi' => $query(Prestasi::class)->count(),
                'siswa' => 0, // No Siswa model yet, set to 0 to avoid hardcoded values
            ]
        ]);
    }

    public function getSettings()
    {
        $logo = \App\Models\Setting::where('key', 'site_logo')->value('value');
        return response()->json([
            'site_logo' => $logo ? asset('uploads/' . $logo) : null
        ]);
    }
}
