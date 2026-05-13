<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->enum('method', ['qris', 'cash', 'transfer'])->default('qris');
            $table->enum('status', ['pending', 'success', 'failed', 'expired'])->default('pending');
            $table->integer('amount');
            $table->text('qris_string')->nullable();
            $table->string('qris_image')->nullable();
            $table->string('reference_number')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('expired_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};