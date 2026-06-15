<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppService
{
    /**
     * Mengirim pesan WhatsApp menggunakan API Fonnte.
     *
     * @param string $target Nomor tujuan (misal: 081534648183)
     * @param string $message Isi pesan
     * @return bool
     */
    public function send(string $target, string $message): bool
    {
        $token = config('services.fonnte.token');

        if (!$token || $token === 'your_fonnte_api_token_here') {
            Log::warning('WhatsApp Notification skipped: Fonnte API Token is not configured.');
            return false;
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => $token,
            ])->post('https://api.fonnte.com/send', [
                'target' => $target,
                'message' => $message,
                'countryCode' => '62', // Default kode negara Indonesia
            ]);

            if ($response->successful() && json_decode($response->body())->status ?? false) {
                Log::info("WhatsApp Notification sent successfully to {$target}.");
                return true;
            }

            Log::error("WhatsApp API Error: " . $response->body());
            return false;

        } catch (\Exception $e) {
            Log::error("Failed to send WhatsApp via Fonnte: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Mengirim ringkasan pendaftaran PPDB baru ke admin.
     *
     * @param \App\Models\Ppdb $ppdb
     * @return bool
     */
    public function sendPpdbNotification($ppdb): bool
    {
        $target = config('services.fonnte.admin_number', '081534648183');

        $unitLabel = strtoupper($ppdb->unit);
        $genderLabel = $ppdb->jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan';
        
        // Format pesan ringkasan pendaftaran PPDB
        $message = "*PENDAFTARAN PPDB BARU ({$unitLabel})*\n\n";
        $message .= "Telah terdaftar calon siswa baru:\n";
        $message .= "• *Nama:* {$ppdb->nama_lengkap}\n";
        $message .= "• *NISN:* " . ($ppdb->nisn ?: '-') . "\n";
        $message .= "• *Asal Sekolah:* {$ppdb->asal_sekolah}\n";
        $message .= "• *Jenis Kelamin:* {$genderLabel}\n";
        $message .= "• *Nama Ortu/Wali:* {$ppdb->nama_ortu}\n";
        $message .= "• *No. HP:* {$ppdb->no_hp}\n";
        $message .= "• *Email:* {$ppdb->email}\n\n";
        $message .= "Silakan cek dashboard admin untuk verifikasi status berkas pendaftaran.";

        return $this->send($target, $message);
    }
}
