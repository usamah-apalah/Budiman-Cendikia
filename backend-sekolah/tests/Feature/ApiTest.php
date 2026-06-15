<?php

namespace Tests\Feature;

use App\Models\Agenda;
use App\Models\Artikel;
use App\Models\Berita;
use App\Models\Galeri;
use App\Models\Guru;
use App\Models\HeadmasterProfile;
use App\Models\Pengumuman;
use App\Models\Ppdb;
use App\Models\Prestasi;
use App\Models\ProgramFasilitas;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiTest extends TestCase
{
    use RefreshDatabase;

    protected $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create(['unit' => 'sd']);
    }

    /** @test */
    public function test_agenda_crud()
    {
        Agenda::factory()->count(3)->create(['unit' => 'sd']);
        
        // Index
        $response = $this->getJson('/api/v1/agenda?unit=sd');
        $response->assertStatus(200)->assertJsonCount(3);

        // Store
        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson('/api/v1/agenda', [
                'unit' => 'sd',
                'judul' => 'Agenda Baru',
                'konten' => 'Isi agenda',
                'tanggal' => '2026-07-01',
                'lokasi' => 'Sekolah',
            ]);
        $response->assertStatus(201);
        $id = $response->json('id');

        // Show
        $response = $this->getJson("/api/v1/agenda/{$id}");
        $response->assertStatus(200)->assertJson(['judul' => 'Agenda Baru']);

        // Update
        $response = $this->actingAs($this->admin, 'sanctum')
            ->putJson("/api/v1/agenda/{$id}", ['judul' => 'Agenda Updated']);
        $response->assertStatus(200);

        // Delete
        $response = $this->actingAs($this->admin, 'sanctum')
            ->deleteJson("/api/v1/agenda/{$id}");
        $response->assertStatus(200);
        $this->assertDatabaseMissing('agendas', ['id' => $id]);
    }

    /** @test */
    public function test_artikel_crud()
    {
        $artikel = Artikel::factory()->create(['unit' => 'sd', 'slug' => 'artikel-test']);

        // Index
        $response = $this->getJson('/api/v1/artikel?unit=sd');
        $response->assertStatus(200);

        // Store
        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson('/api/v1/artikel', [
                'unit' => 'sd',
                'judul' => 'Artikel Baru',
                'konten' => 'Isi artikel',
                'kategori' => 'umum',
            ]);
        $response->assertStatus(201);
        $slug = $response->json('data.slug');
        $id = $response->json('data.id');

        // Show (by slug)
        $response = $this->getJson("/api/v1/artikel/{$slug}");
        $response->assertStatus(200);

        // Update
        $response = $this->actingAs($this->admin, 'sanctum')
            ->putJson("/api/v1/artikel/{$id}", ['judul' => 'Artikel Updated']);
        $response->assertStatus(200);

        // Delete
        $response = $this->actingAs($this->admin, 'sanctum')
            ->deleteJson("/api/v1/artikel/{$id}");
        $response->assertStatus(200);
    }

    /** @test */
    public function test_berita_crud()
    {
        $berita = Berita::factory()->create(['unit' => 'sd', 'slug' => 'berita-test']);
        $slug = $berita->slug;

        // Index
        $response = $this->getJson('/api/v1/berita?unit=sd');
        $response->assertStatus(200);

        // Store
        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson('/api/v1/berita', [
                'unit' => 'sd',
                'judul' => 'Berita Baru',
                'konten' => 'Isi berita',
                'kategori' => 'umum',
                'is_published' => true,
            ]);
        $response->assertStatus(201);
        $newSlug = $response->json('slug');
        $id = $response->json('id');

        // Show (by slug)
        $response = $this->getJson("/api/v1/berita/{$newSlug}");
        $response->assertStatus(200);

        // Update
        $response = $this->actingAs($this->admin, 'sanctum')
            ->putJson("/api/v1/berita/{$id}", ['judul' => 'Berita Updated']);
        $response->assertStatus(200);

        // Delete
        $response = $this->actingAs($this->admin, 'sanctum')
            ->deleteJson("/api/v1/berita/{$id}");
        $response->assertStatus(200);
    }

    /** @test */
    public function test_guru_crud()
    {
        Guru::factory()->create(['unit' => 'sd', 'is_aktif' => true]);

        // Index
        $response = $this->getJson('/api/v1/guru?unit=sd');
        $response->assertStatus(200);

        // Store
        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson('/api/v1/guru', [
                'unit' => 'sd',
                'nama' => 'Guru Test',
                'jabatan' => 'Guru',
            ]);
        $response->assertStatus(201);
        $id = $response->json('id');

        // Show
        $response = $this->getJson("/api/v1/guru/{$id}");
        $response->assertStatus(200);

        // Update
        $response = $this->actingAs($this->admin, 'sanctum')
            ->putJson("/api/v1/guru/{$id}", ['nama' => 'Guru Updated']);
        $response->assertStatus(200);

        // Delete
        $response = $this->actingAs($this->admin, 'sanctum')
            ->deleteJson("/api/v1/guru/{$id}");
        $response->assertStatus(200);
    }

    /** @test */
    public function test_galeri_crud()
    {
        Galeri::factory()->create(['unit' => 'sd']);

        // Index
        $response = $this->getJson('/api/v1/galeri?unit=sd');
        $response->assertStatus(200);

        // Store
        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson('/api/v1/galeri', [
                'unit' => 'sd',
                'judul' => 'Galeri Baru',
                'image' => 'test.jpg',
            ]);
        $response->assertStatus(201);
        $id = $response->json('id');

        // Show
        $response = $this->getJson("/api/v1/galeri/{$id}");
        $response->assertStatus(200);

        // Update
        $response = $this->actingAs($this->admin, 'sanctum')
            ->putJson("/api/v1/galeri/{$id}", ['judul' => 'Galeri Updated']);
        $response->assertStatus(200);

        // Delete
        $response = $this->actingAs($this->admin, 'sanctum')
            ->deleteJson("/api/v1/galeri/{$id}");
        $response->assertStatus(200);
    }

    /** @test */
    public function test_headmaster_crud()
    {
        HeadmasterProfile::factory()->create(['unit' => 'sd']);

        // Show
        $response = $this->getJson('/api/v1/headmaster?unit=sd');
        $response->assertStatus(200);

        // Update
        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson('/api/v1/headmaster/update', [
                'unit' => 'sd',
                'name' => 'Kepala Sekolah Baru',
                'greeting' => 'Halo',
            ]);
        $response->assertStatus(200);
    }

    /** @test */
    public function test_pengumuman_crud()
    {
        Pengumuman::factory()->create(['unit' => 'sd', 'is_aktif' => true]);

        // Index
        $response = $this->getJson('/api/v1/pengumuman?unit=sd');
        $response->assertStatus(200);

        // Store
        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson('/api/v1/pengumuman', [
                'unit' => 'sd',
                'judul' => 'Pengumuman Baru',
                'isi' => 'Isi pengumuman',
                'tanggal_mulai' => '2026-07-01',
            ]);
        $response->assertStatus(201);
        $id = $response->json('id');

        // Show
        $response = $this->getJson("/api/v1/pengumuman/{$id}");
        $response->assertStatus(200);

        // Update
        $response = $this->actingAs($this->admin, 'sanctum')
            ->putJson("/api/v1/pengumuman/{$id}", ['judul' => 'Pengumuman Updated']);
        $response->assertStatus(200);

        // Delete
        $response = $this->actingAs($this->admin, 'sanctum')
            ->deleteJson("/api/v1/pengumuman/{$id}");
        $response->assertStatus(200);
    }

    /** @test */
    public function test_ppdb_crud()
    {
        Ppdb::factory()->count(3)->create(['unit' => 'sd']);

        // Index
        $response = $this->actingAs($this->admin, 'sanctum')
            ->getJson('/api/v1/ppdb?unit=sd');
        $response->assertStatus(200);

        // Store
        $response = $this->postJson('/api/v1/ppdb', [
            'unit' => 'sd',
            'nama_lengkap' => 'Calon Siswa',
            'tanggal_lahir' => '2019-01-01',
            'jenis_kelamin' => 'L',
            'asal_sekolah' => 'TK Test',
            'nama_ortu' => 'Ortu Test',
            'no_hp' => '08123456789',
            'email' => 'calon@example.com',
        ]);
        $response->assertStatus(201);
        $id = $response->json('id');

        // Update Status
        $response = $this->actingAs($this->admin, 'sanctum')
            ->patchJson("/api/v1/ppdb/{$id}/status", ['status' => 'diterima']);
        $response->assertStatus(200);
    }

    /** @test */
    public function test_prestasi_crud()
    {
        Prestasi::factory()->create(['unit' => 'sd']);

        // Index
        $response = $this->getJson('/api/v1/prestasi?unit=sd');
        $response->assertStatus(200);

        // Store
        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson('/api/v1/prestasi', [
                'unit' => 'sd',
                'judul' => 'Prestasi Baru',
                'konten' => 'Isi prestasi',
                'tanggal' => '2026-06-01',
                'image' => 'test.jpg',
                'kategori' => 'siswa',
                'tingkat' => 'Nasional',
            ]);
        $response->assertStatus(201);
        $id = $response->json('id');

        // Show
        $response = $this->actingAs($this->admin, 'sanctum')
            ->getJson("/api/v1/prestasi/{$id}");
        $response->assertStatus(200);

        // Update
        $response = $this->actingAs($this->admin, 'sanctum')
            ->putJson("/api/v1/prestasi/{$id}", ['judul' => 'Prestasi Updated']);
        $response->assertStatus(200);

        // Delete
        $response = $this->actingAs($this->admin, 'sanctum')
            ->deleteJson("/api/v1/prestasi/{$id}");
        $response->assertStatus(200);
    }

    /** @test */
    public function test_program_fasilitas_crud()
    {
        $item = ProgramFasilitas::factory()->create(['unit' => 'sd', 'nama' => 'Test Program']);
        $slug = \Illuminate\Support\Str::slug('Test Program') . '-'; // Slug has random suffix

        // We need the actual slug from the created item
        $slug = $item->slug;
        if (empty($slug)) {
             $item->slug = \Illuminate\Support\Str::slug('Test Program') . '-abcde';
             $item->save();
             $slug = $item->slug;
        }

        // Index
        $response = $this->getJson('/api/v1/program-fasilitas?unit=sd');
        $response->assertStatus(200);

        // Store
        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson('/api/v1/program-fasilitas', [
                'unit' => 'sd',
                'nama' => 'Program Baru',
                'deskripsi' => 'Deskripsi program',
            ]);
        $response->assertStatus(201);
        $newSlug = $response->json('slug');

        // Show (by slug)
        $response = $this->getJson("/api/v1/program-fasilitas/{$newSlug}");
        $response->assertStatus(200);

        // Update
        $id = $response->json('id');
        $response = $this->actingAs($this->admin, 'sanctum')
            ->putJson("/api/v1/program-fasilitas/{$id}", ['nama' => 'Program Updated']);
        $response->assertStatus(200);

        // Delete
        $response = $this->actingAs($this->admin, 'sanctum')
            ->deleteJson("/api/v1/program-fasilitas/{$id}");
        $response->assertStatus(200);
    }

    /** @test */
    public function test_stats()
    {
        $response = $this->getJson('/api/v1/stats?unit=sd');
        $response->assertStatus(200);
    }
}
