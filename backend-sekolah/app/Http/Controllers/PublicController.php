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
        $settings = \App\Models\Setting::pluck('value', 'key');
        $logo = $settings->get('site_logo');

        return response()->json([
            'site_logo' => $logo ? asset('uploads/' . $logo) : null,
            'instagram_title' => $settings->get('instagram_title', 'Yuk, Kepoin Keseruan Kami di Instagram'),
            'instagram_description' => $settings->get('instagram_description', 'Mulai dari keseruan belajar di kelas, tawa ceria saat bermain, hingga momen-momen penuh prestasi. Semuanya kami bagikan lewat cerita harian dan galeri foto aesthetic di Instagram. Yuk, follow biar nggak ketinggalan keseruannya!'),
            'instagram_url' => $settings->get('instagram_url', 'https://www.instagram.com/sat_almanshurah/'),
            'instagram_username' => $settings->get('instagram_username', 'sat_almanshurah'),
        ]);
    }
}
