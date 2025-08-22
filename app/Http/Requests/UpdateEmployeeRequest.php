<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'employee_id' => [
                'required',
                'string',
                'max:50',
                Rule::unique('employees', 'employee_id')->ignore($this->route('employee'), 'id')
            ],
            'name' => 'required|string|max:255',
            'department' => 'required|string|max:100',
            'grade' => 'required|string|max:50',
            'phone' => 'nullable|string|max:20',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'employee_id.required' => 'Employee ID is required.',
            'employee_id.unique' => 'This employee ID already exists.',
            'name.required' => 'Employee name is required.',
            'department.required' => 'Department is required.',
            'grade.required' => 'Grade is required.',
        ];
    }
}