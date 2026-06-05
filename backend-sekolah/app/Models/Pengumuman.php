<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengumuman extends Model
{
    protected $table = 'pengumuman';
    protected $fillable = ['unit', 'tanggal', 'judul', 'isi', 'image', 'is_aktif', 'tanggal_mulai', 'tanggal_selesai'];
}
