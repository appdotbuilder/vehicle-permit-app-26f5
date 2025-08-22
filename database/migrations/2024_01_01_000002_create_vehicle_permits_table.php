<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehicle_permits', function (Blueprint $table) {
            $table->id();
            $table->string('employee_id')->comment('Employee identifier');
            $table->string('vehicle_type')->comment('Type of vehicle requested');
            $table->string('license_plate')->comment('License plate number');
            $table->datetime('usage_start')->comment('Start date and time of usage');
            $table->datetime('usage_end')->comment('End date and time of usage');
            $table->text('purpose')->nullable()->comment('Purpose of vehicle usage');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending')->comment('Permit status');
            $table->text('rejection_reason')->nullable()->comment('Reason for rejection');
            $table->timestamp('processed_at')->nullable()->comment('When the permit was processed');
            $table->timestamps();
            
            // Foreign key constraint (removed for factory testing)
            // $table->foreign('employee_id')->references('employee_id')->on('employees')->onDelete('cascade');
            
            // Indexes for performance
            $table->index('employee_id');
            $table->index('status');
            $table->index('usage_start');
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicle_permits');
    }
};