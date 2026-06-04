<?php

namespace Database\Factories;

use App\Models\Berita;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Berita>
 */
class BeritaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $judul = $this->faker->sentence;
        return [
            'unit' => $this->faker->randomElement(['sd', 'smp']),
            'judul' => $judul,
            'slug' => \Illuminate\Support\Str::slug($judul) . '-' . \Illuminate\Support\Str::random(5),
            'konten' => $this->faker->paragraphs(3, true),
            'kategori' => $this->faker->randomElement(['umum', 'prestasi', 'kegiatan']),
            'thumbnail' => null,
            'is_published' => true,
        ];
    }
}
