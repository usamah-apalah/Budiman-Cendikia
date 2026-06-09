<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgramFasilitas extends Model
{
    use HasFactory;

    protected $table = 'program_fasilitas';

    protected $fillable = [
        'unit',
        'nama',
        'slug',
        'deskripsi',
        'ikon',
        'url',
    ];
}
