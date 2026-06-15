<?php

namespace Database\Factories;

use App\Models\ProgramFasilitas;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProgramFasilitasFactory extends Factory
{
    public function definition(): array
    {
        $nama = $this->faker->words(3, true);
        return [
            'unit' => $this->faker->randomElement(['sd', 'smp']),
            'nama' => $nama,
            'slug' => \Illuminate\Support\Str::slug($nama) . '-' . \Illuminate\Support\Str::random(5),
            'deskripsi' => $this->faker->paragraph,
            'ikon' => 'star',
            'url' => null,
        ];
    }
}
