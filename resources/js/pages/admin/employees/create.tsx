import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, UserPlus, Users } from 'lucide-react';



export default function CreateEmployee() {
    const [formData, setFormData] = useState({
        employee_id: '',
        name: '',
        department: '',
        grade: '',
        phone: ''
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        router.post(route('employees.store'), formData, {
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
            <Head title="Add New Employee" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/employees">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Employees
                                </Link>
                            </Button>
                            <div className="flex items-center space-x-3">
                                <div className="bg-green-600 p-2 rounded-lg">
                                    <UserPlus className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">➕ Add New Employee</h1>
                                    <p className="text-gray-600">Create a new employee profile</p>
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
                                    Fill out the form below to add a new employee to the system
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

                                    {/* Info Box */}
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-blue-800 mb-2">ℹ️ Employee Access</h4>
                                        <ul className="text-sm text-blue-700 space-y-1">
                                            <li>• Employee can use their ID to request vehicle permits</li>
                                            <li>• Personal information will auto-populate in permit forms</li>
                                            <li>• WhatsApp notifications will be sent to the provided phone number</li>
                                            <li>• Employee data can be updated or removed later</li>
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
                                                    Creating Employee...
                                                </>
                                            ) : (
                                                <>
                                                    <UserPlus className="w-4 h-4 mr-2" />
                                                    Create Employee
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={isSubmitting}
                                            asChild
                                        >
                                            <Link href="/employees">
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