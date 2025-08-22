<?php

namespace Tests\Feature;

use App\Models\Employee;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EmployeeTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_can_view_employees_list(): void
    {
        Employee::factory()->count(3)->create();
        
        $response = $this->get('/employees');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('admin/employees/index')
                ->has('employees')
        );
    }

    public function test_can_create_employee(): void
    {
        $employeeData = [
            'employee_id' => 'EMP999',
            'name' => 'John Test',
            'department' => 'Information Technology',
            'grade' => 'Senior Developer',
            'phone' => '+1234567890'
        ];

        $response = $this->post('/employees', $employeeData);

        $response->assertRedirect('/employees');
        $this->assertDatabaseHas('employees', [
            'employee_id' => 'EMP999',
            'name' => 'John Test',
            'department' => 'Information Technology',
            'grade' => 'Senior Developer'
        ]);
    }

    public function test_can_view_single_employee(): void
    {
        $employee = Employee::factory()->create();
        
        $response = $this->get("/employees/{$employee->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('admin/employees/show')
                ->has('employee')
        );
    }

    public function test_can_update_employee(): void
    {
        $employee = Employee::factory()->create();
        
        $updateData = [
            'employee_id' => $employee->employee_id,
            'name' => 'Updated Name',
            'department' => 'Human Resources',
            'grade' => 'Manager',
            'phone' => '+9876543210'
        ];

        $response = $this->put("/employees/{$employee->id}", $updateData);

        $response->assertRedirect("/employees/{$employee->id}");
        $this->assertDatabaseHas('employees', [
            'id' => $employee->id,
            'name' => 'Updated Name',
            'department' => 'Human Resources',
            'grade' => 'Manager'
        ]);
    }

    public function test_can_delete_employee(): void
    {
        $employee = Employee::factory()->create();
        
        $response = $this->delete("/employees/{$employee->id}");

        $response->assertRedirect('/employees');
        $this->assertDatabaseMissing('employees', [
            'id' => $employee->id
        ]);
    }

    public function test_employee_id_must_be_unique(): void
    {
        $existingEmployee = Employee::factory()->create(['employee_id' => 'EMP001']);
        
        $duplicateData = [
            'employee_id' => 'EMP001', // Same as existing
            'name' => 'Another Employee',
            'department' => 'Finance',
            'grade' => 'Analyst'
        ];

        $response = $this->post('/employees', $duplicateData);

        $response->assertSessionHasErrors('employee_id');
    }
}