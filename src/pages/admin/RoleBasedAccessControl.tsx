import React, { useState } from 'react';
import {
  Shield,
  Users,
  Key,
  Lock,
  Unlock,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Crown,
  UserCheck,
  Building,
  Code,
  Save,
  Copy,
  MoreVertical
} from 'lucide-react';

const RoleBasedAccessControl: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
  const [showAssignRoleModal, setShowAssignRoleModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    level: 'support',
    permissions: [] as string[],
    status: 'active'
  });

  const roles = [
    {
      id: 1,
      name: 'Super Admin',
      description: 'Complete platform control with all permissions',
      userCount: 2,
      status: 'active',
      permissions: [
        'platform_management',
        'user_management',
        'admin_management',
        'system_configuration',
        'security_management',
        'compliance_oversight',
        'financial_oversight',
        'audit_access',
        'backup_management',
        'integration_management'
      ],
      level: 'system',
      createdDate: '2023-01-01',
      lastModified: '2025-01-10',
      createdBy: 'System',
      canDelete: false
    },
    {
      id: 2,
      name: 'Regional Admin',
      description: 'Regional management with user and transaction oversight',
      userCount: 8,
      status: 'active',
      permissions: [
        'user_management',
        'transaction_management',
        'kyc_verification',
        'savings_management',
        'investment_oversight',
        'analytics_access',
        'support_management',
        'agent_management'
      ],
      level: 'regional',
      createdDate: '2023-01-15',
      lastModified: '2025-01-08',
      createdBy: 'Super Admin',
      canDelete: true
    },
    {
      id: 3,
      name: 'Support Admin',
      description: 'Customer support with limited administrative access',
      userCount: 15,
      status: 'active',
      permissions: [
        'user_view',
        'support_management',
        'ticket_management',
        'kyc_review',
        'transaction_view',
        'communication_management'
      ],
      level: 'support',
      createdDate: '2023-02-01',
      lastModified: '2025-01-05',
      createdBy: 'Super Admin',
      canDelete: true
    },
    {
      id: 4,
      name: 'Compliance Officer',
      description: 'Compliance and regulatory oversight',
      userCount: 5,
      status: 'active',
      permissions: [
        'compliance_management',
        'audit_access',
        'kyc_oversight',
        'aml_monitoring',
        'regulatory_reporting',
        'risk_assessment'
      ],
      level: 'compliance',
      createdDate: '2023-03-01',
      lastModified: '2024-12-20',
      createdBy: 'Super Admin',
      canDelete: true
    },
    {
      id: 5,
      name: 'Financial Analyst',
      description: 'Financial data analysis and reporting',
      userCount: 3,
      status: 'active',
      permissions: [
        'analytics_access',
        'financial_reporting',
        'investment_analysis',
        'savings_analytics',
        'performance_monitoring'
      ],
      level: 'analyst',
      createdDate: '2023-04-01',
      lastModified: '2024-11-15',
      createdBy: 'Regional Admin',
      canDelete: true
    },
    {
      id: 6,
      name: 'Agent Supervisor',
      description: 'Supervise field agents and group savings',
      userCount: 12,
      status: 'active',
      permissions: [
        'agent_management',
        'group_savings_oversight',
        'collection_monitoring',
        'agent_performance_tracking',
        'commission_management'
      ],
      level: 'supervisor',
      createdDate: '2023-05-01',
      lastModified: '2024-12-10',
      createdBy: 'Regional Admin',
      canDelete: true
    }
  ];

  const permissions = [
    // System Level
    { id: 'platform_management', name: 'Platform Management', category: 'System', description: 'Manage platform-wide settings and configurations' },
    { id: 'system_configuration', name: 'System Configuration', category: 'System', description: 'Configure system parameters and settings' },
    { id: 'security_management', name: 'Security Management', category: 'Security', description: 'Manage security policies and access controls' },
    { id: 'backup_management', name: 'Backup Management', category: 'System', description: 'Manage system backups and recovery' },
    { id: 'integration_management', name: 'Integration Management', category: 'System', description: 'Manage third-party integrations' },
    
    // User Management
    { id: 'user_management', name: 'User Management', category: 'Users', description: 'Full user account management capabilities' },
    { id: 'user_view', name: 'User View', category: 'Users', description: 'View user accounts and basic information' },
    { id: 'admin_management', name: 'Admin Management', category: 'Administration', description: 'Manage admin accounts and roles' },
    { id: 'agent_management', name: 'Agent Management', category: 'Operations', description: 'Manage field agents and supervisors' },
    
    // Financial
    { id: 'transaction_management', name: 'Transaction Management', category: 'Finance', description: 'Manage and monitor transactions' },
    { id: 'transaction_view', name: 'Transaction View', category: 'Finance', description: 'View transaction history and details' },
    { id: 'savings_management', name: 'Savings Management', category: 'Products', description: 'Manage savings plans and configurations' },
    { id: 'investment_oversight', name: 'Investment Oversight', category: 'Products', description: 'Oversee investment products and performance' },
    { id: 'financial_oversight', name: 'Financial Oversight', category: 'Finance', description: 'Overall financial system oversight' },
    { id: 'financial_reporting', name: 'Financial Reporting', category: 'Finance', description: 'Generate financial reports and statements' },
    
    // Compliance
    { id: 'compliance_management', name: 'Compliance Management', category: 'Compliance', description: 'Manage compliance requirements and policies' },
    { id: 'compliance_oversight', name: 'Compliance Oversight', category: 'Compliance', description: 'Overall compliance monitoring and oversight' },
    { id: 'kyc_verification', name: 'KYC Verification', category: 'Compliance', description: 'Verify customer identity documents' },
    { id: 'kyc_review', name: 'KYC Review', category: 'Compliance', description: 'Review KYC submissions and status' },
    { id: 'kyc_oversight', name: 'KYC Oversight', category: 'Compliance', description: 'Oversee KYC processes and compliance' },
    { id: 'aml_monitoring', name: 'AML Monitoring', category: 'Compliance', description: 'Monitor anti-money laundering compliance' },
    { id: 'regulatory_reporting', name: 'Regulatory Reporting', category: 'Compliance', description: 'Generate regulatory compliance reports' },
    { id: 'risk_assessment', name: 'Risk Assessment', category: 'Risk', description: 'Assess and manage operational risks' },
    { id: 'audit_access', name: 'Audit Access', category: 'Compliance', description: 'Access audit trails and logs' },
    
    // Analytics
    { id: 'analytics_access', name: 'Analytics Access', category: 'Analytics', description: 'Access analytics dashboards and reports' },
    { id: 'investment_analysis', name: 'Investment Analysis', category: 'Analytics', description: 'Analyze investment performance and trends' },
    { id: 'savings_analytics', name: 'Savings Analytics', category: 'Analytics', description: 'Analyze savings plan performance' },
    { id: 'performance_monitoring', name: 'Performance Monitoring', category: 'Analytics', description: 'Monitor system and business performance' },
    
    // Support & Communication
    { id: 'support_management', name: 'Support Management', category: 'Support', description: 'Manage customer support operations' },
    { id: 'ticket_management', name: 'Ticket Management', category: 'Support', description: 'Handle support tickets and resolutions' },
    { id: 'communication_management', name: 'Communication Management', category: 'Marketing', description: 'Manage customer communications and campaigns' },
    
    // Operations
    { id: 'group_savings_oversight', name: 'Group Savings Oversight', category: 'Operations', description: 'Oversee group savings and Esusu operations' },
    { id: 'collection_monitoring', name: 'Collection Monitoring', category: 'Operations', description: 'Monitor agent collections and payments' },
    { id: 'agent_performance_tracking', name: 'Agent Performance Tracking', category: 'Operations', description: 'Track agent performance metrics' },
    { id: 'commission_management', name: 'Commission Management', category: 'Operations', description: 'Manage agent commissions and payouts' }
  ];

  const adminUsers = [
    {
      id: 1,
      name: 'David Support',
      email: 'support@suresavings.com',
      role: 'Support Admin',
      roleId: 3,
      status: 'active',
      lastLogin: '2025-01-15T14:30:00Z',
      createdDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Admin User',
      email: 'admin@suresavings.com',
      role: 'Regional Admin',
      roleId: 2,
      status: 'active',
      lastLogin: '2025-01-15T12:15:00Z',
      createdDate: '2023-12-01'
    },
    {
      id: 3,
      name: 'Sarah Manager',
      email: 'sarah.manager@suresavings.com',
      role: 'Regional Admin',
      roleId: 2,
      status: 'active',
      lastLogin: '2025-01-15T11:45:00Z',
      createdDate: '2024-03-10'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'active', label: 'Active Roles' },
    { value: 'inactive', label: 'Inactive Roles' },
    { value: 'system', label: 'System Level' },
    { value: 'regional', label: 'Regional Level' },
    { value: 'support', label: 'Support Level' },
    { value: 'compliance', label: 'Compliance Level' }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'inactive':
        return 'bg-red-100 text-red-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'system':
        return 'bg-purple-100 text-purple-700';
      case 'regional':
        return 'bg-blue-100 text-blue-700';
      case 'support':
        return 'bg-green-100 text-green-700';
      case 'compliance':
        return 'bg-orange-100 text-orange-700';
      case 'analyst':
        return 'bg-indigo-100 text-indigo-700';
      case 'supervisor':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'system':
        return Crown;
      case 'regional':
        return Building;
      case 'support':
        return UserCheck;
      case 'compliance':
        return Shield;
      case 'analyst':
        return Code;
      case 'supervisor':
        return Users;
      default:
        return Key;
    }
  };

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         role.status === selectedFilter ||
                         role.level === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleCreateRole = () => {
    console.log('Creating role:', newRole);
    setShowCreateRoleModal(false);
    setNewRole({
      name: '',
      description: '',
      level: 'support',
      permissions: [],
      status: 'active'
    });
  };

  const handleRoleAction = (action: string, roleId: number) => {
    console.log(`${action} role:`, roleId);
  };

  const handleAssignRole = () => {
    console.log('Assigning role:', { user: selectedUser, role: selectedRole });
    setShowAssignRoleModal(false);
    setSelectedUser(null);
    setSelectedRole(null);
  };

  const togglePermission = (permissionId: string) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, typeof permissions>);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <img 
                src="/image.png" 
                alt="RBAC Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(139, 92, 246, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Role-Based Access Control</h1>
              <p className="text-gray-600">Define roles, manage permissions, and control access to admin features</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Roles</p>
                <p className="text-2xl font-bold text-gray-900">{roles.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Roles</p>
                <p className="text-2xl font-bold text-green-600">
                  {roles.filter(r => r.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Admins</p>
                <p className="text-2xl font-bold text-blue-600">
                  {roles.reduce((sum, r) => sum + r.userCount, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Key className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Permissions</p>
                <p className="text-2xl font-bold text-orange-600">{permissions.length}</p>
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
                  placeholder="Search roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>

              <button
                onClick={() => setShowCreateRoleModal(true)}
                className="flex items-center space-x-2 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Create Role</span>
              </button>

              <button
                onClick={() => setShowAssignRoleModal(true)}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors"
              >
                <UserCheck className="h-4 w-4" />
                <span>Assign Role</span>
              </button>
            </div>
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredRoles.map((role) => {
            const LevelIcon = getLevelIcon(role.level);
            return (
              <div key={role.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${getLevelColor(role.level)}`}>
                      <LevelIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(role.level)}`}>
                        {role.level}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(role.status)}`}>
                      {role.status}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{role.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Users:</span>
                    <span className="font-medium">{role.userCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Permissions:</span>
                    <span className="font-medium">{role.permissions.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Created:</span>
                    <span className="font-medium">{formatDate(role.createdDate)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Modified:</span>
                    <span className="font-medium">{formatDate(role.lastModified)}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedRole(role);
                      setShowPermissionsModal(true);
                    }}
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    View Permissions
                  </button>
                  <button
                    onClick={() => handleRoleAction('edit', role.id)}
                    className="px-3 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  {role.canDelete && (
                    <button
                      onClick={() => handleRoleAction('delete', role.id)}
                      className="px-3 py-2 border border-red-300 hover:border-red-400 text-red-600 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Role Assignments Table */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <img src="/image.png" alt="Assignments Mascot" className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-gray-900">Role Assignments</h3>
            </div>
            <button
              onClick={() => setShowAssignRoleModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              <UserCheck className="h-4 w-4" />
              <span>Assign Role</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admin User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {adminUsers.map((user) => {
                  const userRole = roles.find(r => r.id === user.roleId);
                  const LevelIcon = userRole ? getLevelIcon(userRole.level) : Key;
                  
                  return (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gray-100 p-2 rounded-lg">
                            <LevelIcon className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          userRole ? getLevelColor(userRole.level) : 'bg-gray-100 text-gray-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(user.lastLogin)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowAssignRoleModal(true);
                            }}
                            className="text-purple-600 hover:text-purple-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Lock className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Role Modal */}
        {showCreateRoleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="Create Role Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">Create New Role</h3>
                </div>
                <button
                  onClick={() => setShowCreateRoleModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
                    <input
                      type="text"
                      value={newRole.name}
                      onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g., Content Manager"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role Level</label>
                    <select
                      value={newRole.level}
                      onChange={(e) => setNewRole({...newRole, level: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="support">Support Level</option>
                      <option value="analyst">Analyst Level</option>
                      <option value="supervisor">Supervisor Level</option>
                      <option value="compliance">Compliance Level</option>
                      <option value="regional">Regional Level</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newRole.description}
                    onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe the role and its responsibilities..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">Permissions</label>
                  <div className="space-y-6">
                    {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                      <div key={category}>
                        <h4 className="text-md font-semibold text-gray-900 mb-3">{category}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {categoryPermissions.map((permission) => (
                            <div key={permission.id} className="flex items-start space-x-3">
                              <input
                                type="checkbox"
                                id={permission.id}
                                checked={newRole.permissions.includes(permission.id)}
                                onChange={() => togglePermission(permission.id)}
                                className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                              />
                              <div className="flex-1">
                                <label htmlFor={permission.id} className="text-sm font-medium text-gray-900 cursor-pointer">
                                  {permission.name}
                                </label>
                                <p className="text-xs text-gray-500">{permission.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowCreateRoleModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateRole}
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Create Role
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Assign Role Modal */}
        {showAssignRoleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="Assign Role Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">Assign Role</h3>
                </div>
                <button
                  onClick={() => setShowAssignRoleModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select User</label>
                  <select
                    value={selectedUser?.id || ''}
                    onChange={(e) => setSelectedUser(adminUsers.find(u => u.id === parseInt(e.target.value)))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Choose a user...</option>
                    {adminUsers.map(user => (
                      <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Role</label>
                  <select
                    value={selectedRole?.id || ''}
                    onChange={(e) => setSelectedRole(roles.find(r => r.id === parseInt(e.target.value)))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Choose a role...</option>
                    {roles.filter(r => r.status === 'active').map(role => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                </div>

                {selectedRole && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Role Details</h4>
                    <p className="text-sm text-gray-600 mb-2">{selectedRole.description}</p>
                    <p className="text-xs text-gray-500">
                      {selectedRole.permissions.length} permissions • {selectedRole.level} level
                    </p>
                  </div>
                )}
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowAssignRoleModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignRole}
                  disabled={!selectedUser || !selectedRole}
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-medium disabled:opacity-50 transition-colors"
                >
                  Assign Role
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Permissions Modal */}
        {showPermissionsModal && selectedRole && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="Permissions Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">{selectedRole.name} Permissions</h3>
                </div>
                <button
                  onClick={() => setShowPermissionsModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                  <div key={category}>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">{category}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {categoryPermissions.map((permission) => (
                        <div key={permission.id} className={`p-4 rounded-lg border ${
                          selectedRole.permissions.includes(permission.id)
                            ? 'border-green-200 bg-green-50'
                            : 'border-gray-200 bg-gray-50'
                        }`}>
                          <div className="flex items-center space-x-3">
                            {selectedRole.permissions.includes(permission.id) ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <XCircle className="h-5 w-5 text-gray-400" />
                            )}
                            <div>
                              <h5 className="font-medium text-gray-900">{permission.name}</h5>
                              <p className="text-sm text-gray-600">{permission.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={() => setShowPermissionsModal(false)}
                  className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleBasedAccessControl;