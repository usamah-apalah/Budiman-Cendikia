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
        $tables = ['berita', 'guru', 'galeri', 'pengumuman', 'ppdb'];

        foreach ($tables as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->enum('unit', ['sd', 'smp'])->after('id')->index();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $tables = ['berita', 'guru', 'galeri', 'pengumuman', 'ppdb'];

        foreach ($tables as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->dropColumn('unit');
            });
        }
    }
};
