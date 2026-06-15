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
        $tables = ['berita', 'pengumuman', 'galeri'];

        foreach ($tables as $table) {
            if (Schema::hasTable($table) && !Schema::hasColumn($table, 'tanggal')) {
                Schema::table($table, function (Blueprint $table) {
                    $table->date('tanggal')->nullable()->after('unit');
                });
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $tables = ['berita', 'pengumuman', 'galeri'];

        foreach ($tables as $table) {
            if (Schema::hasTable($table) && Schema::hasColumn($table, 'tanggal')) {
                Schema::table($table, function (Blueprint $table) {
                    $table->dropColumn('tanggal');
                });
            }
        }
    }
};
