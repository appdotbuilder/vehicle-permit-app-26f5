import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
    Car, 
    CheckCircle, 
    XCircle, 
    AlertCircle,
    Download,
    Filter,
    Eye,
    UserCheck,
    UserX
} from 'lucide-react';

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string;
    grade: string;
}

interface VehiclePermit {
    id: number;
    employee_id: string;
    vehicle_type: string;
    license_plate: string;
    usage_start: string;
    usage_end: string;
    purpose?: string;
    status: 'pending' | 'approved' | 'rejected';
    rejection_reason?: string;
    created_at: string;
    processed_at?: string;
    employee: Employee;
}

interface PaginationLinks {
    url?: string;
    label: string;
    active: boolean;
}

interface PermitsData {
    data: VehiclePermit[];
    links: PaginationLinks[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Stats {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
}

interface Props {
    permits: PermitsData;
    filters: {
        status?: string;
        date_from?: string;
        date_to?: string;
    };
    stats: Stats;
    [key: string]: unknown;
}

export default function AdminDashboard({ permits, filters, stats }: Props) {
    const [filterData, setFilterData] = useState({
        status: filters.status || '',
        date_from: filters.date_from || '',
        date_to: filters.date_to || ''
    });

    const handleFilter = () => {
        router.get(route('admin.dashboard'), filterData, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const clearFilters = () => {
        setFilterData({
            status: '',
            date_from: '',
            date_to: ''
        });
        router.get(route('admin.dashboard'), {}, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const downloadExcel = () => {
        router.get(route('admin.download-excel'), filterData);
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

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <Head title="HR Admin Dashboard" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="bg-purple-600 p-2 rounded-lg">
                                    <Car className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">📊 HR Admin Dashboard</h1>
                                    <p className="text-gray-600">Manage vehicle permit requests</p>
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <Button variant="outline" asChild>
                                    <Link href="/">
                                        🏠 Home
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/employees">
                                        👥 Employees
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Requests</p>
                                        <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                                    </div>
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <Car className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Pending</p>
                                        <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                                    </div>
                                    <div className="bg-yellow-100 p-3 rounded-full">
                                        <AlertCircle className="w-6 h-6 text-yellow-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Approved</p>
                                        <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
                                    </div>
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Rejected</p>
                                        <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
                                    </div>
                                    <div className="bg-red-100 p-3 rounded-full">
                                        <XCircle className="w-6 h-6 text-red-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Filters */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Filter className="w-5 h-5" />
                                <span>Filters & Export</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={filterData.status} onValueChange={(value) => setFilterData(prev => ({ ...prev, status: value }))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="All statuses" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">All statuses</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="approved">Approved</SelectItem>
                                            <SelectItem value="rejected">Rejected</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div>
                                    <Label htmlFor="date_from">Date From</Label>
                                    <Input
                                        id="date_from"
                                        type="date"
                                        value={filterData.date_from}
                                        onChange={(e) => setFilterData(prev => ({ ...prev, date_from: e.target.value }))}
                                    />
                                </div>
                                
                                <div>
                                    <Label htmlFor="date_to">Date To</Label>
                                    <Input
                                        id="date_to"
                                        type="date"
                                        value={filterData.date_to}
                                        onChange={(e) => setFilterData(prev => ({ ...prev, date_to: e.target.value }))}
                                    />
                                </div>
                                
                                <div className="flex items-end space-x-2">
                                    <Button onClick={handleFilter} className="flex-1">
                                        <Filter className="w-4 h-4 mr-2" />
                                        Filter
                                    </Button>
                                    <Button variant="outline" onClick={clearFilters}>
                                        Clear
                                    </Button>
                                    <Button variant="outline" onClick={downloadExcel}>
                                        <Download className="w-4 h-4 mr-2" />
                                        Excel
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Permits Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Vehicle Permit Requests</CardTitle>
                            <CardDescription>
                                Real-time permit requests with status updates
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>Employee</TableHead>
                                            <TableHead>Vehicle</TableHead>
                                            <TableHead>Usage Period</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Requested</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {permits.data.map((permit) => (
                                            <TableRow key={permit.id}>
                                                <TableCell className="font-mono text-sm">
                                                    #{permit.id}
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium">{permit.employee.name}</p>
                                                        <p className="text-sm text-gray-600">
                                                            {permit.employee_id} - {permit.employee.department}
                                                        </p>
                                                    </div>
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
                                                    <div>
                                                        <p className="text-sm">{formatDateTime(permit.created_at)}</p>
                                                        {permit.processed_at && (
                                                            <p className="text-sm text-gray-600">
                                                                Processed: {formatDateTime(permit.processed_at)}
                                                            </p>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex space-x-2">
                                                        {permit.status === 'pending' && (
                                                            <>
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    className="text-green-600 border-green-200 hover:bg-green-50"
                                                                    onClick={() => router.post(route('admin.permits.store'), { action: 'approve', permit_id: permit.id })}
                                                                >
                                                                    <UserCheck className="w-4 h-4 mr-1" />
                                                                    Approve
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    className="text-red-600 border-red-200 hover:bg-red-50"
                                                                    asChild
                                                                >
                                                                    <Link href={route('admin.permits.create', { permit_id: permit.id })}>
                                                                        <UserX className="w-4 h-4 mr-1" />
                                                                        Reject
                                                                    </Link>
                                                                </Button>
                                                            </>
                                                        )}
                                                        <Button size="sm" variant="ghost" disabled>
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination */}
                            {permits.last_page > 1 && (
                                <div className="flex items-center justify-between mt-6">
                                    <p className="text-sm text-gray-600">
                                        Showing {((permits.current_page - 1) * permits.per_page) + 1} to {Math.min(permits.current_page * permits.per_page, permits.total)} of {permits.total} results
                                    </p>
                                    <div className="flex space-x-2">
                                        {permits.links.map((link, index) => (
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