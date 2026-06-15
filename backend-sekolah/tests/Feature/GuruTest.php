<?php

namespace Tests\Feature;

use App\Models\Guru;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GuruTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_guru(): void
    {
        Guru::factory()->count(5)->create(['unit' => 'sd', 'is_aktif' => true]);

        $response = $this->getJson('/api/v1/guru?unit=sd');

        $response->assertStatus(200)
            ->assertJsonCount(5);
    }

    public function test_admin_can_add_guru(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/guru', [
                'unit' => 'sd',
                'nama' => 'Guru Baru',
                'jabatan' => 'Wali Kelas',
                'mata_pelajaran' => 'Matematika',
            ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('guru', ['nama' => 'Guru Baru']);
    }
}
