<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Canteen;
use App\Models\Menu;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index(): JsonResponse
    {
        $carts = Cart::where('user_id', Auth::id())
            ->with(['menu', 'canteen'])
            ->get();

        $grouped = $carts->groupBy('canteen_id')->map(function ($items, $canteenId) {
            $canteen = $items->first()->canteen;
            return [
                'canteen' => [
                    'id' => $canteen->id,
                    'name' => $canteen->name,
                    'slug' => $canteen->slug,
                ],
                'items' => $items->map(function ($cart) {
                    return [
                        'id' => $cart->id,
                        'menu' => [
                            'id' => $cart->menu->id,
                            'name' => $cart->menu->name,
                            'price' => $cart->menu->price,
                            'formatted_price' => $cart->menu->formatted_price,
                            'image' => $cart->menu->image_url,
                        ],
                        'quantity' => $cart->quantity,
                        'notes' => $cart->notes,
                        'subtotal' => $cart->subtotal,
                    ];
                }),
                'subtotal' => $items->sum('subtotal'),
            ];
        })->values();

        $total = $carts->sum('subtotal');
        $tax = round($total * 0.1);
        $grandTotal = $total + $tax;

        return response()->json([
            'success' => true,
            'data' => [
                'carts' => $grouped,
                'summary' => [
                    'subtotal' => $total,
                    'tax' => $tax,
                    'total' => $grandTotal,
                    'formatted_subtotal' => 'Rp' . number_format($total, 0, ',', '.'),
                    'formatted_tax' => 'Rp' . number_format($tax, 0, ',', '.'),
                    'formatted_total' => 'Rp' . number_format($grandTotal, 0, ',', '.'),
                ],
            ],
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'canteen_id' => 'required|exists:canteens,id',
            'menu_id' => 'required|exists:menus,id',
            'quantity' => 'required|integer|min:1',
            'notes' => 'nullable|string|max:255',
        ]);

        $menu = Menu::findOrFail($validated['menu_id']);

        if ($menu->stock < $validated['quantity']) {
            return response()->json([
                'success' => false,
                'message' => 'Stok tidak mencukupi',
            ], 400);
        }

        $cart = Cart::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'menu_id' => $validated['menu_id'],
            ],
            [
                'canteen_id' => $validated['canteen_id'],
                'quantity' => $validated['quantity'],
                'notes' => $validated['notes'] ?? null,
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Item berhasil ditambahkan ke keranjang',
            'data' => $cart,
        ]);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
            'notes' => 'nullable|string|max:255',
        ]);

        $cart = Cart::where('user_id', Auth::id())
            ->where('id', $id)
            ->firstOrFail();

        $cart->update([
            'quantity' => $validated['quantity'],
            'notes' => $validated['notes'] ?? $cart->notes,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Keranjang berhasil diperbarui',
            'data' => $cart,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $cart = Cart::where('user_id', Auth::id())
            ->where('id', $id)
            ->firstOrFail();

        $cart->delete();

        return response()->json([
            'success' => true,
            'message' => 'Item berhasil dihapus dari keranjang',
        ]);
    }

    public function clear(): JsonResponse
    {
        Cart::where('user_id', Auth::id())->delete();

        return response()->json([
            'success' => true,
            'message' => 'Keranjang berhasil dikosongkan',
        ]);
    }
}