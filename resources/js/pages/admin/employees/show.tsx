import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
    ArrowLeft, 
    User, 
    Pencil, 
    Trash2,
    Phone,
    Building,
    Award,
    Calendar,
    Car,
    CheckCircle,
    XCircle,
    AlertCircle
} from 'lucide-react';

interface VehiclePermit {
    id: number;
    vehicle_type: string;
    license_plate: string;
    usage_start: string;
    usage_end: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
}

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string;
    grade: string;
    phone?: string;
    created_at: string;
    vehicle_permits?: VehiclePermit[];
}

interface Props {
    employee: Employee;
    [key: string]: unknown;
}

export default function ShowEmployee({ employee }: Props) {
    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete ${employee.name}? This will also delete all their permit requests.`)) {
            router.delete(route('employees.destroy', employee.id));
        }
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Pending
                </Badge>;
            case 'approved':
                return <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Approved
                </Badge>;
            case 'rejected':
                return <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                    <XCircle className="w-3 h-3 mr-1" />
                    Rejected
                </Badge>;
            default:
                return null;
        }
    };

    return (
        <>
            <Head title={`${employee.name} - Employee Details`} />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/employees">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back to Employees
                                    </Link>
                                </Button>
                                <div className="flex items-center space-x-3">
                                    <div className="bg-blue-600 p-2 rounded-lg">
                                        <User className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900">👤 {employee.name}</h1>
                                        <p className="text-gray-600">Employee ID: {employee.employee_id}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <Button variant="outline" asChild>
                                    <Link href={route('employees.edit', employee.id)}>
                                        <Pencil className="w-4 h-4 mr-2" />
                                        Edit
                                    </Link>
                                </Button>
                                <Button variant="destructive" onClick={handleDelete}>
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Employee Information */}
                        <div className="lg:col-span-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <User className="w-5 h-5" />
                                        <span>Employee Information</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Basic Info */}
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-blue-100 p-2 rounded-full">
                                                <User className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Full Name</p>
                                                <p className="font-semibold">{employee.name}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <div className="bg-purple-100 p-2 rounded-full">
                                                <Building className="w-4 h-4 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Department</p>
                                                <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                                                    {employee.department}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <div className="bg-green-100 p-2 rounded-full">
                                                <Award className="w-4 h-4 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Grade/Position</p>
                                                <p className="font-semibold">{employee.grade}</p>
                                            </div>
                                        </div>

                                        {employee.phone && (
                                            <div className="flex items-center space-x-3">
                                                <div className="bg-orange-100 p-2 rounded-full">
                                                    <Phone className="w-4 h-4 text-orange-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">Phone Number</p>
                                                    <p className="font-semibold">{employee.phone}</p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center space-x-3">
                                            <div className="bg-gray-100 p-2 rounded-full">
                                                <Calendar className="w-4 h-4 text-gray-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Added On</p>
                                                <p className="font-semibold">{formatDateTime(employee.created_at)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
                                        <h3 className="font-semibold text-gray-900 mb-3">📊 Permit Statistics</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-blue-600">
                                                    {employee.vehicle_permits?.length || 0}
                                                </p>
                                                <p className="text-sm text-gray-600">Total Requests</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-green-600">
                                                    {employee.vehicle_permits?.filter(p => p.status === 'approved').length || 0}
                                                </p>
                                                <p className="text-sm text-gray-600">Approved</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Vehicle Permit History */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Car className="w-5 h-5" />
                                        <span>Vehicle Permit History</span>
                                    </CardTitle>
                                    <CardDescription>
                                        All vehicle permit requests made by this employee
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {employee.vehicle_permits && employee.vehicle_permits.length > 0 ? (
                                        <div className="overflow-x-auto">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Request ID</TableHead>
                                                        <TableHead>Vehicle</TableHead>
                                                        <TableHead>Usage Period</TableHead>
                                                        <TableHead>Status</TableHead>
                                                        <TableHead>Requested</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {employee.vehicle_permits.map((permit) => (
                                                        <TableRow key={permit.id}>
                                                            <TableCell className="font-mono text-sm">
                                                                #{permit.id}
                                                            </TableCell>
                                                            <TableCell>
                                                                <div>
                                                                    <p className="font-medium">{permit.vehicle_type}</p>
                                                                    <p className="text-sm text-gray-600">{permit.license_plate}</p>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div>
                                                                    <p className="text-sm">{formatDateTime(permit.usage_start)}</p>
                                                                    <p className="text-sm text-gray-600">to {formatDateTime(permit.usage_end)}</p>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                {getStatusBadge(permit.status)}
                                                            </TableCell>
                                                            <TableCell>
                                                                <p className="text-sm">{formatDateTime(permit.created_at)}</p>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <Car className="mx-auto h-12 w-12 text-gray-400" />
                                            <h3 className="mt-2 text-sm font-semibold text-gray-900">No permit requests</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                This employee hasn't submitted any vehicle permit requests yet.
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}