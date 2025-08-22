<?php

namespace App\Services;

use App\Models\VehiclePermit;
use Illuminate\Support\Facades\Log;

class WhatsAppService
{
    /**
     * Send notification to HR about new permit request.
     */
    public function sendHRNotification(VehiclePermit $permit): bool
    {
        try {
            // Mock WhatsApp notification - in production, integrate with WhatsApp API
            $message = $this->buildHRNotificationMessage($permit);
            
            // Log the notification for demo purposes
            Log::info('WhatsApp notification sent to HR', [
                'permit_id' => $permit->id,
                'employee_id' => $permit->employee_id,
                'message' => $message
            ]);
            
            // Simulate API call success
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send WhatsApp notification to HR', [
                'permit_id' => $permit->id,
                'error' => $e->getMessage()
            ]);
            
            return false;
        }
    }

    /**
     * Send notification to employee about permit status.
     */
    public function sendEmployeeNotification(VehiclePermit $permit): bool
    {
        try {
            // Mock WhatsApp notification - in production, integrate with WhatsApp API
            $message = $this->buildEmployeeNotificationMessage($permit);
            
            // Log the notification for demo purposes
            Log::info('WhatsApp notification sent to employee', [
                'permit_id' => $permit->id,
                'employee_id' => $permit->employee_id,
                'status' => $permit->status,
                'message' => $message
            ]);
            
            // Simulate API call success
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send WhatsApp notification to employee', [
                'permit_id' => $permit->id,
                'error' => $e->getMessage()
            ]);
            
            return false;
        }
    }

    /**
     * Build HR notification message.
     */
    public function buildHRNotificationMessage(VehiclePermit $permit): string
    {
        $employee = $permit->employee;
        $approveUrl = route('admin.permits.approve', $permit->id);
        $rejectUrl = route('admin.permits.reject', $permit->id);
        
        return "🚗 New Vehicle Permit Request\n\n" .
               "Employee: {$employee->name} ({$permit->employee_id})\n" .
               "Department: {$employee->department}\n" .
               "Vehicle: {$permit->vehicle_type}\n" .
               "License Plate: {$permit->license_plate}\n" .
               "Usage: " . $permit->usage_start->format('M j, Y g:i A') . " - " . $permit->usage_end->format('M j, Y g:i A') . "\n" .
               "Purpose: " . ($permit->purpose ?? 'Not specified') . "\n\n" .
               "Actions:\n" .
               "✅ Approve: {$approveUrl}\n" .
               "❌ Reject: {$rejectUrl}";
    }

    /**
     * Build employee notification message.
     */
    public function buildEmployeeNotificationMessage(VehiclePermit $permit): string
    {
        $employee = $permit->employee;
        $statusEmoji = match($permit->status) {
            'approved' => '✅',
            'rejected' => '❌',
            default => '⏳'
        };
        
        $message = "{$statusEmoji} Vehicle Permit Update\n\n" .
                   "Dear {$employee->name},\n\n" .
                   "Your vehicle permit request has been " . strtoupper($permit->status) . ".\n\n" .
                   "Request Details:\n" .
                   "Vehicle: {$permit->vehicle_type}\n" .
                   "License Plate: {$permit->license_plate}\n" .
                   "Usage: " . $permit->usage_start->format('M j, Y g:i A') . " - " . $permit->usage_end->format('M j, Y g:i A') . "\n";
        
        if ($permit->status === 'rejected' && $permit->rejection_reason) {
            $message .= "\nReason: {$permit->rejection_reason}\n";
        }
        
        return $message;
    }
}