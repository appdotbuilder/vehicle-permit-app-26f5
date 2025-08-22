import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, XCircle, User, Car, Clock } from 'lucide-react';

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
    created_at: string;
    employee: Employee;
}

interface Props {
    permit: VehiclePermit;
    [key: string]: unknown;
}

export default function RejectPermit({ permit }: Props) {
    const [rejectionReason, setRejectionReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        router.post(route('admin.permits.store'), {
            action: 'reject',
            permit_id: permit.id,
            rejection_reason: rejectionReason
        }, {
            onSuccess: () => {
                setIsSubmitting(false);
            },
            onError: () => {
                setIsSubmitting(false);
            }
        });
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <Head title={`Reject Permit Request #${permit.id}`} />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/admin">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Dashboard
                                </Link>
                            </Button>
                            <div className="flex items-center space-x-3">
                                <div className="bg-red-600 p-2 rounded-lg">
                                    <XCircle className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">❌ Reject Permit Request</h1>
                                    <p className="text-gray-600">Provide a reason for rejecting this permit request</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Permit Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Car className="w-5 h-5" />
                                    <span>Permit Request Details</span>
                                </CardTitle>
                                <CardDescription>
                                    Request ID: #{permit.id}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Employee Info */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <User className="w-4 h-4 text-gray-600" />
                                        <h3 className="font-semibold">Employee Information</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Name</p>
                                            <p className="font-medium">{permit.employee.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Employee ID</p>
                                            <p className="font-medium">{permit.employee_id}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Department</p>
                                            <p className="font-medium">{permit.employee.department}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Grade</p>
                                            <p className="font-medium">{permit.employee.grade}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Vehicle Info */}
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <Car className="w-4 h-4 text-blue-600" />
                                        <h3 className="font-semibold">Vehicle Information</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Vehicle Type</p>
                                            <p className="font-medium">{permit.vehicle_type}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">License Plate</p>
                                            <p className="font-medium">{permit.license_plate}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Usage Period */}
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <Clock className="w-4 h-4 text-green-600" />
                                        <h3 className="font-semibold">Usage Period</h3>
                                    </div>
                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-sm text-gray-600">Start Date & Time</p>
                                            <p className="font-medium">{formatDateTime(permit.usage_start)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">End Date & Time</p>
                                            <p className="font-medium">{formatDateTime(permit.usage_end)}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Purpose */}
                                {permit.purpose && (
                                    <div>
                                        <h3 className="font-semibold mb-2">Purpose</h3>
                                        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{permit.purpose}</p>
                                    </div>
                                )}

                                {/* Status */}
                                <div>
                                    <h3 className="font-semibold mb-2">Current Status</h3>
                                    <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">
                                        Pending Review
                                    </Badge>
                                </div>

                                {/* Request Date */}
                                <div>
                                    <h3 className="font-semibold mb-2">Requested On</h3>
                                    <p className="text-gray-700">{formatDateTime(permit.created_at)}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Rejection Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2 text-red-600">
                                    <XCircle className="w-5 h-5" />
                                    <span>Rejection Form</span>
                                </CardTitle>
                                <CardDescription>
                                    Please provide a clear reason for rejecting this permit request
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <Label htmlFor="rejection_reason">Reason for Rejection *</Label>
                                        <Textarea
                                            id="rejection_reason"
                                            value={rejectionReason}
                                            onChange={(e) => setRejectionReason(e.target.value)}
                                            placeholder="Please provide a detailed reason for rejecting this permit request..."
                                            rows={6}
                                            required
                                            className="mt-2"
                                        />
                                        <p className="text-sm text-gray-600 mt-2">
                                            This reason will be sent to the employee via WhatsApp notification.
                                        </p>
                                    </div>

                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-red-800 mb-2">⚠️ Rejection Impact</h4>
                                        <ul className="text-sm text-red-700 space-y-1">
                                            <li>• The employee will receive a WhatsApp notification about the rejection</li>
                                            <li>• The permit status will be permanently marked as "Rejected"</li>
                                            <li>• The employee can submit a new request if needed</li>
                                        </ul>
                                    </div>

                                    <div className="flex space-x-4">
                                        <Button
                                            type="submit"
                                            variant="destructive"
                                            disabled={isSubmitting || !rejectionReason.trim()}
                                            className="flex-1"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                    Rejecting...
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle className="w-4 h-4 mr-2" />
                                                    Reject Permit Request
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={isSubmitting}
                                            asChild
                                        >
                                            <Link href="/admin">
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