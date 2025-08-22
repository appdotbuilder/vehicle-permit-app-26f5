import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
    Users, 
    Plus, 
    Eye, 
    Pencil, 
    Trash2,
    ArrowLeft,
    Building,
    UserCheck
} from 'lucide-react';

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string;
    grade: string;
    phone?: string;
    created_at: string;
}

interface PaginationLinks {
    url?: string;
    label: string;
    active: boolean;
}

interface EmployeesData {
    data: Employee[];
    links: PaginationLinks[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    employees: EmployeesData;
    [key: string]: unknown;
}

export default function EmployeesIndex({ employees }: Props) {
    const handleDelete = (employee: Employee) => {
        if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
            router.delete(route('employees.destroy', employee.id));
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <>
            <Head title="Employee Management" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Home
                                    </Link>
                                </Button>
                                <div className="flex items-center space-x-3">
                                    <div className="bg-green-600 p-2 rounded-lg">
                                        <Users className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900">👥 Employee Management</h1>
                                        <p className="text-gray-600">Manage employee information and access</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <Button asChild>
                                    <Link href="/admin">
                                        📊 Admin Dashboard
                                    </Link>
                                </Button>
                                <Button asChild>
                                    <Link href={route('employees.create')}>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Employee
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Employees</p>
                                        <p className="text-3xl font-bold text-gray-900">{employees.total}</p>
                                    </div>
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <Users className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Departments</p>
                                        <p className="text-3xl font-bold text-green-600">
                                            {new Set(employees.data.map(emp => emp.department)).size}
                                        </p>
                                    </div>
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <Building className="w-6 h-6 text-green-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Active Profiles</p>
                                        <p className="text-3xl font-bold text-purple-600">{employees.total}</p>
                                    </div>
                                    <div className="bg-purple-100 p-3 rounded-full">
                                        <UserCheck className="w-6 h-6 text-purple-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Employees Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Employees Directory</CardTitle>
                            <CardDescription>
                                Manage employee information and department assignments
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Employee ID</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Department</TableHead>
                                            <TableHead>Grade</TableHead>
                                            <TableHead>Contact</TableHead>
                                            <TableHead>Added</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {employees.data.map((employee) => (
                                            <TableRow key={employee.id}>
                                                <TableCell className="font-mono font-semibold">
                                                    {employee.employee_id}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-2">
                                                        <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                                                            <UserCheck className="w-4 h-4" />
                                                        </div>
                                                        <span className="font-medium">{employee.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                                                        {employee.department}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {employee.grade}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    {employee.phone ? (
                                                        <span className="text-sm text-gray-600">{employee.phone}</span>
                                                    ) : (
                                                        <span className="text-sm text-gray-400 italic">No phone</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-sm text-gray-600">
                                                        {formatDate(employee.created_at)}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="text-blue-600 hover:bg-blue-50"
                                                            asChild
                                                        >
                                                            <Link href={route('employees.show', employee.id)}>
                                                                <Eye className="w-4 h-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="text-green-600 hover:bg-green-50"
                                                            asChild
                                                        >
                                                            <Link href={route('employees.edit', employee.id)}>
                                                                <Pencil className="w-4 h-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="text-red-600 hover:bg-red-50"
                                                            onClick={() => handleDelete(employee)}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {employees.data.length === 0 && (
                                <div className="text-center py-12">
                                    <Users className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No employees</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Get started by adding your first employee.
                                    </p>
                                    <div className="mt-6">
                                        <Button asChild>
                                            <Link href={route('employees.create')}>
                                                <Plus className="w-4 h-4 mr-2" />
                                                Add Employee
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Pagination */}
                            {employees.last_page > 1 && (
                                <div className="flex items-center justify-between mt-6">
                                    <p className="text-sm text-gray-600">
                                        Showing {((employees.current_page - 1) * employees.per_page) + 1} to {Math.min(employees.current_page * employees.per_page, employees.total)} of {employees.total} employees
                                    </p>
                                    <div className="flex space-x-2">
                                        {employees.links.map((link, index) => (
                                            <Button
                                                key={index}
                                                variant={link.active ? "default" : "outline"}
                                                size="sm"
                                                disabled={!link.url}
                                                onClick={() => link.url && router.visit(link.url)}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}