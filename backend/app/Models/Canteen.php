<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Canteen extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'image',
        'address',
        'phone',
        'open_time',
        'close_time',
        'is_active',
        'rating',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'rating' => 'decimal:1',
            'open_time' => 'datetime:H:i',
            'close_time' => 'datetime:H:i',
        ];
    }

    public function menus()
    {
        return $this->hasMany(Menu::class);
    }

    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : asset('images/default-canteen.jpg');
    }
}