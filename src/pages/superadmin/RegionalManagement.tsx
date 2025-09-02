import React, { useState } from 'react';
import {
  Globe,
  MapPin,
  Users,
  DollarSign,
  TrendingUp,
  Building,
  UserCheck,
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  BarChart3,
  PieChart,
  Activity,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Calendar,
  Target,
  Shield,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import BarChart from '../../components/charts/BarChart';
import DoughnutChart from '../../components/charts/DoughnutChart';
import LineChart from '../../components/charts/LineChart';

const RegionalManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showManagerModal, setShowManagerModal] = useState(false);

  const [newRegion, setNewRegion] = useState({
    name: '',
    country: 'Nigeria',
    manager: '',
    managerEmail: '',
    status: 'active',
    timezone: 'Africa/Lagos',
    currency: 'NGN',
    language: 'en'
  });

  const regions = [
    {
      id: 1,
      name: 'Lagos',
      country: 'Nigeria',
      status: 'active',
      manager: 'Adebayo Ogundimu',
      managerEmail: 'adebayo.ogundimu@suresavings.com',
      managerPhone: '+234 801 234 5678',
      users: 425000,
      revenue: 45200000000,
      growth: 18.2,
      marketShare: 35.8,
      admins: 12,
      agents: 45,
      branches: 8,
      establishedDate: '2023-01-15',
      lastUpdate: '2025-01-15T14:30:00Z',
      performance: 'excellent',
      compliance: 'compliant',
      kycVerificationRate: 94.5,
      customerSatisfaction: 4.8,
      avgTransactionValue: 125000,
      monthlyActiveUsers: 380000,
      timezone: 'Africa/Lagos',
      currency: 'NGN',
      language: 'en',
      coordinates: { lat: 6.5244, lng: 3.3792 }
    },
    {
      id: 2,
      name: 'Abuja',
      country: 'Nigeria',
      status: 'active',
      manager: 'Fatima Abdullahi',
      managerEmail: 'fatima.abdullahi@suresavings.com',
      managerPhone: '+234 802 345 6789',
      users: 285000,
      revenue: 28700000000,
      growth: 15.3,
      marketShare: 24.2,
      admins: 8,
      agents: 32,
      branches: 5,
      establishedDate: '2023-02-01',
      lastUpdate: '2025-01-15T12:15:00Z',
      performance: 'good',
      compliance: 'compliant',
      kycVerificationRate: 92.1,
      customerSatisfaction: 4.7,
      avgTransactionValue: 145000,
      monthlyActiveUsers: 260000,
      timezone: 'Africa/Lagos',
      currency: 'NGN',
      language: 'en',
      coordinates: { lat: 9.0765, lng: 7.3986 }
    },
    {
      id: 3,
      name: 'Port Harcourt',
      country: 'Nigeria',
      status: 'active',
      manager: 'Emeka Okafor',
      managerEmail: 'emeka.okafor@suresavings.com',
      managerPhone: '+234 803 456 7890',
      users: 195000,
      revenue: 19500000000,
      growth: 22.1,
      marketShare: 16.5,
      admins: 6,
      agents: 28,
      branches: 4,
      establishedDate: '2023-03-01',
      lastUpdate: '2025-01-15T10:45:00Z',
      performance: 'excellent',
      compliance: 'compliant',
      kycVerificationRate: 91.8,
      customerSatisfaction: 4.6,
      avgTransactionValue: 135000,
      monthlyActiveUsers: 175000,
      timezone: 'Africa/Lagos',
      currency: 'NGN',
      language: 'en',
      coordinates: { lat: 4.8156, lng: 7.0498 }
    },
    {
      id: 4,
      name: 'Kano',
      country: 'Nigeria',
      status: 'active',
      manager: 'Aisha Muhammad',
      managerEmail: 'aisha.muhammad@suresavings.com',
      managerPhone: '+234 804 567 8901',
      users: 165000,
      revenue: 16800000000,
      growth: 12.8,
      marketShare: 13.9,
      admins: 5,
      agents: 22,
      branches: 3,
      establishedDate: '2023-04-01',
      lastUpdate: '2025-01-15T09:30:00Z',
      performance: 'good',
      compliance: 'compliant',
      kycVerificationRate: 89.5,
      customerSatisfaction: 4.5,
      avgTransactionValue: 115000,
      monthlyActiveUsers: 145000,
      timezone: 'Africa/Lagos',
      currency: 'NGN',
      language: 'ha',
      coordinates: { lat: 12.0022, lng: 8.5920 }
    },
    {
      id: 5,
      name: 'Ibadan',
      country: 'Nigeria',
      status: 'active',
      manager: 'Olumide Adeyemi',
      managerEmail: 'olumide.adeyemi@suresavings.com',
      managerPhone: '+234 805 678 9012',
      users: 145000,
      revenue: 14200000000,
      growth: 20.5,
      marketShare: 12.2,
      admins: 4,
      agents: 18,
      branches: 3,
      establishedDate: '2023-05-01',
      lastUpdate: '2025-01-15T11:20:00Z',
      performance: 'excellent',
      compliance: 'compliant',
      kycVerificationRate: 93.2,
      customerSatisfaction: 4.7,
      avgTransactionValue: 128000,
      monthlyActiveUsers: 132000,
      timezone: 'Africa/Lagos',
      currency: 'NGN',
      language: 'yo',
      coordinates: { lat: 7.3775, lng: 3.9470 }
    },
    {
      id: 6,
      name: 'Kaduna',
      country: 'Nigeria',
      status: 'planning',
      manager: 'To be assigned',
      managerEmail: '',
      managerPhone: '',
      users: 0,
      revenue: 0,
      growth: 0,
      marketShare: 0,
      admins: 0,
      agents: 0,
      branches: 0,
      establishedDate: '',
      lastUpdate: '2025-01-10T16:00:00Z',
      performance: 'pending',
      compliance: 'pending',
      kycVerificationRate: 0,
      customerSatisfaction: 0,
      avgTransactionValue: 0,
      monthlyActiveUsers: 0,
      timezone: 'Africa/Lagos',
      currency: 'NGN',
      language: 'en',
      coordinates: { lat: 10.5105, lng: 7.4165 }
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'active', label: 'Active Regions' },
    { value: 'planning', label: 'Planning Phase' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'excellent', label: 'Excellent Performance' },
    { value: 'good', label: 'Good Performance' },
    { value: 'needs_attention', label: 'Needs Attention' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-NG', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'planning':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'suspended':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent':
        return 'bg-green-100 text-green-700';
      case 'good':
        return 'bg-blue-100 text-blue-700';
      case 'needs_attention':
        return 'bg-yellow-100 text-yellow-700';
      case 'pending':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredRegions = regions.filter(region => {
    const matchesSearch = region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         region.manager.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         region.status === selectedFilter ||
                         region.performance === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleCreateRegion = () => {
    console.log('Creating region:', newRegion);
    setShowCreateModal(false);
    setNewRegion({
      name: '',
      country: 'Nigeria',
      manager: '',
      managerEmail: '',
      status: 'active',
      timezone: 'Africa/Lagos',
      currency: 'NGN',
      language: 'en'
    });
  };

  const handleRegionAction = (action: string, regionId: number) => {
    console.log(`${action} region:`, regionId);
  };

  const handleViewRegion = (region: any) => {
    setSelectedRegion(region);
    setShowRegionModal(true);
  };

  // Calculate totals
  const totalUsers = regions.reduce((sum, r) => sum + r.users, 0);
  const totalRevenue = regions.reduce((sum, r) => sum + r.revenue, 0);
  const activeRegions = regions.filter(r => r.status === 'active').length;
  const avgGrowth = regions.filter(r => r.status === 'active').reduce((sum, r) => sum + r.growth, 0) / activeRegions;

  // Generate chart data
  const regionPerformanceData = {
    labels: regions.filter(r => r.status === 'active').map(r => r.name),
    datasets: [
      {
        label: 'Revenue (Billions)',
        data: regions.filter(r => r.status === 'active').map(r => r.revenue / 1000000000),
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)'
        ],
        borderWidth: 0,
      },
    ],
  };

  const userDistributionData = {
    labels: regions.filter(r => r.status === 'active').map(r => r.name),
    datasets: [
      {
        data: regions.filter(r => r.status === 'active').map(r => r.users),
        backgroundColor: [
          '#10B981',
          '#3B82F6',
          '#8B5CF6',
          '#F59E0B',
          '#EF4444'
        ],
        borderWidth: 0,
      },
    ],
  };

  const growthTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: regions.filter(r => r.status === 'active').slice(0, 3).map((region, index) => ({
      label: region.name,
      data: [12, 15, 18, 22, 25, region.growth],
      borderColor: index === 0 ? '#10B981' : index === 1 ? '#3B82F6' : '#8B5CF6',
      backgroundColor: 'transparent',
      tension: 0.4,
    })),
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
                alt="Regional Management Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Regional Management</h1>
              <p className="text-gray-600">Manage geographic regions, assign managers, and monitor regional performance</p>
            </div>
          </div>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Regions</p>
                <p className="text-2xl font-bold text-gray-900">{regions.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Regions</p>
                <p className="text-2xl font-bold text-green-600">{activeRegions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-purple-600">{totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-orange-600">{formatCurrency(totalRevenue)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Regional Performance Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-6">
              <img src="/image.png" alt="Performance Chart Mascot" className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-gray-900">Regional Revenue</h3>
            </div>
            <BarChart data={regionPerformanceData} height={280} />
          </div>

          {/* User Distribution Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-6">
              <img src="/image.png" alt="Distribution Chart Mascot" className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-gray-900">User Distribution</h3>
            </div>
            <DoughnutChart data={userDistributionData} height={280} />
          </div>

          {/* Growth Trend Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-6">
              <img src="/image.png" alt="Growth Chart Mascot" className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-gray-900">Growth Trends</h3>
            </div>
            <LineChart data={growthTrendData} height={280} />
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
                  placeholder="Search regions..."
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

              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Region</span>
              </button>

              <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Regions Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <img src="/image.png" alt="Regions List Mascot" className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-gray-900">
                Regions ({filteredRegions.length})
              </h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Region
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Manager
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Users & Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Growth & Market Share
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team
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
                {filteredRegions.map((region) => (
                  <tr key={region.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary-100 p-2 rounded-lg">
                          <MapPin className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{region.name}</div>
                          <div className="text-sm text-gray-500">{region.country}</div>
                          <div className="text-xs text-gray-400">Est. {formatDate(region.establishedDate)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{region.manager}</div>
                      <div className="text-sm text-gray-500">{region.managerEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {region.users.toLocaleString()} users
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatCurrency(region.revenue)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        {region.growth > 0 ? (
                          <ArrowUpRight className="h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-500" />
                        )}
                        <span className="text-sm font-medium text-green-600">+{region.growth}%</span>
                      </div>
                      <div className="text-sm text-gray-500">{region.marketShare}% market share</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{region.admins} admins</div>
                      <div className="text-sm text-gray-500">{region.agents} agents</div>
                      <div className="text-xs text-gray-400">{region.branches} branches</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPerformanceColor(region.performance)}`}>
                        {region.performance}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {region.kycVerificationRate > 0 && `${region.kycVerificationRate}% KYC rate`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(region.status)}`}>
                        {region.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewRegion(region)}
                          className="text-primary-600 hover:text-primary-900 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleRegionAction('edit', region.id)}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleRegionAction('settings', region.id)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
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

        {/* Create Region Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="Create Region Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">Create New Region</h3>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Region Name</label>
                    <input
                      type="text"
                      value={newRegion.name}
                      onChange={(e) => setNewRegion({...newRegion, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Kaduna"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <select
                      value={newRegion.country}
                      onChange={(e) => setNewRegion({...newRegion, country: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Kenya">Kenya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Regional Manager</label>
                    <input
                      type="text"
                      value={newRegion.manager}
                      onChange={(e) => setNewRegion({...newRegion, manager: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Manager name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Manager Email</label>
                    <input
                      type="email"
                      value={newRegion.managerEmail}
                      onChange={(e) => setNewRegion({...newRegion, managerEmail: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="manager@suresavings.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <select
                      value={newRegion.timezone}
                      onChange={(e) => setNewRegion({...newRegion, timezone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
                      <option value="UTC">UTC</option>
                      <option value="Africa/Cairo">Africa/Cairo (EET)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select
                      value={newRegion.currency}
                      onChange={(e) => setNewRegion({...newRegion, currency: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="NGN">Nigerian Naira (NGN)</option>
                      <option value="GHS">Ghanaian Cedi (GHS)</option>
                      <option value="KES">Kenyan Shilling (KES)</option>
                      <option value="USD">US Dollar (USD)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Language</label>
                  <select
                    value={newRegion.language}
                    onChange={(e) => setNewRegion({...newRegion, language: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="en">English</option>
                    <option value="ha">Hausa</option>
                    <option value="yo">Yoruba</option>
                    <option value="ig">Igbo</option>
                    <option value="fr">French</option>
                    <option value="sw">Swahili</option>
                  </select>
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
                  onClick={handleCreateRegion}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Create Region
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Region Detail Modal */}
        {showRegionModal && selectedRegion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="Region Detail Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">{selectedRegion.name} Region</h3>
                </div>
                <button
                  onClick={() => setShowRegionModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Region Overview */}
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Region Information</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Country:</span>
                        <span className="font-medium">{selectedRegion.country}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Established:</span>
                        <span className="font-medium">{formatDate(selectedRegion.establishedDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Timezone:</span>
                        <span className="font-medium">{selectedRegion.timezone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Currency:</span>
                        <span className="font-medium">{selectedRegion.currency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Language:</span>
                        <span className="font-medium capitalize">{selectedRegion.language}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Manager Information</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{selectedRegion.manager}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{selectedRegion.managerEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{selectedRegion.managerPhone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Users</p>
                        <p className="text-xl font-bold text-gray-900">{selectedRegion.users.toLocaleString()}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Revenue</p>
                        <p className="text-xl font-bold text-gray-900">{formatCurrency(selectedRegion.revenue)}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Growth Rate</p>
                        <p className="text-xl font-bold text-green-600">+{selectedRegion.growth}%</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Market Share</p>
                        <p className="text-xl font-bold text-blue-600">{selectedRegion.marketShare}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Operational Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">KYC Verification Rate:</span>
                        <span className="font-medium">{selectedRegion.kycVerificationRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Customer Satisfaction:</span>
                        <span className="font-medium">{selectedRegion.customerSatisfaction}/5.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg Transaction Value:</span>
                        <span className="font-medium">{formatCurrency(selectedRegion.avgTransactionValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Active Users:</span>
                        <span className="font-medium">{selectedRegion.monthlyActiveUsers.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Edit Region
                </button>
                <button
                  className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                >
                  View Analytics
                </button>
                <button
                  onClick={() => setShowManagerModal(true)}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                >
                  Assign Manager
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegionalManagement;