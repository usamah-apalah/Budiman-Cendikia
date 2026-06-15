<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeadmasterProfile extends Model
{
    use HasFactory;
    protected $table = 'headmaster_profiles';

    protected $fillable = ['unit', 'name', 'greeting', 'photo'];
}
