<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\GaleriController;
use App\Http\Controllers\PengumumanController;
use App\Http\Controllers\PpdbController;
use App\Http\Controllers\AuthController;

// Public routes (tidak perlu login)
Route::prefix('v1')->group(function () {
    Route::get('/berita', [BeritaController::class, 'index']);
    Route::get('/berita/{slug}', [BeritaController::class, 'show']);
    Route::get('/guru', [GuruController::class, 'index']);
    Route::get('/galeri', [GaleriController::class, 'index']);
    Route::get('/pengumuman', [PengumumanController::class, 'index']);

    // PPDB: siapa saja bisa daftar
    Route::post('/ppdb', [PpdbController::class, 'store']);

    // Auth
    Route::post('/login', [AuthController::class, 'login']);
});

// Protected routes (admin only)
Route::prefix('v1')->middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('berita', BeritaController::class)->except(['index', 'show']);
    Route::apiResource('guru', GuruController::class)->except(['index']);
    Route::apiResource('galeri', GaleriController::class)->except(['index']);
    Route::apiResource('pengumuman', PengumumanController::class)->except(['index']);
    Route::get('/ppdb', [PpdbController::class, 'index']);
    Route::patch('/ppdb/{id}/status', [PpdbController::class, 'updateStatus']);
});
