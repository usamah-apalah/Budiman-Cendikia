<?php

namespace Database\Factories;

use App\Models\Prestasi;
use Illuminate\Database\Eloquent\Factories\Factory;

class PrestasiFactory extends Factory
{
    public function definition(): array
    {
        return [
            'unit' => $this->faker->randomElement(['sd', 'smp']),
            'judul' => $this->faker->sentence,
            'konten' => $this->faker->paragraph,
            'tanggal' => $this->faker->date,
            'image' => 'test.jpg',
            'kategori' => $this->faker->randomElement(['siswa', 'guru', 'sekolah']),
            'tingkat' => $this->faker->randomElement(['Lokal', 'Nasional', 'Internasional']),
        ];
    }
}
