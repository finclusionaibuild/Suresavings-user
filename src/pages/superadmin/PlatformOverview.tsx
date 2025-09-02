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
  Clock
} from 'lucide-react';
import LineChart from '../../components/charts/LineChart';
import BarChart from '../../components/charts/BarChart';
import DoughnutChart from '../../components/charts/DoughnutChart';
import AreaChart from '../../components/charts/AreaChart';
import { 
  generateRevenueData, 
  generateUserGrowthData, 
  generateRegionalData,
  generatePerformanceMetrics,
  formatCurrency,
  formatNumber
} from '../../utils/chartData';

const PlatformOverview: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const globalMetrics = [
    {
      title: 'Total Platform Users',
      value: '1,247,856',
      change: '+15.2%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Global Revenue',
      value: '₦125.8B',
      change: '+22.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Total Transactions',
      value: '45.2M',
      change: '+18.7%',
      trend: 'up',
      icon: Activity,
      color: 'purple'
    },
    {
      title: 'Platform Uptime',
      value: '99.97%',
      change: '+0.02%',
      trend: 'up',
      icon: BarChart3,
      color: 'orange'
    }
  ];

  const regionalPerformance = [
    {
      region: 'Lagos',
      country: 'Nigeria',
      users: 425000,
      revenue: '₦45.2B',
      growth: '+18%',
      marketShare: '35.8%',
      status: 'excellent'
    },
    {
      region: 'Abuja',
      country: 'Nigeria',
      users: 285000,
      revenue: '₦28.7B',
      growth: '+15%',
      marketShare: '24.2%',
      status: 'good'
    },
    {
      region: 'Port Harcourt',
      country: 'Nigeria',
      users: 195000,
      revenue: '₦19.5B',
      growth: '+22%',
      marketShare: '16.5%',
      status: 'excellent'
    },
    {
      region: 'Kano',
      country: 'Nigeria',
      users: 165000,
      revenue: '₦16.8B',
      growth: '+12%',
      marketShare: '13.9%',
      status: 'good'
    },
    {
      region: 'Ibadan',
      country: 'Nigeria',
      users: 145000,
      revenue: '₦14.2B',
      growth: '+20%',
      marketShare: '12.2%',
      status: 'excellent'
    }
  ];

  const platformHealth = [
    {
      metric: 'API Response Time',
      value: '45ms',
      status: 'excellent',
      target: '<100ms'
    },
    {
      metric: 'Database Performance',
      value: '12ms',
      status: 'excellent',
      target: '<50ms'
    },
    {
      metric: 'Error Rate',
      value: '0.02%',
      status: 'excellent',
      target: '<0.1%'
    },
    {
      metric: 'Memory Usage',
      value: '68%',
      status: 'good',
      target: '<80%'
    },
    {
      metric: 'CPU Usage',
      value: '45%',
      status: 'excellent',
      target: '<70%'
    },
    {
      metric: 'Storage Usage',
      value: '72%',
      status: 'good',
      target: '<85%'
    }
  ];

  const businessMetrics = [
    {
      title: 'Customer Acquisition Cost',
      value: '₦2,450',
      change: '-8.2%',
      trend: 'down',
      period: 'This month'
    },
    {
      title: 'Customer Lifetime Value',
      value: '₦45,200',
      change: '+12.5%',
      trend: 'up',
      period: 'This quarter'
    },
    {
      title: 'Monthly Recurring Revenue',
      value: '₦8.7B',
      change: '+15.3%',
      trend: 'up',
      period: 'This month'
    },
    {
      title: 'Churn Rate',
      value: '2.1%',
      change: '-0.5%',
      trend: 'down',
      period: 'This month'
    }
  ];

  const timeframeOptions = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'lagos', label: 'Lagos' },
    { value: 'abuja', label: 'Abuja' },
    { value: 'port-harcourt', label: 'Port Harcourt' },
    { value: 'kano', label: 'Kano' },
    { value: 'ibadan', label: 'Ibadan' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-700';
      case 'good':
        return 'bg-blue-100 text-blue-700';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700';
      case 'critical':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Generate chart data
  const revenueData = generateRevenueData(12);
  const userGrowthData = generateUserGrowthData(12);
  const regionalData = generateRegionalData();
  const performanceData = generatePerformanceMetrics();

  // Revenue trend chart data
  const revenueChartData = {
    labels: revenueData.labels,
    datasets: [
      {
        label: 'Revenue',
        data: revenueData.data,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
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

  // Regional distribution chart data
  const regionalChartData = {
    labels: regionalData.labels,
    datasets: [
      {
        data: regionalData.data,
        backgroundColor: regionalData.colors,
        borderWidth: 0,
      },
    ],
  };

  // Platform health chart data
  const healthChartData = {
    labels: performanceData.labels,
    datasets: [
      {
        label: 'Current',
        data: performanceData.values,
        backgroundColor: performanceData.values.map((value, index) => {
          const target = performanceData.targets[index];
          if (performanceData.labels[index] === 'Error Rate') {
            return value <= target ? '#10B981' : '#EF4444';
          }
          return value <= target ? '#10B981' : '#EF4444';
        }),
        borderWidth: 0,
      },
      {
        label: 'Target',
        data: performanceData.targets,
        backgroundColor: 'rgba(107, 114, 128, 0.3)',
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
                alt="Platform Overview Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(139, 92, 246, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Platform Overview</h1>
              <p className="text-gray-600">Global platform metrics, system-wide analytics, and high-level performance monitoring</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {timeframeOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>

              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {regionOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Global Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {globalMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">{metric.change}</span>
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

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Global Performance Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <img src="/image.png" alt="Performance Chart Mascot" className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-900">Global Performance Trends</h3>
              </div>
              <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                View Details
              </button>
            </div>
            <AreaChart data={revenueChartData} height={280} />
          </div>

          {/* User Growth Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <img src="/image.png" alt="User Growth Mascot" className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-900">User Growth Analytics</h3>
              </div>
              <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                View Details
              </button>
            </div>
            <LineChart data={userGrowthChartData} height={280} />
          </div>
        </div>

        {/* Regional Performance and Platform Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Regional Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-6">
              <img src="/image.png" alt="Regional Chart Mascot" className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-gray-900">Regional Distribution</h3>
            </div>
            <DoughnutChart data={regionalChartData} height={280} />
          </div>

          {/* Platform Health */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-6">
              <img src="/image.png" alt="Health Mascot" className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-gray-900">Platform Health</h3>
            </div>
            <BarChart data={healthChartData} height={280} />
          </div>
        </div>

        {/* Regional Performance Table */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <img src="/image.png" alt="Regional Performance Mascot" className="w-5 h-5" />
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
                    Market Share
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {regionalPerformance.map((region, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <MapPin className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{region.region}</div>
                          <div className="text-sm text-gray-500">{region.country}</div>
                        </div>
                      </div>
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
                      {region.marketShare}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(region.status)}`}>
                        {region.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Business Metrics */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-2 mb-6">
            <img src="/image.png" alt="Business Metrics Mascot" className="w-5 h-5" />
            <h3 className="text-lg font-semibold text-gray-900">Key Business Metrics</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessMetrics.map((metric, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-600">{metric.title}</h4>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-green-500 transform rotate-180" />
                  )}
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-green-600'}`}>
                    {metric.change}
                  </span>
                  <span className="text-xs text-gray-500">{metric.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformOverview;