<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminProfileController extends Controller
{
    public function edit()
    {
        // Mendapatkan user yang sedang login, atau default ke user pertama di DB untuk keperluan pengujian lokal
        $user = Auth::user() ?? User::first();

        if (!$user) {
            return redirect()->back()->with('error', 'User admin tidak ditemukan.');
        }

        return view('admin.profile.edit', compact('user'));
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
}
