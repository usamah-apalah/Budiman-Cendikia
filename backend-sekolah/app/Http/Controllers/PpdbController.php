<?php

namespace App\Http\Controllers;

use App\Models\Ppdb;
use Illuminate\Http\Request;
use App\Mail\NewRegistrationMail;
use App\Services\WhatsAppService;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class PpdbController extends Controller
{
    public function index(Request $request)
    {
        $query = Ppdb::latest();
        if ($request->has('unit')) {
            $query->where('unit', $request->unit);
        }
        $ppdb = $query->paginate(10);
        return response()->json($ppdb);
    }

    public function store(Request $request, WhatsAppService $whatsAppService)
    {
        $validated = $request->validate([
            'unit'            => 'required|in:sd,smp',
            'nama_lengkap'    => 'required|string|max:255',
            'nisn'            => 'nullable|string|unique:ppdb,nisn',
            'tanggal_lahir'   => 'required|date',
            'jenis_kelamin'   => 'required|in:L,P',
            'asal_sekolah'    => 'required|string',
            'nama_ortu'       => 'required|string',
            'no_hp'           => 'required|string',
            'email'           => 'required|email',
        ]);

        $ppdb = Ppdb::create($validated);

        // Kirim Notifikasi (Email & WhatsApp)
        try {
            // Kirim Email
            $recipientEmail = config('mail.ppdb_notification_email', 'budimancendikia304@gmail.com');
            Mail::to($recipientEmail)->send(new NewRegistrationMail($ppdb));
        } catch (\Throwable $e) {
            Log::error("Gagal mengirim email PPDB untuk {$ppdb->nama_lengkap}: " . $e->getMessage(), [
                'exception' => $e
            ]);
        }

        try {
            // Kirim WhatsApp
            $whatsAppService->sendPpdbNotification($ppdb);
        } catch (\Throwable $e) {
            Log::error("Gagal mengirim WhatsApp PPDB untuk {$ppdb->nama_lengkap}: " . $e->getMessage(), [
                'exception' => $e
            ]);
        }

        return response()->json($ppdb, 201);
    }

    public function updateStatus(int $id, Request $request)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,diterima,ditolak',
        ]);

        $ppdb = Ppdb::findOrFail($id);
        $ppdb->update(['status' => $validated['status']]);

        return response()->json($ppdb);
    }

    public function destroy(Ppdb $ppdb)
    {
        $ppdb->delete();
        return response()->json(['message' => 'Data PPDB dihapus']);
    }
}
