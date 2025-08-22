import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Car, Clock, Users, CheckCircle, AlertCircle } from 'lucide-react';

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string;
    grade: string;
    phone?: string;
}

interface Props {
    employees: Employee[];
    message?: string;
    success?: boolean;
    [key: string]: unknown;
}

export default function Welcome({ employees, message, success }: Props) {
    const [formData, setFormData] = useState({
        employee_id: '',
        vehicle_type: '',
        license_plate: '',
        usage_start: '',
        usage_end: '',
        purpose: ''
    });
    
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEmployeeChange = (employeeId: string) => {
        const employee = employees.find(emp => emp.employee_id === employeeId);
        setSelectedEmployee(employee || null);
        setFormData(prev => ({ ...prev, employee_id: employeeId }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        router.post(route('permits.store'), formData, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setFormData({
                    employee_id: '',
                    vehicle_type: '',
                    license_plate: '',
                    usage_start: '',
                    usage_end: '',
                    purpose: ''
                });
                setSelectedEmployee(null);
                setIsSubmitting(false);
            },
            onError: () => {
                setIsSubmitting(false);
            }
        });
    };

    return (
        <>
            <Head title="Vehicle Usage Permits" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="bg-blue-600 p-2 rounded-lg">
                                    <Car className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">🚗 Vehicle Permit System</h1>
                                    <p className="text-gray-600">Request vehicle usage permits instantly</p>
                                </div>
                            </div>
                            <div className="hidden md:flex space-x-4">
                                <a href="/admin" className="text-blue-600 hover:text-blue-800 font-medium">
                                    Admin Dashboard
                                </a>
                                <a href="/employees" className="text-green-600 hover:text-green-800 font-medium">
                                    Manage Employees
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    {/* Success Message */}
                    {message && (
                        <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
                            success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                        }`}>
                            {success ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                                <AlertCircle className="w-5 h-5 text-red-600" />
                            )}
                            <span className={success ? 'text-green-800' : 'text-red-800'}>
                                {message}
                            </span>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Form */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Car className="w-5 h-5" />
                                        <span>Vehicle Permit Request</span>
                                    </CardTitle>
                                    <CardDescription>
                                        Fill out the form below to request vehicle usage permission
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Employee Selection */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="employee_id">Employee ID *</Label>
                                                <Select value={formData.employee_id} onValueChange={handleEmployeeChange}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select your Employee ID" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {employees.map(employee => (
                                                            <SelectItem key={employee.id} value={employee.employee_id}>
                                                                {employee.employee_id} - {employee.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        {/* Employee Details */}
                                        {selectedEmployee && (
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h3 className="font-semibold text-gray-900 mb-2">Employee Information</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                    <div>
                                                        <span className="text-gray-600">Name:</span>
                                                        <p className="font-medium">{selectedEmployee.name}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">Department:</span>
                                                        <p className="font-medium">{selectedEmployee.department}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">Grade:</span>
                                                        <p className="font-medium">{selectedEmployee.grade}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Vehicle Details */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="vehicle_type">Vehicle Type *</Label>
                                                <Select value={formData.vehicle_type} onValueChange={(value) => setFormData(prev => ({ ...prev, vehicle_type: value }))}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select vehicle type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="sedan">Sedan</SelectItem>
                                                        <SelectItem value="suv">SUV</SelectItem>
                                                        <SelectItem value="van">Van</SelectItem>
                                                        <SelectItem value="pickup">Pickup Truck</SelectItem>
                                                        <SelectItem value="motorcycle">Motorcycle</SelectItem>
                                                        <SelectItem value="bus">Bus</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label htmlFor="license_plate">License Plate *</Label>
                                                <Input
                                                    id="license_plate"
                                                    type="text"
                                                    value={formData.license_plate}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, license_plate: e.target.value }))}
                                                    placeholder="e.g., ABC-1234"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Usage Dates */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="usage_start">Start Date & Time *</Label>
                                                <Input
                                                    id="usage_start"
                                                    type="datetime-local"
                                                    value={formData.usage_start}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, usage_start: e.target.value }))}
                                                    required
                                                    min={new Date().toISOString().slice(0, 16)}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="usage_end">End Date & Time *</Label>
                                                <Input
                                                    id="usage_end"
                                                    type="datetime-local"
                                                    value={formData.usage_end}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, usage_end: e.target.value }))}
                                                    required
                                                    min={formData.usage_start || new Date().toISOString().slice(0, 16)}
                                                />
                                            </div>
                                        </div>

                                        {/* Purpose */}
                                        <div>
                                            <Label htmlFor="purpose">Purpose (Optional)</Label>
                                            <Textarea
                                                id="purpose"
                                                value={formData.purpose}
                                                onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
                                                placeholder="Describe the purpose of vehicle usage..."
                                                rows={3}
                                            />
                                        </div>

                                        <Button 
                                            type="submit" 
                                            className="w-full bg-blue-600 hover:bg-blue-700"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                    Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    <Car className="w-4 h-4 mr-2" />
                                                    Submit Permit Request
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Process Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Clock className="w-5 h-5" />
                                        <span>Process Flow</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="bg-blue-100 text-blue-600 rounded-full p-1">
                                            <span className="block w-2 h-2 bg-current rounded-full"></span>
                                        </div>
                                        <div>
                                            <p className="font-medium">Submit Request</p>
                                            <p className="text-sm text-gray-600">Fill out and submit the form</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="bg-yellow-100 text-yellow-600 rounded-full p-1">
                                            <span className="block w-2 h-2 bg-current rounded-full"></span>
                                        </div>
                                        <div>
                                            <p className="font-medium">HR Notification</p>
                                            <p className="text-sm text-gray-600">HR receives WhatsApp notification</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="bg-green-100 text-green-600 rounded-full p-1">
                                            <span className="block w-2 h-2 bg-current rounded-full"></span>
                                        </div>
                                        <div>
                                            <p className="font-medium">Decision & Notification</p>
                                            <p className="text-sm text-gray-600">You'll receive approval/rejection via WhatsApp</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Features */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Users className="w-5 h-5" />
                                        <span>Key Features</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <Badge variant="secondary">📱</Badge>
                                        <span className="text-sm">WhatsApp notifications</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Badge variant="secondary">⚡</Badge>
                                        <span className="text-sm">Real-time processing</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Badge variant="secondary">📊</Badge>
                                        <span className="text-sm">Admin dashboard</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Badge variant="secondary">📈</Badge>
                                        <span className="text-sm">Historical data export</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Badge variant="secondary">👥</Badge>
                                        <span className="text-sm">Employee management</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Links */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quick Links</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <Button variant="outline" className="w-full justify-start" asChild>
                                        <a href="/admin">
                                            📊 HR Admin Dashboard
                                        </a>
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start" asChild>
                                        <a href="/employees">
                                            👥 Employee Management
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}