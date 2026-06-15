<?php

namespace Database\Factories;

use App\Models\Galeri;
use Illuminate\Database\Eloquent\Factories\Factory;

class GaleriFactory extends Factory
{
    public function definition(): array
    {
        return [
            'unit' => $this->faker->randomElement(['sd', 'smp']),
            'tanggal' => $this->faker->date,
            'judul' => $this->faker->sentence,
            'image' => 'https://via.placeholder.com/640x480.png',
            'deskripsi' => $this->faker->paragraph,
        ];
    }
}
