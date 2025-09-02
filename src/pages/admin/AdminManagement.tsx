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
  MapPin,
  AlertTriangle,
  RefreshCw,
  Send,
  MoreVertical
} from 'lucide-react';

const AdminManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const [selectedAdmins, setSelectedAdmins] = useState<number[]>([]);

  const [newAdmin, setNewAdmin] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    region: '',
    permissions: [] as string[],
    temporaryPassword: '',
    requirePasswordChange: true
  });

  const adminUsers = [
    {
      id: 1,
      firstName: 'David',
      lastName: 'Support',
      email: 'support@suresavings.com',
      phone: '+234 801 234 5678',
      role: 'Support Admin',
      roleId: 3,
      region: 'Lagos',
      permissions: ['user_management', 'transaction_support', 'kyc_verification'],
      lastActive: '2025-01-15T14:30:00Z',
      status: 'active',
      createdDate: '2024-01-15',
      createdBy: 'Super Admin',
      loginAttempts: 0,
      lastPasswordChange: '2024-12-01',
      twoFactorEnabled: true,
      profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      department: 'Customer Support',
      employeeId: 'EMP001'
    },
    {
      id: 2,
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@suresavings.com',
      phone: '+234 802 345 6789',
      role: 'Regional Admin',
      roleId: 2,
      region: 'Lagos',
      permissions: ['full_admin', 'analytics', 'user_management'],
      lastActive: '2025-01-15T12:15:00Z',
      status: 'active',
      createdDate: '2023-12-01',
      createdBy: 'Super Admin',
      loginAttempts: 0,
      lastPasswordChange: '2024-11-15',
      twoFactorEnabled: true,
      profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      department: 'Administration',
      employeeId: 'EMP002'
    },
    {
      id: 3,
      firstName: 'Sarah',
      lastName: 'Manager',
      email: 'sarah.manager@suresavings.com',
      phone: '+234 803 456 7890',
      role: 'Regional Manager',
      roleId: 2,
      region: 'Abuja',
      permissions: ['regional_admin', 'reporting'],
      lastActive: '2025-01-15T11:45:00Z',
      status: 'active',
      createdDate: '2024-03-10',
      createdBy: 'Super Admin',
      loginAttempts: 0,
      lastPasswordChange: '2024-10-20',
      twoFactorEnabled: false,
      profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      department: 'Regional Operations',
      employeeId: 'EMP003'
    },
    {
      id: 4,
      firstName: 'Michael',
      lastName: 'Compliance',
      email: 'compliance@suresavings.com',
      phone: '+234 804 567 8901',
      role: 'Compliance Officer',
      roleId: 4,
      region: 'Lagos',
      permissions: ['compliance_management', 'audit_access', 'kyc_oversight'],
      lastActive: '2025-01-14T16:20:00Z',
      status: 'active',
      createdDate: '2024-06-01',
      createdBy: 'Super Admin',
      loginAttempts: 0,
      lastPasswordChange: '2024-09-15',
      twoFactorEnabled: true,
      profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      department: 'Compliance',
      employeeId: 'EMP004'
    },
    {
      id: 5,
      firstName: 'John',
      lastName: 'Suspended',
      email: 'john.suspended@suresavings.com',
      phone: '+234 805 678 9012',
      role: 'Support Admin',
      roleId: 3,
      region: 'Port Harcourt',
      permissions: [],
      lastActive: '2025-01-10T08:30:00Z',
      status: 'suspended',
      createdDate: '2024-08-15',
      createdBy: 'Regional Admin',
      loginAttempts: 5,
      lastPasswordChange: '2024-08-15',
      twoFactorEnabled: false,
      profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      department: 'Customer Support',
      employeeId: 'EMP005'
    }
  ];

  const roles = [
    { id: 2, name: 'Regional Admin' },
    { id: 3, name: 'Support Admin' },
    { id: 4, name: 'Compliance Officer' },
    { id: 5, name: 'Financial Analyst' },
    { id: 6, name: 'Agent Supervisor' }
  ];

  const regions = [
    'Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Kaduna', 'Jos', 'Enugu'
  ];

  const departments = [
    'Administration', 'Customer Support', 'Compliance', 'Finance', 'Operations', 'Technology', 'Marketing'
  ];

  const filterOptions = [
    { value: 'all', label: 'All Admins' },
    { value: 'active', label: 'Active' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'locked', label: 'Locked' },
    { value: 'pending', label: 'Pending Activation' },
    { value: 'regional_admin', label: 'Regional Admins' },
    { value: 'support_admin', label: 'Support Admins' },
    { value: 'compliance_officer', label: 'Compliance Officers' }
  ];

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-NG', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-NG', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'suspended':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'locked':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'pending':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return CheckCircle;
      case 'suspended':
        return XCircle;
      case 'locked':
        return Lock;
      case 'pending':
        return Clock;
      default:
        return AlertTriangle;
    }
  };

  const filteredAdmins = adminUsers.filter(admin => {
    const matchesSearch = admin.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         admin.status === selectedFilter ||
                         admin.role.toLowerCase().replace(' ', '_') === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleCreateAdmin = () => {
    console.log('Creating admin:', newAdmin);
    setShowCreateModal(false);
    setNewAdmin({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: '',
      region: '',
      permissions: [],
      temporaryPassword: '',
      requirePasswordChange: true
    });
  };

  const handleAdminAction = (action: string, adminId: number) => {
    console.log(`${action} admin:`, adminId);
    if (action === 'edit') {
      const admin = adminUsers.find(a => a.id === adminId);
      if (admin) {
        setSelectedAdmin(admin);
        setShowEditModal(true);
      }
    } else if (action === 'reset_password') {
      const admin = adminUsers.find(a => a.id === adminId);
      if (admin) {
        setSelectedAdmin(admin);
        setShowPasswordResetModal(true);
      }
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk ${action}:`, selectedAdmins);
    setSelectedAdmins([]);
  };

  const toggleSelectAdmin = (id: number) => {
    setSelectedAdmins(prev => 
      prev.includes(id) 
        ? prev.filter(adminId => adminId !== id)
        : [...prev, id]
    );
  };

  const selectAllAdmins = () => {
    if (selectedAdmins.length === filteredAdmins.length) {
      setSelectedAdmins([]);
    } else {
      setSelectedAdmins(filteredAdmins.map(admin => admin.id));
    }
  };

  const generateTemporaryPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewAdmin(prev => ({ ...prev, temporaryPassword: password }));
  };

  // Calculate stats
  const totalAdmins = adminUsers.length;
  const activeAdmins = adminUsers.filter(admin => admin.status === 'active').length;
  const suspendedAdmins = adminUsers.filter(admin => admin.status === 'suspended').length;
  const lockedAdmins = adminUsers.filter(admin => admin.loginAttempts >= 5).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <img 
                src="/image.png" 
                alt="Admin Management Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Management</h1>
              <p className="text-gray-600">Create, manage, and control admin user accounts and permissions</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Admins</p>
                <p className="text-2xl font-bold text-gray-900">{totalAdmins}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{activeAdmins}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-3 rounded-lg">
                <UserX className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Suspended</p>
                <p className="text-2xl font-bold text-red-600">{suspendedAdmins}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Lock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Locked</p>
                <p className="text-2xl font-bold text-yellow-600">{lockedAdmins}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search admin users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>

              {selectedAdmins.length > 0 && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleBulkAction('activate')}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Activate ({selectedAdmins.length})
                  </button>
                  <button
                    onClick={() => handleBulkAction('suspend')}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Suspend ({selectedAdmins.length})
                  </button>
                </div>
              )}

              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Admin</span>
              </button>

              <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Admin Users Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img src="/image.png" alt="Admin Users Mascot" className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Admin Users ({filteredAdmins.length})
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedAdmins.length === filteredAdmins.length && filteredAdmins.length > 0}
                  onChange={selectAllAdmins}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-500">Select All</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Select</span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admin User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role & Region
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Security
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAdmins.map((admin) => {
                  const StatusIcon = getStatusIcon(admin.status);
                  const { date, time } = formatDateTime(admin.lastActive);
                  
                  return (
                    <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedAdmins.includes(admin.id)}
                          onChange={() => toggleSelectAdmin(admin.id)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <img
                            src={admin.profilePicture}
                            alt={`${admin.firstName} ${admin.lastName}`}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {admin.firstName} {admin.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{admin.employeeId}</div>
                            <div className="text-xs text-gray-400">{admin.department}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{admin.role}</div>
                        <div className="text-sm text-gray-500">{admin.region}</div>
                        <div className="text-xs text-gray-400">{admin.permissions.length} permissions</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{admin.email}</div>
                        <div className="text-sm text-gray-500">{admin.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {admin.twoFactorEnabled ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                              <Shield className="h-3 w-3 mr-1" />
                              2FA
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              No 2FA
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {admin.loginAttempts > 0 && `${admin.loginAttempts} failed attempts`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <StatusIcon className="h-4 w-4" />
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(admin.status)}`}>
                            {admin.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{date}</div>
                        <div className="text-sm text-gray-500">{time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleAdminAction('edit', admin.id)}
                            className="text-primary-600 hover:text-primary-900 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleAdminAction('reset_password', admin.id)}
                            className="text-blue-600 hover:text-blue-900 transition-colors"
                          >
                            <Key className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleAdminAction(admin.status === 'active' ? 'suspend' : 'activate', admin.id)}
                            className={`${admin.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'} transition-colors`}
                          >
                            {admin.status === 'active' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 transition-colors">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredAdmins.length === 0 && (
            <div className="p-12 text-center">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <img src="/image.png" alt="No Admins" className="w-8 h-8 opacity-50" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No admin users found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Create Admin Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="Create Admin Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">Create New Admin</h3>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={newAdmin.firstName}
                      onChange={(e) => setNewAdmin({...newAdmin, firstName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter first name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={newAdmin.lastName}
                      onChange={(e) => setNewAdmin({...newAdmin, lastName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter last name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={newAdmin.email}
                      onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={newAdmin.phone}
                      onChange={(e) => setNewAdmin({...newAdmin, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="+234 800 000 0000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <select
                      value={newAdmin.role}
                      onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select a role...</option>
                      {roles.map(role => (
                        <option key={role.id} value={role.name}>{role.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                    <select
                      value={newAdmin.region}
                      onChange={(e) => setNewAdmin({...newAdmin, region: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select a region...</option>
                      {regions.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Temporary Password</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newAdmin.temporaryPassword}
                      onChange={(e) => setNewAdmin({...newAdmin, temporaryPassword: e.target.value})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter temporary password"
                    />
                    <button
                      onClick={generateTemporaryPassword}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                    >
                      Generate
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Admin will be required to change password on first login
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="require-password-change"
                    checked={newAdmin.requirePasswordChange}
                    onChange={(e) => setNewAdmin({...newAdmin, requirePasswordChange: e.target.checked})}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="require-password-change" className="text-sm text-gray-700">
                    Require password change on first login
                  </label>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateAdmin}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Create Admin
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Password Reset Modal */}
        {showPasswordResetModal && selectedAdmin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="Password Reset Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">Reset Password</h3>
                </div>
                <button
                  onClick={() => setShowPasswordResetModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Admin Details</h4>
                  <p className="text-sm text-gray-600">
                    {selectedAdmin.firstName} {selectedAdmin.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{selectedAdmin.email}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="send-email"
                      name="resetMethod"
                      defaultChecked
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="send-email" className="text-sm text-gray-700">
                      Send password reset email to admin
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="generate-temp"
                      name="resetMethod"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="generate-temp" className="text-sm text-gray-700">
                      Generate temporary password
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="force-change"
                      defaultChecked
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="force-change" className="text-sm text-gray-700">
                      Force password change on next login
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="revoke-sessions"
                      defaultChecked
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="revoke-sessions" className="text-sm text-gray-700">
                      Revoke all active sessions
                    </label>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Security Notice</h4>
                      <p className="text-sm text-yellow-700">
                        This action will reset the admin's password and may revoke their current sessions. 
                        They will receive an email notification about this change.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowPasswordResetModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log('Resetting password for:', selectedAdmin.id);
                    setShowPasswordResetModal(false);
                    setSelectedAdmin(null);
                  }}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManagement;