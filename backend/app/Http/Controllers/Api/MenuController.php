<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Canteen;
use App\Models\Menu;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index(Request $request, string $canteenSlug): JsonResponse
    {
        $canteen = Canteen::where('slug', $canteenSlug)->firstOrFail();

        $query = Menu::where('canteen_id', $canteen->id)
            ->where('is_available', true)
            ->with('category');

        if ($request->has('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->has('type')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('type', $request->type);
            });
        }

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $menus = $query->get()->map(function ($menu) {
            return [
                'id' => $menu->id,
                'name' => $menu->name,
                'slug' => $menu->slug,
                'description' => $menu->description,
                'price' => $menu->price,
                'formatted_price' => $menu->formatted_price,
                'image' => $menu->image_url,
                'category' => [
                    'id' => $menu->category->id,
                    'name' => $menu->category->name,
                    'type' => $menu->category->type,
                ],
                'is_best_seller' => $menu->is_best_seller,
                'stock' => $menu->stock,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => [
                'canteen' => [
                    'id' => $canteen->id,
                    'name' => $canteen->name,
                ],
                'menus' => $menus,
            ],
        ]);
    }

    public function show(string $canteenSlug, string $menuSlug): JsonResponse
    {
        $canteen = Canteen::where('slug', $canteenSlug)->firstOrFail();

        $menu = Menu::where('canteen_id', $canteen->id)
            ->where('slug', $menuSlug)
            ->with('category', 'canteen')
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $menu->id,
                'name' => $menu->name,
                'slug' => $menu->slug,
                'description' => $menu->description,
                'price' => $menu->price,
                'formatted_price' => $menu->formatted_price,
                'image' => $menu->image_url,
                'category' => [
                    'id' => $menu->category->id,
                    'name' => $menu->category->name,
                    'type' => $menu->category->type,
                ],
                'canteen' => [
                    'id' => $menu->canteen->id,
                    'name' => $menu->canteen->name,
                ],
                'is_best_seller' => $menu->is_best_seller,
                'stock' => $menu->stock,
            ],
        ]);
    }

    public function categories(): JsonResponse
    {
        $categories = \App\Models\Category::all()->map(function ($cat) {
            return [
                'id' => $cat->id,
                'name' => $cat->name,
                'slug' => $cat->slug,
                'type' => $cat->type,
                'icon' => $cat->icon,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }
}