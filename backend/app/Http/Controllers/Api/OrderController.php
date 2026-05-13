<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'canteen_id' => 'required|exists:canteens,id',
            'customer_name' => 'required|string|max:100',
            'table_number' => 'nullable|string|max:10',
            'notes' => 'nullable|string|max:500',
        ]);

        $carts = Cart::where('user_id', Auth::id())
            ->where('canteen_id', $validated['canteen_id'])
            ->with('menu')
            ->get();

        if ($carts->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Keranjang kosong',
            ], 400);
        }

        try {
            DB::beginTransaction();

            $subtotal = $carts->sum(function ($cart) {
                return $cart->menu->price * $cart->quantity;
            });

            $tax = round($subtotal * 0.1);
            $total = $subtotal + $tax;

            $orderCode = 'KKC' . date('Ymd') . strtoupper(substr(uniqid(), -6));

            $order = Order::create([
                'user_id' => Auth::id(),
                'canteen_id' => $validated['canteen_id'],
                'order_code' => $orderCode,
                'customer_name' => $validated['customer_name'],
                'table_number' => $validated['table_number'] ?? null,
                'status' => 'pending',
                'subtotal' => $subtotal,
                'tax' => $tax,
                'total' => $total,
                'notes' => $validated['notes'] ?? null,
            ]);

            foreach ($carts as $cart) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'menu_id' => $cart->menu_id,
                    'menu_name' => $cart->menu->name,
                    'menu_price' => $cart->menu->price,
                    'quantity' => $cart->quantity,
                    'notes' => $cart->notes,
                    'subtotal' => $cart->menu->price * $cart->quantity,
                ]);

                // Update stock
                $cart->menu->decrement('stock', $cart->quantity);
            }

            // Clear cart for this canteen
            Cart::where('user_id', Auth::id())
                ->where('canteen_id', $validated['canteen_id'])
                ->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Order berhasil dibuat',
                'data' => [
                    'order_id' => $order->id,
                    'order_code' => $order->order_code,
                    'total' => $order->total,
                    'formatted_total' => $order->formatted_total,
                ],
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function show(string $orderCode): JsonResponse
    {
        $order = Order::where('order_code', $orderCode)
            ->where('user_id', Auth::id())
            ->with(['items', 'canteen', 'payment'])
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => [
                'order' => [
                    'id' => $order->id,
                    'order_code' => $order->order_code,
                    'customer_name' => $order->customer_name,
                    'table_number' => $order->table_number,
                    'status' => $order->status,
                    'status_label' => $order->status_label,
                    'subtotal' => $order->subtotal,
                    'tax' => $order->tax,
                    'total' => $order->total,
                    'formatted_total' => $order->formatted_total,
                    'notes' => $order->notes,
                    'created_at' => $order->created_at->format('d M Y, H:i'),
                    'paid_at' => $order->paid_at?->format('d M Y, H:i'),
                ],
                'canteen' => [
                    'id' => $order->canteen->id,
                    'name' => $order->canteen->name,
                    'address' => $order->canteen->address,
                    'phone' => $order->canteen->phone,
                ],
                'items' => $order->items->map(function ($item) {
                    return [
                        'menu_name' => $item->menu_name,
                        'menu_price' => $item->menu_price,
                        'formatted_price' => 'Rp' . number_format($item->menu_price, 0, ',', '.'),
                        'quantity' => $item->quantity,
                        'notes' => $item->notes,
                        'subtotal' => $item->subtotal,
                    ];
                }),
                'payment' => $order->payment ? [
                    'method' => $order->payment->method,
                    'status' => $order->payment->status,
                    'qris_image' => $order->payment->qris_image,
                    'expired_at' => $order->payment->expired_at?->format('H:i'),
                ] : null,
            ],
        ]);
    }

    public function history(): JsonResponse
    {
        $orders = Order::where('user_id', Auth::id())
            ->with('canteen')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($order) {
                return [
                    'order_code' => $order->order_code,
                    'canteen_name' => $order->canteen->name,
                    'total' => $order->formatted_total,
                    'status' => $order->status_label,
                    'date' => $order->created_at->format('d M Y'),
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $orders,
        ]);
    }
}