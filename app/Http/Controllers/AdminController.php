<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\VehiclePermit;
use App\Services\WhatsAppService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard with permit requests.
     */
    public function index(Request $request)
    {
        $query = VehiclePermit::with('employee')->latest();
        
        // Filter by status if provided
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        
        // Filter by date range if provided
        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }
        
        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }
        
        $permits = $query->paginate(20);
        
        return Inertia::render('admin/dashboard', [
            'permits' => $permits,
            'filters' => $request->only(['status', 'date_from', 'date_to']),
            'stats' => [
                'total' => VehiclePermit::count(),
                'pending' => VehiclePermit::pending()->count(),
                'approved' => VehiclePermit::approved()->count(),
                'rejected' => VehiclePermit::rejected()->count(),
            ]
        ]);
    }

    /**
     * Store a newly approved permit.
     */
    public function store(Request $request)
    {
        $action = $request->input('action');
        $permitId = $request->input('permit_id');
        $permit = VehiclePermit::findOrFail($permitId);
        
        if ($action === 'approve') {
            $permit->update([
                'status' => 'approved',
                'processed_at' => now()
            ]);
            
            // Send WhatsApp notification to employee
            $whatsAppService = new WhatsAppService();
            $whatsAppService->sendEmployeeNotification($permit);
            
            return redirect()->route('admin.dashboard')
                ->with('success', 'Permit approved successfully! Employee has been notified.');
        } elseif ($action === 'reject') {
            $request->validate([
                'rejection_reason' => 'required|string|max:500'
            ]);
            
            $permit->update([
                'status' => 'rejected',
                'rejection_reason' => $request->rejection_reason,
                'processed_at' => now()
            ]);
            
            // Send WhatsApp notification to employee
            $whatsAppService = new WhatsAppService();
            $whatsAppService->sendEmployeeNotification($permit);
            
            return redirect()->route('admin.dashboard')
                ->with('success', 'Permit rejected successfully! Employee has been notified.');
        }
        
        return redirect()->route('admin.dashboard')
            ->with('error', 'Invalid action.');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permitId = request('permit_id');
        $permit = VehiclePermit::with('employee')->findOrFail($permitId);
        
        return Inertia::render('admin/reject-permit', [
            'permit' => $permit
        ]);
    }



    /**
     * Show the specified resource.
     */
    public function show(Request $request)
    {
        $query = VehiclePermit::with('employee');
        
        // Apply same filters as index
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        
        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }
        
        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }
        
        $permits = $query->get();
        
        // For now, return a mock Excel file
        // In production, you would use Laravel Excel package
        $filename = 'vehicle-permits-' . now()->format('Y-m-d') . '.csv';
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];
        
        $callback = function() use ($permits) {
            $file = fopen('php://output', 'w');
            
            // Headers
            fputcsv($file, [
                'ID',
                'Employee ID',
                'Employee Name',
                'Department',
                'Vehicle Type',
                'License Plate',
                'Usage Start',
                'Usage End',
                'Purpose',
                'Status',
                'Rejection Reason',
                'Requested At',
                'Processed At'
            ]);
            
            // Data
            foreach ($permits as $permit) {
                fputcsv($file, [
                    $permit->id,
                    $permit->employee_id,
                    $permit->employee->name,
                    $permit->employee->department,
                    $permit->vehicle_type,
                    $permit->license_plate,
                    $permit->usage_start->format('Y-m-d H:i:s'),
                    $permit->usage_end->format('Y-m-d H:i:s'),
                    $permit->purpose,
                    $permit->status,
                    $permit->rejection_reason,
                    $permit->created_at->format('Y-m-d H:i:s'),
                    $permit->processed_at?->format('Y-m-d H:i:s')
                ]);
            }
            
            fclose($file);
        };
        
        return response()->stream($callback, 200, $headers);
    }
}