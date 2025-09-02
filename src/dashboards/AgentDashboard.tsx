import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  PieChart,
  UserCheck,
  AlertTriangle,
  Activity,
  Settings,
  Download,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  Plus,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  UserPlus,
  Bell
} from 'lucide-react';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import { generateRevenueData } from '../utils/chartData';

const AgentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const agentStats = [
    {
      title: 'Total Customers',
      value: '125',
      change: '+12',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Total Collections',
      value: '₦4.5M',
      change: '+18.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Active Groups',
      value: '8',
      change: '+2',
      trend: 'up',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Agent Earnings',
      value: '₦210K',
      change: '+8.7%',
      trend: 'up',
      icon: PieChart,
      color: 'orange'
    }
  ];

  const recentCustomers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      joinDate: '2025-01-15',
      savingsType: 'Individual',
      totalSavings: 150000,
      status: 'active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      joinDate: '2025-01-14',
      savingsType: 'Group',
      totalSavings: 75000,
      status: 'active'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      joinDate: '2025-01-13',
      savingsType: 'Individual',
      totalSavings: 250000,
      status: 'active'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      joinDate: '2025-01-12',
      savingsType: 'Group',
      totalSavings: 125000,
      status: 'inactive'
    }
  ];

  const savingsGroups = [
    {
      id: 1,
      name: 'Market Women Association',
      members: 15,
      totalSavings: '₦1.5M',
      contributionAmount: '₦10,000',
      frequency: 'Weekly',
      status: 'active'
    },
    {
      id: 2,
      name: 'Taxi Drivers Union',
      members: 20,
      totalSavings: '₦2.0M',
      contributionAmount: '₦5,000',
      frequency: 'Weekly',
      status: 'active'
    },
    {
      id: 3,
      name: 'Neighborhood Savings',
      members: 12,
      totalSavings: '₦600K',
      contributionAmount: '₦5,000',
      frequency: 'Weekly',
      status: 'active'
    }
  ];

  const pendingCollections = [
    {
      id: 1,
      customer: 'John Doe',
      type: 'Individual',
      amount: 10000,
      dueDate: '2025-01-16',
      status: 'pending'
    },
    {
      id: 2,
      customer: 'Market Women Association',
      type: 'Group',
      amount: 150000,
      dueDate: '2025-01-17',
      status: 'pending'
    },
    {
      id: 3,
      customer: 'Jane Smith',
      type: 'Individual',
      amount: 5000,
      dueDate: '2025-01-18',
      status: 'overdue'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

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
      case 'overdue':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'groups', label: 'Savings Groups', icon: TrendingUp },
    { id: 'collections', label: 'Collections', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Generate chart data
  const collectionData = generateRevenueData(6);

  // Collection trend chart data
  const collectionChartData = {
    labels: collectionData.labels,
    datasets: [
      {
        label: 'Collections',
        data: collectionData.data.map(val => val / 100000000), // Scale down for better display
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Group performance chart data
  const groupPerformanceData = {
    labels: savingsGroups.map(group => group.name),
    datasets: [
      {
        label: 'Total Savings',
        data: [1500000, 2000000, 600000],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(139, 92, 246, 0.7)'
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Agent Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <UserCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Agent Dashboard</h1>
                <p className="text-red-100 text-sm">Manage your customers and savings groups</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition-colors">
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Agent Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {agentStats.map((stat, index) => {
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

        {/* Charts and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Collection Trend Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Collection Trend</h3>
            <LineChart data={collectionChartData} height={280} />
          </div>

          {/* Group Performance Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Group Performance</h3>
            <BarChart data={groupPerformanceData} height={280} />
          </div>
        </div>

        {/* Pending Collections */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pending Collections</h3>
            <button className="text-red-600 hover:text-red-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
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
                {pendingCollections.map((collection) => (
                  <tr key={collection.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{collection.customer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {collection.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(collection.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(collection.dueDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(collection.status)}`}>
                        {collection.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-red-600 hover:text-red-900">
                        Collect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <button className="text-red-600 hover:text-red-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Collection from John Doe</p>
                <p className="text-sm text-gray-600">{formatCurrency(10000)} • 2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <UserPlus className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">New customer registered</p>
                <p className="text-sm text-gray-600">Sarah Wilson • 5 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <RefreshCw className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Group payout completed</p>
                <p className="text-sm text-gray-600">Market Women Association • 1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;