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
        Schema::create('headmaster_profiles', function (Blueprint $table) {
            $table->id();
            $table->enum('unit', ['sd', 'smp'])->unique();
            $table->string('name');
            $table->text('greeting');
            $table->string('photo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('headmaster_profiles');
    }
};
