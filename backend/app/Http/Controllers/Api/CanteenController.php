<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Canteen;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CanteenController extends Controller
{
    public function index(): JsonResponse
    {
        $canteens = Canteen::where('is_active', true)
            ->select('id', 'name', 'slug', 'image', 'open_time', 'close_time', 'rating')
            ->get()
            ->map(function ($canteen) {
                return [
                    'id' => $canteen->id,
                    'name' => $canteen->name,
                    'slug' => $canteen->slug,
                    'image' => $canteen->image_url,
                    'open_time' => $canteen->open_time->format('H:i'),
                    'close_time' => $canteen->close_time->format('H:i'),
                    'rating' => $canteen->rating,
                    'status' => $canteen->isOpen() ? 'Buka' : 'Tutup',
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $canteens,
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $canteen = Canteen::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $canteen->id,
                'name' => $canteen->name,
                'slug' => $canteen->slug,
                'description' => $canteen->description,
                'image' => $canteen->image_url,
                'address' => $canteen->address,
                'phone' => $canteen->phone,
                'open_time' => $canteen->open_time->format('H:i'),
                'close_time' => $canteen->close_time->format('H:i'),
                'rating' => $canteen->rating,
            ],
        ]);
    }
}