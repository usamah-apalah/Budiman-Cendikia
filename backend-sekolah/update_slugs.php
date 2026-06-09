<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\ProgramFasilitas;
use Illuminate\Support\Str;

$items = ProgramFasilitas::whereNull('slug')->orWhere('slug', '')->get();
foreach ($items as $item) {
    $item->slug = Str::slug($item->nama) . '-' . Str::random(5);
    $item->save();
}
echo "Slugs updated successfully.\n";
