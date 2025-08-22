<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create some specific employees
        Employee::create([
            'employee_id' => 'EMP001',
            'name' => 'John Doe',
            'department' => 'Information Technology',
            'grade' => 'Senior Developer',
            'phone' => '+1234567890',
        ]);

        Employee::create([
            'employee_id' => 'EMP002',
            'name' => 'Jane Smith',
            'department' => 'Human Resources',
            'grade' => 'HR Manager',
            'phone' => '+1234567891',
        ]);

        Employee::create([
            'employee_id' => 'EMP003',
            'name' => 'Mike Johnson',
            'department' => 'Finance',
            'grade' => 'Financial Analyst',
            'phone' => '+1234567892',
        ]);

        // Create additional random employees
        Employee::factory(20)->create();
    }
}