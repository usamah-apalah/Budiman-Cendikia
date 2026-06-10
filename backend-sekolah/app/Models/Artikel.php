<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artikel extends Model
{
    use HasFactory;

    protected $fillable = [
        'unit',
        'judul',
        'slug',
        'konten',
        'thumbnail',
        'tanggal',
        'kategori',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'tanggal' => 'date',
    ];
}
