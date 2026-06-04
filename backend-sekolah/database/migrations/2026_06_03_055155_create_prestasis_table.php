<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('prestasis', function (Blueprint $table) {
            $table->id();
            $table->enum('unit', ['sd', 'smp']);
            $table->string('judul');
            $table->text('konten');
            $table->date('tanggal');
            $table->string('image')->nullable();
            $table->enum('kategori', ['siswa', 'guru', 'sekolah'])->default('siswa');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prestasis');
    }
};
