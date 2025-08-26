import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, User, Mail, Phone, Building, Globe, MapPin, MessageSquare, Clock } from "lucide-react";
import { format } from "date-fns";

interface InvitationRequest {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  organization?: string;
  language: string;
  purpose: string;
  address: string;
  nationality: string;
  status: 'pending' | 'processed' | 'rejected';
  processed_at?: string;
  processed_by?: string;
  created_at: string;
  updated_at: string;
}

export default function InvitationLetterAdmin() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [requests, setRequests] = useState<InvitationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<InvitationRequest | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('invitation_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data as InvitationRequest[] || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast({
        title: "Error",
        description: "Failed to fetch invitation requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (requestId: string, status: 'processed' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('invitation_requests')
        .update({
          status,
          processed_at: new Date().toISOString(),
          processed_by: (await supabase.auth.getUser()).data.user?.id
        })
        .eq('id', requestId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Request marked as ${status}`,
      });

      fetchRequests();
      setSelectedRequest(null);
    } catch (error) {
      console.error('Error updating request:', error);
      toast({
        title: "Error",
        description: "Failed to update request status",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'processed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Processed</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <Helmet>
        <title>Invitation Letter Requests - Admin | PARIS 2025</title>
        <meta name="description" content="Manage invitation letter requests for PARIS 2025 conference" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Invitation Letter Requests
              </h1>
              <p className="text-muted-foreground">
                Manage and process invitation letter requests for PARIS 2025
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid gap-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Requests</p>
                          <p className="text-2xl font-bold">{requests.length}</p>
                        </div>
                        <CalendarDays className="w-8 h-8 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Pending</p>
                          <p className="text-2xl font-bold text-yellow-600">
                            {requests.filter(r => r.status === 'pending').length}
                          </p>
                        </div>
                        <Clock className="w-8 h-8 text-yellow-600" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Processed</p>
                          <p className="text-2xl font-bold text-green-600">
                            {requests.filter(r => r.status === 'processed').length}
                          </p>
                        </div>
                        <User className="w-8 h-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Requests Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>All Requests</CardTitle>
                    <CardDescription>
                      Click on a request to view details and manage status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Nationality</TableHead>
                          <TableHead>Language</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {requests.map((request) => (
                          <TableRow 
                            key={request.id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => setSelectedRequest(request)}
                          >
                            <TableCell className="font-medium">
                              {request.first_name} {request.last_name}
                            </TableCell>
                            <TableCell>{request.email}</TableCell>
                            <TableCell>{request.nationality}</TableCell>
                            <TableCell>{request.language}</TableCell>
                            <TableCell>{getStatusBadge(request.status)}</TableCell>
                            <TableCell>{format(new Date(request.created_at), 'MMM dd, yyyy')}</TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedRequest(request);
                                }}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Request Detail Modal */}
            {selectedRequest && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Request Details</CardTitle>
                        <CardDescription>
                          Submitted on {format(new Date(selectedRequest.created_at), 'MMMM dd, yyyy')}
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedRequest(null)}
                      >
                        Close
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-muted-foreground">Full Name</label>
                          <p className="font-medium">{selectedRequest.first_name} {selectedRequest.last_name}</p>
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Nationality</label>
                          <p className="font-medium">{selectedRequest.nationality}</p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        Contact Information
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            Email
                          </label>
                          <p className="font-medium">{selectedRequest.email}</p>
                        </div>
                        {selectedRequest.phone && (
                          <div>
                            <label className="text-sm text-muted-foreground flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              Phone
                            </label>
                            <p className="font-medium">{selectedRequest.phone}</p>
                          </div>
                        )}
                        <div>
                          <label className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            Address
                          </label>
                          <p className="font-medium">{selectedRequest.address}</p>
                        </div>
                      </div>
                    </div>

                    {/* Organization Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Building className="w-5 h-5" />
                        Organization Information
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-muted-foreground">Organization</label>
                          <p className="font-medium">{selectedRequest.organization || 'Not provided'}</p>
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground flex items-center gap-1">
                            <Globe className="w-4 h-4" />
                            Preferred Language
                          </label>
                          <p className="font-medium">{selectedRequest.language}</p>
                        </div>
                      </div>
                    </div>

                    {/* Purpose */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        Purpose of Visit
                      </h3>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p>{selectedRequest.purpose}</p>
                      </div>
                    </div>

                    {/* Status Management */}
                    <div className="space-y-4 border-t pt-4">
                      <h3 className="font-semibold text-lg">Status Management</h3>
                      <div className="flex items-center gap-4">
                        <div>
                          <label className="text-sm text-muted-foreground">Current Status</label>
                          <div className="mt-1">{getStatusBadge(selectedRequest.status)}</div>
                        </div>
                        {selectedRequest.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button
                              onClick={() => updateRequestStatus(selectedRequest.id, 'processed')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Mark as Processed
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => updateRequestStatus(selectedRequest.id, 'rejected')}
                            >
                              Mark as Rejected
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}