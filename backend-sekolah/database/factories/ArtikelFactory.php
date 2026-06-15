<?php

namespace Database\Factories;

use App\Models\Artikel;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ArtikelFactory extends Factory
{
    public function definition(): array
    {
        $judul = $this->faker->sentence;
        return [
            'unit' => $this->faker->randomElement(['sd', 'smp']),
            'judul' => $judul,
            'slug' => Str::slug($judul) . '-' . Str::random(5),
            'konten' => $this->faker->paragraphs(3, true),
            'thumbnail' => null,
            'tanggal' => $this->faker->date,
            'kategori' => $this->faker->randomElement(['umum', 'tips', 'edukasi']),
            'is_published' => true,
        ];
    }
}
