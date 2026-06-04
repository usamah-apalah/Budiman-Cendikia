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
        Schema::table('galeri', function (Blueprint $table) {
            $table->dropColumn(['file', 'tipe', 'kategori']);
            $table->string('image')->after('judul');
            $table->text('deskripsi')->nullable()->after('image');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('galeri', function (Blueprint $table) {
            $table->dropColumn(['image', 'deskripsi']);
            $table->string('file');
            $table->enum('tipe', ['foto', 'video'])->default('foto');
            $table->string('kategori')->nullable();
        });
    }
};
