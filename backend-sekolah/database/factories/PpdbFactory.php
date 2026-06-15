<?php

namespace Database\Factories;

use App\Models\Ppdb;
use Illuminate\Database\Eloquent\Factories\Factory;

class PpdbFactory extends Factory
{
    public function definition(): array
    {
        return [
            'unit' => $this->faker->randomElement(['sd', 'smp']),
            'nama_lengkap' => $this->faker->name,
            'nisn' => $this->faker->numerify('##########'),
            'tanggal_lahir' => $this->faker->date,
            'jenis_kelamin' => $this->faker->randomElement(['L', 'P']),
            'asal_sekolah' => $this->faker->company,
            'nama_ortu' => $this->faker->name,
            'no_hp' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail,
            'status' => 'pending',
        ];
    }
}
