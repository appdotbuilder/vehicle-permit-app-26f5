<?php

namespace Tests\Feature;

use App\Models\Employee;
use App\Models\VehiclePermit;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class VehiclePermitTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_can_view_permit_request_form(): void
    {
        Employee::factory()->create();
        
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('welcome')
                ->has('employees')
        );
    }

    public function test_can_submit_permit_request(): void
    {
        $employee = Employee::factory()->create();
        
        $permitData = [
            'employee_id' => $employee->employee_id,
            'vehicle_type' => 'sedan',
            'license_plate' => 'ABC-1234',
            'usage_start' => now()->addHour()->format('Y-m-d\TH:i'),
            'usage_end' => now()->addHours(4)->format('Y-m-d\TH:i'),
            'purpose' => 'Business meeting'
        ];

        $response = $this->post('/permits', $permitData);

        $response->assertStatus(200);
        $this->assertDatabaseHas('vehicle_permits', [
            'employee_id' => $employee->employee_id,
            'vehicle_type' => 'sedan',
            'license_plate' => 'ABC-1234',
            'status' => 'pending'
        ]);
    }

    public function test_admin_can_view_dashboard(): void
    {
        VehiclePermit::factory()->count(5)->create();
        
        $response = $this->get('/admin');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('admin/dashboard')
                ->has('permits')
                ->has('stats')
        );
    }

    public function test_admin_can_approve_permit(): void
    {
        $permit = VehiclePermit::factory()->pending()->create();
        
        $response = $this->post("/admin/permits", [
            'action' => 'approve',
            'permit_id' => $permit->id
        ]);

        $response->assertRedirect('/admin');
        $permit->refresh();
        $this->assertEquals('approved', $permit->status);
        $this->assertNotNull($permit->processed_at);
    }

    public function test_admin_can_reject_permit(): void
    {
        $permit = VehiclePermit::factory()->pending()->create();
        
        $rejectionData = [
            'action' => 'reject',
            'permit_id' => $permit->id,
            'rejection_reason' => 'Vehicle not available for requested dates'
        ];

        $response = $this->post("/admin/permits", $rejectionData);

        $response->assertRedirect('/admin');
        $permit->refresh();
        $this->assertEquals('rejected', $permit->status);
        $this->assertEquals('Vehicle not available for requested dates', $permit->rejection_reason);
        $this->assertNotNull($permit->processed_at);
    }
}