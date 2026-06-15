<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ppdb extends Model
{
    use HasFactory;
    protected $table = 'ppdb';
    protected $fillable = ['unit', 'nama_lengkap', 'nisn', 'tanggal_lahir', 'jenis_kelamin', 'asal_sekolah', 'nama_ortu', 'no_hp', 'email', 'status'];
}
