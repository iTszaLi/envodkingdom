import React from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useGetStats, useListInquiries } from "@workspace/api-client-react";
import { Package, Users, Activity, Clock } from "lucide-react";

export default function AdminDashboard() {
  const { data: stats } = useGetStats();
  const { data: inquiriesData } = useListInquiries({ status: 'new', page: 1 });

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-card p-6 rounded-xl border border-white/5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-1">Total Shipments</p>
              <h3 className="text-3xl font-bold text-white">{stats?.shipmentsDelivered || 0}</h3>
            </div>
            <div className="p-3 bg-secondary/20 rounded-lg text-secondary">
              <Package className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-xl border border-white/5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-1">Active Clients</p>
              <h3 className="text-3xl font-bold text-white">{stats?.corporateClients || 0}</h3>
            </div>
            <div className="p-3 bg-primary/40 rounded-lg text-blue-400">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-white/5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-1">On-Time Rate</p>
              <h3 className="text-3xl font-bold text-white">{stats?.onTimeDeliveryRate || 0}%</h3>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg text-green-400">
              <Activity className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-white/5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-1">New Inquiries</p>
              <h3 className="text-3xl font-bold text-white">{inquiriesData?.total || 0}</h3>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-lg text-yellow-400">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-white mb-6">Recent Inquiries</h2>
      <div className="bg-card rounded-xl border border-white/5 overflow-hidden">
        <table className="w-full text-left text-sm text-white/80">
          <thead className="bg-primary/50 text-xs uppercase bg-white/5">
            <tr>
              <th className="px-6 py-4 font-medium text-muted-foreground">Name</th>
              <th className="px-6 py-4 font-medium text-muted-foreground">Service</th>
              <th className="px-6 py-4 font-medium text-muted-foreground">Date</th>
              <th className="px-6 py-4 font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {inquiriesData?.inquiries?.map((inquiry) => (
              <tr key={inquiry.id} className="hover:bg-white/5">
                <td className="px-6 py-4">
                  <div className="font-medium text-white">{inquiry.name}</div>
                  <div className="text-muted-foreground text-xs">{inquiry.email}</div>
                </td>
                <td className="px-6 py-4">{inquiry.serviceType}</td>
                <td className="px-6 py-4">{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className="bg-secondary/20 text-secondary px-2 py-1 rounded text-xs font-medium uppercase">
                    {inquiry.status}
                  </span>
                </td>
              </tr>
            ))}
            {(!inquiriesData?.inquiries || inquiriesData.inquiries.length === 0) && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                  No new inquiries.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
