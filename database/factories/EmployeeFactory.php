<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'employee_id' => 'EMP' . fake()->unique()->numberBetween(1000, 9999),
            'name' => fake()->name(),
            'department' => fake()->randomElement([
                'Human Resources',
                'Information Technology',
                'Finance',
                'Marketing',
                'Operations',
                'Sales',
                'Legal',
                'Administration'
            ]),
            'grade' => fake()->randomElement([
                'Junior',
                'Senior',
                'Manager',
                'Senior Manager',
                'Director',
                'Associate',
                'Principal'
            ]),
            'phone' => fake()->phoneNumber(),
        ];
    }
}