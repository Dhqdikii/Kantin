<?php

namespace App\Services;

use App\Models\Order;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Storage;

class QrisService
{
    public function generate(Order $order): array
    {
        // Generate QRIS string (mock implementation)
        // In production, integrate with actual QRIS provider (QRIS.ID, Duitku, etc.)
        $qrisString = $this->generateQrisString($order);

        // Generate QR Code image
        $filename = 'qris_' . $order->order_code . '.png';
        $path = 'qrcodes/' . $filename;

        $qrImage = QrCode::format('png')
            ->size(300)
            ->errorCorrection('H')
            ->generate($qrisString);

        Storage::disk('public')->put($path, $qrImage);

        return [
            'string' => $qrisString,
            'image' => asset('storage/' . $path),
        ];
    }

    private function generateQrisString(Order $order): string
    {
        // Mock QRIS string format
        // Real implementation should follow EMVCo QRIS specification
        $merchantName = strtoupper(substr($order->canteen->name, 0, 16));
        $amount = str_pad($order->total, 12, '0', STR_PAD_LEFT);

        return "00020101021226580014ID.CO.QRIS.WWW0118936009143{$order->order_code}520400005303360{$amount}5802ID5916{$merchantName}6007JAKARTA6304";
    }
}