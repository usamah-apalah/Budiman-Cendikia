<?php

namespace Database\Factories;

use App\Models\Pengumuman;
use Illuminate\Database\Eloquent\Factories\Factory;

class PengumumanFactory extends Factory
{
    public function definition(): array
    {
        return [
            'unit' => $this->faker->randomElement(['sd', 'smp']),
            'tanggal' => $this->faker->date,
            'judul' => $this->faker->sentence,
            'isi' => $this->faker->paragraph,
            'image' => null,
            'target_pages' => ['home'],
            'is_aktif' => true,
            'tanggal_mulai' => $this->faker->date,
            'tanggal_selesai' => $this->faker->dateTimeBetween('+1 week', '+1 month')->format('Y-m-d'),
        ];
    }
}
