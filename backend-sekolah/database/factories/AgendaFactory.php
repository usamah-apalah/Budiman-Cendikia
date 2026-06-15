<?php

namespace Database\Factories;

use App\Models\Agenda;
use Illuminate\Database\Eloquent\Factories\Factory;

class AgendaFactory extends Factory
{
    public function definition(): array
    {
        return [
            'unit' => $this->faker->randomElement(['sd', 'smp']),
            'judul' => $this->faker->sentence,
            'konten' => $this->faker->paragraph,
            'tanggal' => $this->faker->date,
            'lokasi' => $this->faker->address,
        ];
    }
}
