<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guru extends Model
{
    use HasFactory;

    protected $table = 'guru';
    protected $fillable = ['unit', 'nama', 'nip', 'jabatan', 'mata_pelajaran', 'foto', 'email', 'gmail', 'whatsapp', 'is_aktif'];
}
