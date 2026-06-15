<?php

namespace Database\Factories;

use App\Models\HeadmasterProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

class HeadmasterProfileFactory extends Factory
{
    public function definition(): array
    {
        return [
            'unit' => $this->faker->unique()->randomElement(['sd', 'smp']),
            'name' => $this->faker->name,
            'greeting' => $this->faker->paragraph,
            'photo' => null,
        ];
    }
}
