<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HeadmasterController;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\AgendaController;
use App\Http\Controllers\PrestasiController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\SettingController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin/headmaster', [HeadmasterController::class, 'edit'])->name('headmaster.edit');
Route::post('/admin/headmaster/update', [HeadmasterController::class, 'update'])->name('headmaster.update');

// Web Admin Routes for Guru
Route::get('/admin/{unit}/guru', [GuruController::class, 'indexWeb'])->name('guru.index');
Route::get('/admin/guru/{id}/edit', [GuruController::class, 'editWeb'])->name('guru.edit');
Route::put('/admin/guru/{id}/update', [GuruController::class, 'updateWeb'])->name('guru.update');

// Web Admin Routes for Agenda
Route::get('/admin/{unit}/agenda', [AgendaController::class, 'indexWeb'])->name('agenda.index');
Route::get('/admin/agenda/{id}/edit', [AgendaController::class, 'editWeb'])->name('agenda.edit');
Route::put('/admin/agenda/{id}/update', [AgendaController::class, 'updateWeb'])->name('agenda.update');

// Web Admin Routes for Prestasi
Route::get('/admin/{unit}/prestasi', [PrestasiController::class, 'indexWeb'])->name('prestasi.index');
Route::get('/admin/prestasi/{id}/edit', [PrestasiController::class, 'editWeb'])->name('prestasi.edit');
Route::put('/admin/prestasi/{id}/update', [PrestasiController::class, 'updateWeb'])->name('prestasi.update');

// Web Admin Routes for Admin Profile / Security
Route::get('/admin/profile', [ProfileController::class, 'edit'])->name('admin.profile.edit');
Route::put('/admin/profile/update', [ProfileController::class, 'update'])->name('admin.profile.update');
Route::post('/admin/profile/logo', [ProfileController::class, 'updateLogo'])->name('admin.profile.logo');

// Web Admin Routes for Website Settings (Ubah Logo)
Route::get('/admin/settings', [SettingController::class, 'edit'])->name('admin.settings.edit');
Route::post('/admin/settings/logo/update', [SettingController::class, 'updateLogo'])->name('admin.settings.updateLogo');
Route::post('/admin/settings/instagram/update', [SettingController::class, 'updateInstagram'])->name('admin.settings.updateInstagram');


