<?php

namespace Tests\Feature;

use App\Models\Berita;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BeritaTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_published_berita(): void
    {
        Berita::factory()->count(3)->create(['is_published' => true]);
        Berita::factory()->create(['is_published' => false]);

        $response = $this->getJson('/api/v1/berita');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    public function test_can_filter_berita_by_unit(): void
    {
        Berita::factory()->create(['unit' => 'sd', 'is_published' => true]);
        Berita::factory()->create(['unit' => 'smp', 'is_published' => true]);

        $response = $this->getJson('/api/v1/berita?unit=sd');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.unit', 'sd');
    }

    public function test_admin_can_create_berita(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/berita', [
                'unit' => 'sd',
                'judul' => 'Berita Baru',
                'konten' => 'Isi berita baru yang menarik.',
                'kategori' => 'umum',
                'is_published' => true,
            ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('berita', ['judul' => 'Berita Baru']);
    }

    public function test_guest_cannot_create_berita(): void
    {
        $response = $this->postJson('/api/v1/berita', [
            'unit' => 'sd',
            'judul' => 'Berita Guest',
            'konten' => 'Isi berita guest.',
            'kategori' => 'umum',
        ]);

        $response->assertStatus(401);
    }
}
