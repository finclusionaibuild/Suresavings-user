import React, { useState } from 'react';
import {
  Users,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  UserPlus,
  UserCheck,
  Calendar,
  RefreshCw,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import BarChart from '../../components/charts/BarChart';
import DoughnutChart from '../../components/charts/DoughnutChart';

const EsusuManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);

  const esusuMetrics = [
    {
      title: 'Total Groups',
      value: '245',
      change: '+15',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Total Agents',
      value: '52',
      change: '+8',
      trend: 'up',
      icon: UserCheck,
      color: 'green'
    },
    {
      title: 'Total Savings',
      value: '₦125.8M',
      change: '+18.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'purple'
    },
    {
      title: 'Active Members',
      value: '3,245',
      change: '+125',
      trend: 'up',
      icon: TrendingUp,
      color: 'orange'
    }
  ];

  const savingsGroups = [
    {
      id: 1,
      name: 'Market Women Association',
      type: 'Rotational',
      members: 15,
      agent: 'Adebayo Ogundimu',
      totalSavings: 1500000,
      contributionAmount: 10000,
      frequency: 'Weekly',
      status: 'active',
      createdDate: '2024-10-01',
      nextPayout: '2025-02-15',
      completionRate: 85
    },
    {
      id: 2,
      name: 'Taxi Drivers Union',
      type: 'Rotational',
      members: 20,
      agent: 'Fatima Abdullahi',
      totalSavings: 2000000,
      contributionAmount: 5000,
      frequency: 'Weekly',
      status: 'active',
      createdDate: '2024-09-15',
      nextPayout: '2025-02-10',
      completionRate: 92
    },
    {
      id: 3,
      name: 'Neighborhood Savings',
      type: 'Goal-based',
      members: 12,
      agent: 'Emeka Okafor',
      totalSavings: 600000,
      contributionAmount: 5000,
      frequency: 'Weekly',
      status: 'active',
      createdDate: '2024-11-01',
      targetAmount: 1200000,
      completionRate: 50
    },
    {
      id: 4,
      name: 'Tech Professionals',
      type: 'Rotational',
      members: 10,
      agent: 'Michael Chen',
      totalSavings: 1000000,
      contributionAmount: 25000,
      frequency: 'Monthly',
      status: 'active',
      createdDate: '2024-12-01',
      nextPayout: '2025-03-01',
      completionRate: 70
    },
    {
      id: 5,
      name: 'Home Ownership Fund',
      type: 'Goal-based',
      members: 8,
      agent: 'Amina Bello',
      totalSavings: 2400000,
      contributionAmount: 100000,
      frequency: 'Monthly',
      status: 'active',
      createdDate: '2024-08-15',
      targetAmount: 10000000,
      completionRate: 24
    }
  ];

  const agents = [
    {
      id: 1,
      name: 'Adebayo Ogundimu',
      email: 'adebayo@example.com',
      phone: '+234 801 234 5678',
      location: 'Lagos',
      groups: 3,
      customers: 45,
      totalCollections: 3500000,
      commission: 175000,
      status: 'active',
      joinDate: '2024-08-15',
      lastActive: '2025-01-15T14:30:00Z',
      performance: 'excellent'
    },
    {
      id: 2,
      name: 'Fatima Abdullahi',
      email: 'fatima@example.com',
      phone: '+234 802 345 6789',
      location: 'Abuja',
      groups: 2,
      customers: 32,
      totalCollections: 2800000,
      commission: 140000,
      status: 'active',
      joinDate: '2024-09-01',
      lastActive: '2025-01-15T12:15:00Z',
      performance: 'good'
    },
    {
      id: 3,
      name: 'Emeka Okafor',
      email: 'emeka@example.com',
      phone: '+234 803 456 7890',
      location: 'Port Harcourt',
      groups: 1,
      customers: 18,
      totalCollections: 1200000,
      commission: 60000,
      status: 'active',
      joinDate: '2024-10-15',
      lastActive: '2025-01-15T11:45:00Z',
      performance: 'excellent'
    },
    {
      id: 4,
      name: 'Michael Chen',
      email: 'michael@example.com',
      phone: '+234 804 567 8901',
      location: 'Lagos',
      groups: 1,
      customers: 15,
      totalCollections: 1500000,
      commission: 75000,
      status: 'active',
      joinDate: '2024-11-01',
      lastActive: '2025-01-15T10:20:00Z',
      performance: 'good'
    },
    {
      id: 5,
      name: 'Amina Bello',
      email: 'amina@example.com',
      phone: '+234 805 678 9012',
      location: 'Kano',
      groups: 1,
      customers: 12,
      totalCollections: 2800000,
      commission: 140000,
      status: 'active',
      joinDate: '2024-07-15',
      lastActive: '2025-01-15T09:30:00Z',
      performance: 'excellent'
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      group: 'Market Women Association',
      type: 'collection',
      amount: 150000,
      date: '2025-01-15T10:30:00Z',
      agent: 'Adebayo Ogundimu',
      status: 'completed'
    },
    {
      id: 2,
      group: 'Taxi Drivers Union',
      type: 'collection',
      amount: 100000,
      date: '2025-01-15T09:45:00Z',
      agent: 'Fatima Abdullahi',
      status: 'completed'
    },
    {
      id: 3,
      group: 'Tech Professionals',
      type: 'payout',
      amount: 250000,
      date: '2025-01-14T14:20:00Z',
      agent: 'Michael Chen',
      status: 'completed'
    },
    {
      id: 4,
      group: 'Home Ownership Fund',
      type: 'collection',
      amount: 800000,
      date: '2025-01-14T11:15:00Z',
      agent: 'Amina Bello',
      status: 'completed'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Groups' },
    { value: 'rotational', label: 'Rotational' },
    { value: 'goal-based', label: 'Goal-based' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const agentFilterOptions = [
    { value: 'all', label: 'All Agents' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'excellent', label: 'Excellent Performance' },
    { value: 'good', label: 'Good Performance' }
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
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'inactive':
        return 'bg-red-100 text-red-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent':
        return 'bg-green-100 text-green-700';
      case 'good':
        return 'bg-blue-100 text-blue-700';
      case 'average':
        return 'bg-yellow-100 text-yellow-700';
      case 'poor':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredGroups = savingsGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.agent.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         group.type.toLowerCase() === selectedFilter.toLowerCase() ||
                         group.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         agent.status === selectedFilter ||
                         agent.performance === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleViewGroup = (group: any) => {
    setSelectedGroup(group);
    setShowGroupModal(true);
  };

  const handleViewAgent = (agent: any) => {
    setSelectedAgent(agent);
    setShowAgentModal(true);
  };

  // Group distribution chart data
  const groupDistributionData = {
    labels: ['Rotational', 'Goal-based'],
    datasets: [
      {
        data: [
          savingsGroups.filter(g => g.type === 'Rotational').length,
          savingsGroups.filter(g => g.type === 'Goal-based').length
        ],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)'
        ],
        borderWidth: 0,
      },
    ],
  };

  // Agent performance chart data
  const agentPerformanceData = {
    labels: agents.map(agent => agent.name),
    datasets: [
      {
        label: 'Total Collections',
        data: agents.map(agent => agent.totalCollections / 1000000), // Convert to millions
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <img 
                src="/image.png" 
                alt="Esusu Management Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Esusu/Ajo Management</h1>
              <p className="text-gray-600">Manage group savings, agents, and monitor savings performance</p>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {esusuMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                    <div className="flex items-center mt-2">
                      {metric.trend === 'up' ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-${metric.color}-100`}>
                    <Icon className={`h-6 w-6 text-${metric.color}-600`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Group Distribution Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <img src="/image.png" alt="Group Distribution Mascot" className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-900">Group Distribution</h3>
              </div>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View Details
              </button>
            </div>
            <DoughnutChart data={groupDistributionData} height={280} />
          </div>

          {/* Agent Performance Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <img src="/image.png" alt="Agent Performance Mascot" className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-900">Agent Performance</h3>
              </div>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View Details
              </button>
            </div>
            <BarChart data={agentPerformanceData} height={280} />
          </div>
        </div>

        {/* Savings Groups */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
            <div className="flex items-center space-x-2">
              <img src="/image.png" alt="Savings Groups Mascot" className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-gray-900">Savings Groups</h3>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search groups..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
                <Plus className="h-4 w-4" />
                <span>Add Group</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Group Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Members
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Savings
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completion
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
                {filteredGroups.map((group) => (
                  <tr key={group.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{group.name}</div>
                      <div className="text-xs text-gray-500">Created: {formatDate(group.createdDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {group.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {group.members}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {group.agent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(group.totalSavings)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-primary-500 h-2 rounded-full"
                            style={{ width: `${group.completionRate}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-900">{group.completionRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(group.status)}`}>
                        {group.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewGroup(group)}
                          className="text-primary-600 hover:text-primary-900 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
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

        {/* Agents */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
            <div className="flex items-center space-x-2">
              <img src="/image.png" alt="Agents Mascot" className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-gray-900">Agents</h3>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search agents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {agentFilterOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
                <Plus className="h-4 w-4" />
                <span>Add Agent</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Groups & Customers
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Collections
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commission
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
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
                {filteredAgents.map((agent) => {
                  const { date } = formatDateTime(agent.lastActive);
                  
                  return (
                    <tr key={agent.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                        <div className="text-xs text-gray-500">{agent.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {agent.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{agent.groups} groups</div>
                        <div className="text-sm text-gray-500">{agent.customers} customers</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(agent.totalCollections)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(agent.commission)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPerformanceColor(agent.performance)}`}>
                          {agent.performance}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(agent.status)}`}>
                          {agent.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewAgent(agent)}
                            className="text-primary-600 hover:text-primary-900 transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            <Settings className="h-4 w-4" />
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

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <img src="/image.png" alt="Transactions Mascot" className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            </div>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Group
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTransactions.map((transaction) => {
                  const { date, time } = formatDateTime(transaction.date);
                  
                  return (
                    <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.group}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          transaction.type === 'collection' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{date}</div>
                        <div className="text-sm text-gray-500">{time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.agent}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Group Detail Modal */}
        {showGroupModal && selectedGroup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="Group Detail Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">{selectedGroup.name}</h3>
                </div>
                <button
                  onClick={() => setShowGroupModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Group Overview */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Group Overview</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{selectedGroup.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Members:</span>
                        <span className="font-medium">{selectedGroup.members}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Agent:</span>
                        <span className="font-medium">{selectedGroup.agent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contribution:</span>
                        <span className="font-medium">{formatCurrency(selectedGroup.contributionAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Frequency:</span>
                        <span className="font-medium">{selectedGroup.frequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Created:</span>
                        <span className="font-medium">{formatDate(selectedGroup.createdDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedGroup.status)}`}>
                          {selectedGroup.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedGroup.type === "Rotational" && (
                    <div className="bg-gray-50 p-6 rounded-lg mt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Rotation Schedule</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Next Payout:</span>
                          <span className="font-medium">{formatDate(selectedGroup.nextPayout)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Saved:</span>
                          <span className="font-medium">{formatCurrency(selectedGroup.totalSavings)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Completion:</span>
                          <span className="font-medium">{selectedGroup.completionRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-500 h-2 rounded-full"
                            style={{ width: `${selectedGroup.completionRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedGroup.type === "Goal-based" && (
                    <div className="bg-gray-50 p-6 rounded-lg mt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Goal Progress</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Target Amount:</span>
                          <span className="font-medium">{formatCurrency(selectedGroup.targetAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Saved:</span>
                          <span className="font-medium">{formatCurrency(selectedGroup.totalSavings)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Progress:</span>
                          <span className="font-medium">{selectedGroup.completionRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-500 h-2 rounded-full"
                            style={{ width: `${selectedGroup.completionRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Group Details */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Member Distribution</h4>
                    <div className="h-64 bg-white rounded-lg p-4">
                      <DoughnutChart 
                        data={{
                          labels: ['Active', 'Inactive'],
                          datasets: [
                            {
                              data: [selectedGroup.members - 2, 2],
                              backgroundColor: [
                                'rgba(16, 185, 129, 0.7)',
                                'rgba(239, 68, 68, 0.7)'
                              ],
                              borderWidth: 0,
                            },
                          ],
                        }}
                        height={240}
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Recent Activity</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-100 p-2 rounded-lg mt-1">
                          <DollarSign className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Collection completed</p>
                          <p className="text-sm text-gray-600">{formatCurrency(selectedGroup.contributionAmount * selectedGroup.members)} • 2 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg mt-1">
                          <UserPlus className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">New member joined</p>
                          <p className="text-sm text-gray-600">Jane Smith • 2 days ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-purple-100 p-2 rounded-lg mt-1">
                          <RefreshCw className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Payout completed</p>
                          <p className="text-sm text-gray-600">Michael received {formatCurrency(selectedGroup.contributionAmount * selectedGroup.members)} • 1 week ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Edit Group
                </button>
                <button
                  className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                >
                  View Members
                </button>
                <button
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                >
                  View Transactions
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Agent Detail Modal */}
        {showAgentModal && selectedAgent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="Agent Detail Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">{selectedAgent.name}</h3>
                </div>
                <button
                  onClick={() => setShowAgentModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Agent Overview */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Agent Information</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{selectedAgent.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{selectedAgent.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">{selectedAgent.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Join Date:</span>
                        <span className="font-medium">{formatDate(selectedAgent.joinDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Active:</span>
                        <span className="font-medium">{formatDateTime(selectedAgent.lastActive).date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedAgent.status)}`}>
                          {selectedAgent.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg mt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Performance</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rating:</span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPerformanceColor(selectedAgent.performance)}`}>
                          {selectedAgent.performance}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Groups:</span>
                        <span className="font-medium">{selectedAgent.groups}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Customers:</span>
                        <span className="font-medium">{selectedAgent.customers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Collections:</span>
                        <span className="font-medium">{formatCurrency(selectedAgent.totalCollections)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Commission Earned:</span>
                        <span className="font-medium">{formatCurrency(selectedAgent.commission)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agent Details */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Collection Performance</h4>
                    <div className="h-64 bg-white rounded-lg p-4">
                      <BarChart 
                        data={{
                          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                          datasets: [
                            {
                              label: 'Collections (₦)',
                              data: [350000, 420000, 380000, 450000, 520000, 480000],
                              backgroundColor: 'rgba(16, 185, 129, 0.7)',
                              borderWidth: 0,
                            }
                          ]
                        }}
                        height={240}
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Managed Groups</h4>
                    <div className="space-y-3">
                      {savingsGroups.filter(group => group.agent === selectedAgent.name).map((group) => (
                        <div key={group.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="bg-primary-100 p-2 rounded-lg">
                              <Users className="h-4 w-4 text-primary-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{group.name}</p>
                              <p className="text-xs text-gray-500">{group.members} members • {formatCurrency(group.totalSavings)}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleViewGroup(group)}
                            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                          >
                            View
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Edit Agent
                </button>
                <button
                  className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                >
                  View Transactions
                </button>
                <button
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                >
                  Suspend Agent
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EsusuManagement;