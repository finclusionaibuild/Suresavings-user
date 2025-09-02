import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Activity,
  Target,
  Clock,
  Globe,
  Zap
} from 'lucide-react';
import LineChart from '../../components/charts/LineChart';
import BarChart from '../../components/charts/BarChart';
import DoughnutChart from '../../components/charts/DoughnutChart';
import { 
  generateRevenueData, 
  generateUserGrowthData, 
  generateSavingsPlansData,
  formatCurrency,
  formatNumber
} from '../../utils/chartData';

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const periodOptions = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const keyMetrics = [
    {
      title: 'Total Revenue',
      value: '₦2.1B',
      change: '+18.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Active Users',
      value: '125,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Transaction Volume',
      value: '₦45.8B',
      change: '+25.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.8%',
      trend: 'up',
      icon: Target,
      color: 'orange'
    }
  ];

  const topPerformingRegions = [
    { region: 'Lagos', revenue: '₦850M', growth: '+22%', users: 45230 },
    { region: 'Abuja', revenue: '₦620M', growth: '+18%', users: 32100 },
    { region: 'Port Harcourt', revenue: '₦380M', growth: '+15%', users: 21500 },
    { region: 'Kano', revenue: '₦250M', growth: '+12%', users: 18200 }
  ];

  const savingsPlansPerformance = [
    { plan: 'Flex Save', users: 45230, amount: '₦15.2B', growth: '+12%' },
    { plan: 'Fixed Save', users: 28450, amount: '₦18.7B', growth: '+18%' },
    { plan: 'Target Save', users: 52100, amount: '₦11.3B', growth: '+25%' }
  ];

  const recentReports = [
    {
      id: 1,
      title: 'Monthly Financial Report',
      type: 'Financial',
      generatedDate: '2025-01-15',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: 2,
      title: 'User Growth Analysis',
      type: 'User Analytics',
      generatedDate: '2025-01-14',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: 3,
      title: 'Risk Assessment Report',
      type: 'Risk Management',
      generatedDate: '2025-01-13',
      status: 'processing',
      downloadUrl: '#'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Generate chart data
  const revenueData = generateRevenueData(12);
  const userGrowthData = generateUserGrowthData(12);
  const savingsPlansData = generateSavingsPlansData();

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

  // Savings plans performance chart data
  const savingsPlansChartData = {
    labels: savingsPlansData.labels,
    datasets: [
      {
        label: 'Total Amount',
        data: savingsPlansData.amounts.map(amount => amount / 1000000000), // Convert to billions
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(245, 158, 11, 0.7)',
        ],
        borderWidth: 0,
      },
    ],
  };

  // User distribution by plan chart data
  const userDistributionChartData = {
    labels: savingsPlansData.labels,
    datasets: [
      {
        data: savingsPlansData.users,
        backgroundColor: [
          '#10B981',
          '#3B82F6',
          '#8B5CF6',
          '#F59E0B',
        ],
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
                alt="Analytics Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
              <p className="text-gray-600">Generate detailed reports, analyze platform metrics, and track business performance</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {periodOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>

              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Metrics</option>
                <option value="revenue">Revenue</option>
                <option value="users">Users</option>
                <option value="transactions">Transactions</option>
              </select>

              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors">
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {keyMetrics.map((metric, index) => {
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

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Trend Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <img src="/image.png" alt="Revenue Chart Mascot" className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
              </div>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View Details
              </button>
            </div>
            <LineChart data={revenueChartData} height={280} />
          </div>

          {/* User Growth Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <img src="/image.png" alt="User Growth Mascot" className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
              </div>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View Details
              </button>
            </div>
            <AreaChart data={userGrowthChartData} height={280} />
          </div>
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Savings Plans Performance */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-6">
              <img src="/image.png" alt="Savings Plans Mascot" className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-gray-900">Savings Plans Performance</h3>
            </div>
            <BarChart data={savingsPlansChartData} height={280} />
          </div>

          {/* User Distribution by Plan */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-6">
              <img src="/image.png" alt="User Distribution Mascot" className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-gray-900">User Distribution by Plan</h3>
            </div>
            <DoughnutChart data={userDistributionChartData} height={280} />
          </div>
        </div>

        {/* Performance Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Performing Regions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-6">
              <img src="/image.png" alt="Regions Mascot" className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-gray-900">Top Performing Regions</h3>
            </div>
            <div className="space-y-4">
              {topPerformingRegions.map((region, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{region.region}</h4>
                    <p className="text-sm text-gray-600">{region.users.toLocaleString()} users</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{region.revenue}</p>
                    <p className="text-sm text-green-600">{region.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Savings Plans Performance */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-6">
              <img src="/image.png" alt="Plans Mascot" className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-gray-900">Savings Plans Performance</h3>
            </div>
            <div className="space-y-4">
              {savingsPlansPerformance.map((plan, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{plan.plan}</h4>
                    <p className="text-sm text-gray-600">{plan.users.toLocaleString()} users</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{plan.amount}</p>
                    <p className="text-sm text-green-600">{plan.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <img src="/image.png" alt="Reports Mascot" className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
              <Download className="h-4 w-4" />
              <span>Generate Report</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Generated
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
                {recentReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{report.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(report.generatedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-primary-600 hover:text-primary-900 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 transition-colors">
                          <Download className="h-4 w-4" />
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
    </div>
  );
};

export default Analytics;