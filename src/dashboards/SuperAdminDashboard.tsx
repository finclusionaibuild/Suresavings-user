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
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import { generateRevenueData, generateUserGrowthData } from '../utils/chartData';

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

  // Generate chart data
  const revenueData = generateRevenueData(12);
  const userGrowthData = generateUserGrowthData(12);

  // Platform performance chart data
  const platformChartData = {
    labels: revenueData.labels,
    datasets: [
      {
        label: 'Platform Revenue',
        data: revenueData.data,
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // User growth chart data
  const userGrowthChartData = {
    labels: userGrowthData.labels,
    datasets: [
      {
        label: 'Total Users',
        data: userGrowthData.data,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

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
        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Global Performance Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Global Platform Performance</h3>
            <LineChart data={platformChartData} height={280} />
          </div>

          {/* User Growth Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth Analytics</h3>
            <LineChart data={userGrowthChartData} height={280} />
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
            <span className="text-sm text-gray-500">{systemHealth.length} services</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemHealth.map((service, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{service.service}</h4>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(service.status)}`}>
                    {service.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Uptime:</span>
                    <span className="font-medium">{service.uptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response:</span>
                    <span className="font-medium">{service.responseTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Critical System Alerts</h3>
            <span className="text-sm text-gray-500">{systemAlerts.length} alerts</span>
          </div>
          <div className="space-y-3">
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
  );
};

export default SuperAdminDashboard;