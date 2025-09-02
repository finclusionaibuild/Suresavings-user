import React, { useState } from 'react';
import { 
  Crown,
  Users, 
  DollarSign, 
  TrendingUp, 
  PieChart,
  Settings,
  Database,
  Shield,
  Activity,
  AlertTriangle,
  Server,
  Globe,
  BarChart3,
  UserCheck,
  Zap,
  Lock,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Filter,
  Search
} from 'lucide-react';

const SuperAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const platformStats = [
    {
      title: 'Total Platform Users',
      value: '1,247,856',
      change: '+15.2%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Total Platform Value',
      value: '₦125.8B',
      change: '+22.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Active Regions',
      value: '36',
      change: '+3',
      trend: 'up',
      icon: Globe,
      color: 'purple'
    },
    {
      title: 'System Uptime',
      value: '99.97%',
      change: '+0.02%',
      trend: 'up',
      icon: Server,
      color: 'orange'
    }
  ];

  const systemHealth = [
    { service: 'Authentication Service', status: 'healthy', uptime: '99.98%', responseTime: '45ms' },
    { service: 'Payment Gateway', status: 'healthy', uptime: '99.95%', responseTime: '120ms' },
    { service: 'Database Cluster', status: 'healthy', uptime: '99.99%', responseTime: '12ms' },
    { service: 'KYC Verification', status: 'warning', uptime: '99.85%', responseTime: '250ms' },
    { service: 'Notification Service', status: 'healthy', uptime: '99.92%', responseTime: '80ms' },
    { service: 'Analytics Engine', status: 'healthy', uptime: '99.96%', responseTime: '95ms' }
  ];

  const regionalData = [
    { region: 'Lagos', users: 425000, revenue: '₦45.2B', growth: '+18%', admins: 12 },
    { region: 'Abuja', users: 285000, revenue: '₦28.7B', growth: '+15%', admins: 8 },
    { region: 'Port Harcourt', users: 195000, revenue: '₦19.5B', growth: '+22%', admins: 6 },
    { region: 'Kano', users: 165000, revenue: '₦16.8B', growth: '+12%', admins: 5 },
    { region: 'Ibadan', users: 145000, revenue: '₦14.2B', growth: '+20%', admins: 4 },
    { region: 'Other Regions', users: 32856, revenue: '₦1.4B', growth: '+8%', admins: 15 }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'critical',
      message: 'High memory usage detected on DB-Cluster-03',
      timestamp: '2025-01-15 14:30',
      status: 'unread',
      region: 'Global'
    },
    {
      id: 2,
      type: 'warning',
      message: 'KYC verification service experiencing delays',
      timestamp: '2025-01-15 13:45',
      status: 'acknowledged',
      region: 'Lagos'
    },
    {
      id: 3,
      type: 'info',
      message: 'Scheduled maintenance completed successfully',
      timestamp: '2025-01-15 10:00',
      status: 'resolved',
      region: 'Global'
    },
    {
      id: 4,
      type: 'warning',
      message: 'Unusual transaction pattern detected in Abuja region',
      timestamp: '2025-01-15 08:15',
      status: 'investigating',
      region: 'Abuja'
    }
  ];

  const adminUsers = [
    {
      id: 1,
      name: 'David Support',
      email: 'support@suresavings.com',
      role: 'Support Admin',
      region: 'Lagos',
      lastActive: '2025-01-15 14:30',
      status: 'active',
      permissions: ['user_management', 'transaction_support']
    },
    {
      id: 2,
      name: 'Admin User',
      email: 'admin@suresavings.com',
      role: 'Regional Admin',
      region: 'Lagos',
      lastActive: '2025-01-15 12:15',
      status: 'active',
      permissions: ['full_admin', 'analytics', 'user_management']
    },
    {
      id: 3,
      name: 'Sarah Manager',
      email: 'sarah.manager@suresavings.com',
      role: 'Regional Manager',
      region: 'Abuja',
      lastActive: '2025-01-15 11:45',
      status: 'active',
      permissions: ['regional_admin', 'reporting']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'active':
      case 'resolved':
        return 'bg-green-100 text-green-700';
      case 'warning':
      case 'acknowledged':
      case 'investigating':
        return 'bg-yellow-100 text-yellow-700';
      case 'critical':
      case 'error':
      case 'inactive':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'info':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatCurrency = (amount: string) => {
    return amount;
  };

  const tabs = [
    { id: 'overview', label: 'Platform Overview', icon: BarChart3 },
    { id: 'regions', label: 'Regional Management', icon: Globe },
    { id: 'admins', label: 'Admin Management', icon: UserCheck },
    { id: 'system', label: 'System Health', icon: Activity },
    { id: 'security', label: 'Security Center', icon: Shield },
    { id: 'settings', label: 'Global Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Super Admin Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Super Admin Dashboard</h1>
                <p className="text-purple-100 text-sm">Platform-wide control center</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
                <AlertTriangle className="h-5 w-5" />
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition-colors">
                <Download className="h-4 w-4" />
                <span>Export Global Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Platform Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Platform Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platformStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm text-green-600">{stat.change}</span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                        <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Global Analytics and Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Global Performance Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Global Platform Performance</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Global analytics chart</p>
                    <p className="text-sm text-gray-400">Real-time platform metrics</p>
                  </div>
                </div>
              </div>

              {/* Critical Alerts */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Critical System Alerts</h3>
                  <span className="text-sm text-gray-500">{systemAlerts.length} alerts</span>
                </div>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium">{alert.message}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                              {alert.status}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-xs opacity-75">
                            <span>{alert.timestamp}</span>
                            <span>{alert.region}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regional Management Tab */}
        {activeTab === 'regions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Regional Management</h2>
              <button className="flex items-center space-x-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
                <Plus className="h-4 w-4" />
                <span>Add Region</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Regional Performance</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Region
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Users
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Growth
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Admins
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {regionalData.map((region, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{region.region}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {region.users.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {region.revenue}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-green-600 font-medium">{region.growth}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {region.admins}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-purple-600 hover:text-purple-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Settings className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Admin Management Tab */}
        {activeTab === 'admins' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Admin User Management</h2>
              <button className="flex items-center space-x-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
                <Plus className="h-4 w-4" />
                <span>Add Admin</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Platform Administrators</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Admin
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Region
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Active
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {adminUsers.map((admin) => (
                      <tr key={admin.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                            <div className="text-sm text-gray-500">{admin.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {admin.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {admin.region}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {admin.lastActive}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(admin.status)}`}>
                            {admin.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-purple-600 hover:text-purple-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Lock className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* System Health Tab */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">System Health Monitoring</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {systemHealth.map((service, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{service.service}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(service.status)}`}>
                      {service.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Uptime</p>
                      <p className="text-xl font-bold text-gray-900">{service.uptime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Response Time</p>
                      <p className="text-xl font-bold text-gray-900">{service.responseTime}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          service.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: service.uptime }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security Center Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Security Center</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-8 w-8 text-green-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Security Score</h3>
                    <p className="text-2xl font-bold text-green-600">98.5%</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Overall platform security rating</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Lock className="h-8 w-8 text-blue-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Active Sessions</h3>
                    <p className="text-2xl font-bold text-blue-600">1,247</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Current admin sessions</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="h-8 w-8 text-yellow-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Security Alerts</h3>
                    <p className="text-2xl font-bold text-yellow-600">3</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Pending security issues</p>
              </div>
            </div>
          </div>
        )}

        {/* Global Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Global Platform Settings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Configuration</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Maintenance Mode</span>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">New User Registration</span>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-500">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Global Notifications</span>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-500">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Limits</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Max Daily Transactions</span>
                    <input type="number" value="1000000" className="w-24 px-2 py-1 border border-gray-300 rounded text-center" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Max User Sessions</span>
                    <input type="number" value="50000" className="w-24 px-2 py-1 border border-gray-300 rounded text-center" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">API Rate Limit (per minute)</span>
                    <input type="number" value="1000" className="w-24 px-2 py-1 border border-gray-300 rounded text-center" />
                  </div>
                </div>
                <button className="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg font-medium transition-colors">
                  Update Global Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;