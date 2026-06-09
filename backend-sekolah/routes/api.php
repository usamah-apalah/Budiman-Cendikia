<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\GaleriController;
use App\Http\Controllers\PengumumanController;
use App\Http\Controllers\PpdbController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AgendaController;
use App\Http\Controllers\PrestasiController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\ProgramFasilitasController;

use App\Http\Controllers\PublicController;

// Public routes (tidak perlu login)
Route::prefix('v1')->group(function () {
    Route::get('/stats', [PublicController::class, 'getStats']);
    Route::post('/upload', [UploadController::class, 'upload']);
    Route::get('/berita', [BeritaController::class, 'index']);
    Route::get('/berita/{slug}', [BeritaController::class, 'show']);
    Route::get('/guru', [GuruController::class, 'index']);
    Route::get('/galeri', [GaleriController::class, 'index']);
    Route::get('/pengumuman', [PengumumanController::class, 'index']);
    Route::get('/pengumuman/{pengumuman}', [PengumumanController::class, 'show']);
    Route::get('/agenda', [AgendaController::class, 'index']);
    Route::get('/prestasi', [PrestasiController::class, 'index']);
    Route::get('/program-fasilitas', [ProgramFasilitasController::class, 'index']);
    Route::get('/program-fasilitas/{slug}', [ProgramFasilitasController::class, 'showBySlug']);

    // PPDB: siapa saja bisa daftar
    Route::post('/ppdb', [PpdbController::class, 'store']);

    // Auth
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});

// Protected routes (admin only)
Route::prefix('v1')->middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('berita', BeritaController::class)->parameters(['berita' => 'berita'])->except(['index', 'show']);
    Route::apiResource('guru', GuruController::class)->except(['index']);
    Route::apiResource('galeri', GaleriController::class)->except(['index']);
    Route::apiResource('pengumuman', PengumumanController::class)->except(['index', 'show']);
    Route::apiResource('agenda', AgendaController::class)->except(['index']);
    Route::apiResource('prestasi', PrestasiController::class)->except(['index']);
    Route::apiResource('program-fasilitas', ProgramFasilitasController::class)->except(['index']);
    Route::get('/ppdb', [PpdbController::class, 'index']);
    Route::patch('/ppdb/{id}/status', [PpdbController::class, 'updateStatus']);
});
