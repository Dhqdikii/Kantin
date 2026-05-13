<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'canteen_id',
        'category_id',
        'name',
        'slug',
        'description',
        'price',
        'image',
        'is_available',
        'is_best_seller',
        'stock',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'integer',
            'is_available' => 'boolean',
            'is_best_seller' => 'boolean',
            'stock' => 'integer',
        ];
    }

    public function canteen()
    {
        return $this->belongsTo(Canteen::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : asset('images/default-food.jpg');
    }

    public function getFormattedPriceAttribute()
    {
        return 'Rp' . number_format($this->price, 0, ',', '.');
    }
}