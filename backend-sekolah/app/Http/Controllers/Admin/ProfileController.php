<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function edit()
    {
        $user = Auth::user() ?? User::first();

        if (!$user) {
            return redirect()->back()->with('error', 'User admin tidak ditemukan.');
        }

        return view('admin.profile', compact('user'));
    }

    public function update(Request $request)
    {
        $user = Auth::user() ?? User::first();

        if (!$user) {
            return redirect()->back()->with('error', 'User admin tidak ditemukan.');
        }

        $validated = $request->validate([
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
        ], [
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email sudah digunakan oleh user lain.',
            'password.min' => 'Password minimal harus 8 karakter.',
            'password.confirmed' => 'Konfirmasi password tidak cocok dengan password baru.',
        ]);

        $user->email = $validated['email'];

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return redirect()->back()->with('success', 'Profil admin berhasil diperbarui dengan aman!');
    }

    public function updateLogo(Request $request)
    {
        $request->validate([
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ], [
            'logo.required' => 'File logo wajib dipilih.',
            'logo.image' => 'Logo harus berupa gambar.',
            'logo.mimes' => 'Format gambar harus jpeg, png, jpg, gif, atau svg.',
            'logo.max' => 'Ukuran logo maksimal 2MB.',
        ]);

        if ($request->hasFile('logo')) {
            Storage::disk('public')->putFileAs('', $request->file('logo'), 'logo.png');

            return redirect()->back()->with('success', 'Logo sekolah berhasil diperbarui!');
        }

        return redirect()->back()->with('error', 'Gagal mengunggah logo.');
    }
}
