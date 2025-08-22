<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\EmployeeController;
// use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\VehiclePermitController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home page - Vehicle permit request form
Route::get('/', [VehiclePermitController::class, 'index'])->name('permits.index');
Route::post('/permits', [VehiclePermitController::class, 'store'])->name('permits.store');
Route::get('/employee/{employee_id}', [VehiclePermitController::class, 'show'])->name('permits.employee');

// Admin routes for HR
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('dashboard');
    Route::get('/download-excel', [AdminController::class, 'show'])->name('download-excel');
    
    // Permit approval/rejection routes using REST methods
    Route::post('/permits', [AdminController::class, 'store'])->name('permits.store');
    Route::get('/permits/create', [AdminController::class, 'create'])->name('permits.create');
});

// Employee management routes
Route::resource('employees', EmployeeController::class);

// Dashboard (requires authentication)
Route::get('/dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile routes (disabled - not needed for vehicle permit system)
// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// require __DIR__.'/auth.php'; // Not needed for vehicle permit system