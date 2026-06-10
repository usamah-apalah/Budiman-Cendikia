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
        Schema::create('artikels', function (Blueprint $table) {
            $table->id();
            $table->enum('unit', ['sd', 'smp'])->index();
            $table->string('judul');
            $table->string('slug')->unique();
            $table->text('konten');
            $table->string('thumbnail')->nullable();
            $table->date('tanggal')->nullable();
            $table->string('kategori')->default('umum'); // umum, tips, edukasi
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('artikels');
    }
};
