import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, UserPen, Users } from 'lucide-react';

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string;
    grade: string;
    phone?: string;
}

interface Props {
    employee: Employee;
    [key: string]: unknown;
}

export default function EditEmployee({ employee }: Props) {
    const [formData, setFormData] = useState({
        employee_id: employee.employee_id,
        name: employee.name,
        department: employee.department,
        grade: employee.grade,
        phone: employee.phone || ''
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        router.put(route('employees.update', employee.id), formData, {
            onSuccess: () => {
                setIsSubmitting(false);
            },
            onError: () => {
                setIsSubmitting(false);
            }
        });
    };

    const departments = [
        'Human Resources',
        'Information Technology',
        'Finance',
        'Marketing',
        'Operations',
        'Sales',
        'Legal',
        'Administration',
        'Engineering',
        'Customer Service'
    ];

    const grades = [
        'Intern',
        'Junior',
        'Associate',
        'Senior',
        'Lead',
        'Manager',
        'Senior Manager',
        'Director',
        'Senior Director',
        'VP',
        'Principal',
        'Staff'
    ];

    return (
        <>
            <Head title={`Edit ${employee.name}`} />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" size="sm" asChild>
                                <Link href={route('employees.show', employee.id)}>
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Employee
                                </Link>
                            </Button>
                            <div className="flex items-center space-x-3">
                                <div className="bg-orange-600 p-2 rounded-lg">
                                    <UserPen className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">✏️ Edit {employee.name}</h1>
                                    <p className="text-gray-600">Update employee information</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-2xl mx-auto">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Users className="w-5 h-5" />
                                    <span>Employee Information</span>
                                </CardTitle>
                                <CardDescription>
                                    Update the employee's details below
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Employee ID */}
                                    <div>
                                        <Label htmlFor="employee_id">Employee ID *</Label>
                                        <Input
                                            id="employee_id"
                                            type="text"
                                            value={formData.employee_id}
                                            onChange={(e) => setFormData(prev => ({ ...prev, employee_id: e.target.value }))}
                                            placeholder="e.g., EMP001, 12345, etc."
                                            required
                                        />
                                        <p className="text-sm text-gray-600 mt-1">
                                            Unique identifier for the employee
                                        </p>
                                    </div>

                                    {/* Name */}
                                    <div>
                                        <Label htmlFor="name">Full Name *</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                            placeholder="Enter employee's full name"
                                            required
                                        />
                                    </div>

                                    {/* Department and Grade */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="department">Department *</Label>
                                            <Select value={formData.department} onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select department" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {departments.map(dept => (
                                                        <SelectItem key={dept} value={dept}>
                                                            {dept}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="grade">Grade/Position *</Label>
                                            <Select value={formData.grade} onValueChange={(value) => setFormData(prev => ({ ...prev, grade: value }))}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select grade" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {grades.map(grade => (
                                                        <SelectItem key={grade} value={grade}>
                                                            {grade}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <Label htmlFor="phone">Phone Number (Optional)</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                            placeholder="e.g., +1234567890"
                                        />
                                        <p className="text-sm text-gray-600 mt-1">
                                            Used for WhatsApp notifications and contact purposes
                                        </p>
                                    </div>

                                    {/* Warning Box */}
                                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-amber-800 mb-2">⚠️ Update Notice</h4>
                                        <ul className="text-sm text-amber-700 space-y-1">
                                            <li>• Changing Employee ID will update all existing permit requests</li>
                                            <li>• Department and grade changes affect future permit submissions</li>
                                            <li>• Phone number updates will change WhatsApp notification delivery</li>
                                        </ul>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex space-x-4 pt-6">
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex-1"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                    Updating Employee...
                                                </>
                                            ) : (
                                                <>
                                                    <UserPen className="w-4 h-4 mr-2" />
                                                    Update Employee
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={isSubmitting}
                                            asChild
                                        >
                                            <Link href={route('employees.show', employee.id)}>
                                                Cancel
                                            </Link>
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}