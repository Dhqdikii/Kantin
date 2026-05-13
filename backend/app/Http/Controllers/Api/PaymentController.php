<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use App\Services\QrisService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    protected QrisService $qrisService;

    public function __construct(QrisService $qrisService)
    {
        $this->qrisService = $qrisService;
    }

    public function create(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'order_code' => 'required|string',
            'method' => 'required|in:qris,cash,transfer',
        ]);

        $order = Order::where('order_code', $validated['order_code'])
            ->where('user_id', Auth::id())
            ->firstOrFail();

        if ($order->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Order sudah dibayar atau dibatalkan',
            ], 400);
        }

        // Delete existing pending payment
        Payment::where('order_id', $order->id)
            ->where('status', 'pending')
            ->delete();

        $payment = Payment::create([
            'order_id' => $order->id,
            'method' => $validated['method'],
            'status' => 'pending',
            'amount' => $order->total,
            'expired_at' => now()->addMinutes(15),
        ]);

        if ($validated['method'] === 'qris') {
            $qrisData = $this->qrisService->generate($order);
            $payment->update([
                'qris_string' => $qrisData['string'],
                'qris_image' => $qrisData['image'],
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'payment_id' => $payment->id,
                'method' => $payment->method,
                'amount' => $payment->amount,
                'formatted_amount' => 'Rp' . number_format($payment->amount, 0, ',', '.'),
                'qris_image' => $payment->qris_image,
                'expired_at' => $payment->expired_at->format('H:i'),
                'order_code' => $order->order_code,
            ],
        ]);
    }

    public function verify(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'order_code' => 'required|string',
        ]);

        $order = Order::where('order_code', $validated['order_code'])
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $payment = $order->payment;

        if (!$payment) {
            return response()->json([
                'success' => false,
                'message' => 'Pembayaran tidak ditemukan',
            ], 404);
        }

        if ($payment->status === 'success') {
            return response()->json([
                'success' => true,
                'message' => 'Pembayaran sudah berhasil',
                'data' => [
                    'status' => 'success',
                    'order_code' => $order->order_code,
                ],
            ]);
        }

        // Simulate verification (in production, check with payment gateway)
        if ($payment->method === 'qris') {
            // Mock successful payment for demo
            $payment->update([
                'status' => 'success',
                'paid_at' => now(),
                'reference_number' => 'REF' . strtoupper(uniqid()),
            ]);

            $order->update([
                'status' => 'paid',
                'paid_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Pembayaran berhasil diverifikasi',
                'data' => [
                    'status' => 'success',
                    'order_code' => $order->order_code,
                ],
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Pembayaran masih pending',
            'data' => [
                'status' => $payment->status,
            ],
        ]);
    }

    public function simulatePay(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'order_code' => 'required|string',
        ]);

        $order = Order::where('order_code', $validated['order_code'])
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $payment = $order->payment;

        if ($payment && $payment->status === 'pending') {
            $payment->update([
                'status' => 'success',
                'paid_at' => now(),
                'reference_number' => 'REF' . date('YmdHis') . rand(1000, 9999),
            ]);

            $order->update([
                'status' => 'paid',
                'paid_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Pembayaran berhasil',
                'data' => [
                    'order_code' => $order->order_code,
                    'status' => 'paid',
                ],
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Pembayaran tidak dapat diproses',
        ], 400);
    }
}