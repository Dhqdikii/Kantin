<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CanteenController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PaymentController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/canteens', [CanteenController::class, 'index']);
Route::get('/canteens/{slug}', [CanteenController::class, 'show']);

Route::get('/categories', [MenuController::class, 'categories']);
Route::get('/canteens/{slug}/menus', [MenuController::class, 'index']);
Route::get('/canteens/{canteenSlug}/menus/{menuSlug}', [MenuController::class, 'show']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Cart
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{id}', [CartController::class, 'update']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);
    Route::delete('/cart', [CartController::class, 'clear']);

    // Orders
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{orderCode}', [OrderController::class, 'show']);
    Route::get('/orders', [OrderController::class, 'history']);

    // Payments
    Route::post('/payments', [PaymentController::class, 'create']);
    Route::post('/payments/verify', [PaymentController::class, 'verify']);
    Route::post('/payments/simulate', [PaymentController::class, 'simulatePay']);
});