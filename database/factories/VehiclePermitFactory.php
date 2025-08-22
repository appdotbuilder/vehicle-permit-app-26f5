<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\VehiclePermit>
 */
class VehiclePermitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = fake()->dateTimeBetween('now', '+1 month');
        $endDate = fake()->dateTimeBetween($startDate, '+2 months');
        
        return [
            'employee_id' => function () {
                $employee = Employee::factory()->create();
                return $employee->employee_id;
            },
            'vehicle_type' => fake()->randomElement([
                'Sedan',
                'SUV',
                'Van',
                'Pickup Truck',
                'Motorcycle',
                'Bus'
            ]),
            'license_plate' => strtoupper(fake()->lexify('???')) . '-' . fake()->numberBetween(1000, 9999),
            'usage_start' => $startDate,
            'usage_end' => $endDate,
            'purpose' => fake()->optional(0.8)->sentence(10),
            'status' => fake()->randomElement(['pending', 'approved', 'rejected']),
            'rejection_reason' => fake()->optional(0.2)->sentence(8),
            'processed_at' => fake()->optional(0.7)->dateTimeBetween('-1 week', 'now'),
        ];
    }

    /**
     * Indicate that the permit is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'rejection_reason' => null,
            'processed_at' => null,
        ]);
    }

    /**
     * Indicate that the permit is approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
            'rejection_reason' => null,
            'processed_at' => fake()->dateTimeBetween('-1 week', 'now'),
        ]);
    }

    /**
     * Indicate that the permit is rejected.
     */
    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'rejected',
            'rejection_reason' => fake()->sentence(8),
            'processed_at' => fake()->dateTimeBetween('-1 week', 'now'),
        ]);
    }
}