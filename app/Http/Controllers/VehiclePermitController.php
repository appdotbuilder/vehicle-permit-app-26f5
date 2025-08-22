<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVehiclePermitRequest;
use App\Models\Employee;
use App\Models\VehiclePermit;
use App\Services\WhatsAppService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehiclePermitController extends Controller
{
    /**
     * Display the permit request form.
     */
    public function index()
    {
        $employees = Employee::orderBy('name')->get();
        
        return Inertia::render('welcome', [
            'employees' => $employees
        ]);
    }

    /**
     * Store a newly created permit request.
     */
    public function store(StoreVehiclePermitRequest $request)
    {
        $permit = VehiclePermit::create($request->validated());
        
        // Send WhatsApp notification to HR
        $whatsAppService = new WhatsAppService();
        $whatsAppService->sendHRNotification($permit);
        
        $employees = Employee::orderBy('name')->get();
        
        return Inertia::render('welcome', [
            'employees' => $employees,
            'message' => 'Vehicle permit request submitted successfully! HR has been notified.',
            'success' => true
        ]);
    }

    /**
     * Get employee data by ID.
     */
    public function show(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|string|exists:employees,employee_id'
        ]);
        
        $employee = Employee::where('employee_id', $request->employee_id)->first();
        
        return response()->json([
            'employee' => $employee
        ]);
    }
}