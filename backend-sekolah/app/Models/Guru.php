<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Guru extends Model
{
    protected $table = 'guru';
    protected $fillable = ['unit', 'nama', 'nip', 'jabatan', 'mata_pelajaran', 'foto', 'email', 'is_aktif'];
}
