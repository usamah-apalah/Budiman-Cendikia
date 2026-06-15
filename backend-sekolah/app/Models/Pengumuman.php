<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengumuman extends Model
{
    use HasFactory;
    protected $table = 'pengumuman';
    protected $fillable = ['unit', 'tanggal', 'judul', 'isi', 'image', 'target_pages', 'is_aktif', 'tanggal_mulai', 'tanggal_selesai'];

    protected $casts = [
        'target_pages' => 'array',
        'is_aktif' => 'boolean',
    ];
}
