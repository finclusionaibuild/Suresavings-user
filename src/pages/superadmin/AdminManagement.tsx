import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  UserCheck,
  UserX,
  Shield,
  Crown,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Settings,
  Key,
  Building,
  MapPin
} from 'lucide-react';

const AdminManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const adminUsers = [
    {
      id: 1,
      name: 'David Support',
      email: 'support@suresavings.com',
      phone: '+234 801 234 5678',
      role: 'Support Admin',
      region: 'Lagos',
      permissions: ['user_management', 'transaction_support', 'kyc_verification'],
      lastActive: '2025-01-15T14:30:00Z',
      status: 'active',
      createdDate: '2024-01-15',
      createdBy: 'Super Admin',
      loginAttempts: 0,
      isSuperAdmin: false
    },
    {
      id: 2,
      name: 'Admin User',
      email: 'admin@suresavings.com',
      phone: '+234 802 345 6789',
      role: 'Regional Admin',
      region: 'Lagos',
      permissions: ['full_admin', 'analytics', 'user_management'],
      lastActive: '2025-01-15T12:15:00Z',
      status: 'active',
      createdDate: '2023-12-01',
      createdBy: 'Super Admin',
      loginAttempts: 0,
      isSuperAdmin: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Management</h1>
          <p className="text-gray-600">Create and manage admin accounts</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Users</h3>
          <div className="space-y-4">
            {adminUsers.map((admin) => (
              <div key={admin.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900">{admin.name}</h4>
                <p className="text-gray-600">{admin.email}</p>
                <p className="text-gray-600">{admin.role} - {admin.region}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;