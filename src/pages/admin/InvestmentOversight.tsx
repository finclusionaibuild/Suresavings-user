import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  PieChart,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  Target,
  Shield,
  Activity,
  Calendar,
  Percent,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import LineChart from '../../components/charts/LineChart';
import BarChart from '../../components/charts/BarChart';
import DoughnutChart from '../../components/charts/DoughnutChart';
import { generateInvestmentPerformance } from '../../utils/chartData';

const InvestmentOversight: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedInvestment, setSelectedInvestment] = useState<any>(null);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);

  const investmentProducts = [
    {
      id: 1,
      name: 'Fixed Income Bonds',
      type: 'fixed_income',
      riskLevel: 'low',
      minReturn: 12,
      maxReturn: 18,
      minInvestment: 50000,
      totalInvestors: 15420,
      totalAmount: 8500000000,
      currentReturn: 15.2,
      status: 'active',
      manager: 'Bond Investment Team',
      inception: '2023-01-15',
      maturityPeriod: '6-24 months',
      description: 'Government-backed bonds with guaranteed returns',
      performance: [
        { month: 'Jan', return: 14.8 },
        { month: 'Feb', return: 15.1 },
        { month: 'Mar', return: 15.3 },
        { month: 'Apr', return: 15.0 },
        { month: 'May', return: 15.2 }
      ]
    },
    {
      id: 2,
      name: 'Growth Mutual Fund',
      type: 'mutual_fund',
      riskLevel: 'medium',
      minReturn: 15,
      maxReturn: 25,
      minInvestment: 25000,
      totalInvestors: 8750,
      totalAmount: 4200000000,
      currentReturn: 22.8,
      status: 'active',
      manager: 'Equity Fund Managers',
      inception: '2023-03-01',
      maturityPeriod: '12-36 months',
      description: 'Diversified equity portfolio for growth-oriented investors',
      performance: [
        { month: 'Jan', return: 18.5 },
        { month: 'Feb', return: 20.2 },
        { month: 'Mar', return: 21.8 },
        { month: 'Apr', return: 23.1 },
        { month: 'May', return: 22.8 }
      ]
    },
    {
      id: 3,
      name: 'Tech Stock Portfolio',
      type: 'stocks',
      riskLevel: 'high',
      minReturn: 20,
      maxReturn: 35,
      minInvestment: 100000,
      totalInvestors: 3200,
      totalAmount: 2800000000,
      currentReturn: 28.5,
      status: 'active',
      manager: 'Tech Investment Specialists',
      inception: '2023-06-01',
      maturityPeriod: '12+ months',
      description: 'Curated technology stocks with high growth potential',
      performance: [
        { month: 'Jan', return: 25.2 },
        { month: 'Feb', return: 27.8 },
        { month: 'Mar', return: 29.1 },
        { month: 'Apr', return: 26.9 },
        { month: 'May', return: 28.5 }
      ]
    },
    {
      id: 4,
      name: 'Real Estate Fund',
      type: 'real_estate',
      riskLevel: 'medium',
      minReturn: 18,
      maxReturn: 28,
      minInvestment: 200000,
      totalInvestors: 2100,
      totalAmount: 1500000000,
      currentReturn: 24.2,
      status: 'active',
      manager: 'Real Estate Investment Team',
      inception: '2023-09-01',
      maturityPeriod: '24-60 months',
      description: 'Commercial and residential real estate investments',
      performance: [
        { month: 'Jan', return: 22.1 },
        { month: 'Feb', return: 23.5 },
        { month: 'Mar', return: 24.8 },
        { month: 'Apr', return: 23.9 },
        { month: 'May', return: 24.2 }
      ]
    },
    {
      id: 5,
      name: 'Conservative Bond Fund',
      type: 'fixed_income',
      riskLevel: 'low',
      minReturn: 8,
      maxReturn: 12,
      minInvestment: 10000,
      totalInvestors: 12500,
      totalAmount: 3200000000,
      currentReturn: 10.8,
      status: 'paused',
      manager: 'Conservative Investment Team',
      inception: '2022-12-01',
      maturityPeriod: '6-18 months',
      description: 'Low-risk bonds for conservative investors',
      performance: [
        { month: 'Jan', return: 10.2 },
        { month: 'Feb', return: 10.5 },
        { month: 'Mar', return: 10.8 },
        { month: 'Apr', return: 10.6 },
        { month: 'May', return: 10.8 }
      ]
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Investments' },
    { value: 'active', label: 'Active' },
    { value: 'paused', label: 'Paused' },
    { value: 'fixed_income', label: 'Fixed Income' },
    { value: 'mutual_fund', label: 'Mutual Funds' },
    { value: 'stocks', label: 'Stocks' },
    { value: 'real_estate', label: 'Real Estate' },
    { value: 'low', label: 'Low Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'high', label: 'High Risk' }
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

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'paused':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'closed':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'fixed_income':
        return 'bg-blue-100 text-blue-700';
      case 'mutual_fund':
        return 'bg-purple-100 text-purple-700';
      case 'stocks':
        return 'bg-red-100 text-red-700';
      case 'real_estate':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredInvestments = investmentProducts.filter(investment => {
    const matchesSearch = investment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investment.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         investment.status === selectedFilter ||
                         investment.type === selectedFilter ||
                         investment.riskLevel === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleInvestmentAction = (action: string, investmentId: number) => {
    console.log(`${action} investment:`, investmentId);
  };

  // Calculate totals
  const totalProducts = investmentProducts.length;
  const activeProducts = investmentProducts.filter(p => p.status === 'active').length;
  const totalInvestors = investmentProducts.reduce((sum, p) => sum + p.totalInvestors, 0);
  const totalValue = investmentProducts.reduce((sum, p) => sum + p.totalAmount, 0);
  const avgReturn = investmentProducts.reduce((sum, p) => sum + p.currentReturn, 0) / investmentProducts.length;

  // Generate investment performance data
  const investmentData = generateInvestmentPerformance();

  // Investment returns chart data
  const investmentReturnsChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: investmentProducts.slice(0, 3).map((product, index) => ({
      label: product.name,
      data: product.performance.map(p => p.return),
      borderColor: index === 0 ? '#10B981' : index === 1 ? '#3B82F6' : '#8B5CF6',
      backgroundColor: 'transparent',
      tension: 0.4,
    })),
  };

  // Investment distribution chart data
  const investmentDistributionChartData = {
    labels: investmentData.labels,
    datasets: [
      {
        data: investmentData.amounts.map(amount => amount / 1000000000), // Convert to billions
        backgroundColor: investmentData.colors,
        borderWidth: 0,
      },
    ],
  };

  // Investment returns by type chart data
  const investmentReturnsByTypeChartData = {
    labels: investmentData.labels,
    datasets: [
      {
        label: 'Average Return (%)',
        data: investmentData.returns,
        backgroundColor: investmentData.colors,
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
                alt="Investment Oversight Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Investment Oversight</h1>
              <p className="text-gray-600">Monitor investment portfolios, manage investment products, and track performance</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <PieChart className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Products</p>
                <p className="text-2xl font-bold text-green-600">{activeProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Investors</p>
                <p className="text-2xl font-bold text-purple-600">{totalInvestors.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total AUM</p>
                <p className="text-2xl font-bold text-orange-600">{formatCurrency(totalValue)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Return</p>
                <p className="text-2xl font-bold text-indigo-600">{avgReturn.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Investment Returns Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <img src="/image.png" alt="Returns Chart Mascot" className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-900">Investment Returns Trend</h3>
              </div>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View Details
              </button>
            </div>
            <LineChart data={investmentReturnsChartData} height={280} />
          </div>

          {/* Investment Distribution Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <img src="/image.png" alt="Distribution Chart Mascot" className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-900">Investment Distribution</h3>
              </div>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View Details
              </button>
            </div>
            <DoughnutChart data={investmentDistributionChartData} height={280} />
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
                  placeholder="Search investment products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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

              <button className="flex items-center space-x-2 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
                <Plus className="h-4 w-4" />
                <span>Add Product</span>
              </button>

              <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Investment Products Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <img src="/image.png" alt="Investment Products Mascot" className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-gray-900">
                Investment Products ({filteredInvestments.length})
              </h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Returns & Risk
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Investors & AUM
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
                {filteredInvestments.map((investment) => (
                  <tr key={investment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary-100 p-2 rounded-lg">
                          <TrendingUp className="h-6 w-6 text-primary-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <div className="text-sm font-medium text-gray-900">{investment.name}</div>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(investment.type)}`}>
                              {investment.type.replace('_', ' ')}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            Min: {formatCurrency(investment.minInvestment)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {investment.minReturn}% - {investment.maxReturn}%
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getRiskColor(investment.riskLevel)}`}>
                          {investment.riskLevel} risk
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {investment.totalInvestors.toLocaleString()} investors
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatCurrency(investment.totalAmount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {investment.currentReturn >= investment.minReturn ? (
                          <ArrowUpRight className="h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-500" />
                        )}
                        <span className={`text-sm font-medium ${
                          investment.currentReturn >= investment.minReturn ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {investment.currentReturn}%
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">Current return</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(investment.status)}`}>
                        {investment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedInvestment(investment);
                            setShowInvestmentModal(true);
                          }}
                          className="text-primary-600 hover:text-primary-900 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleInvestmentAction('edit', investment.id)}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleInvestmentAction('analytics', investment.id)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          <BarChart3 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredInvestments.length === 0 && (
            <div className="p-12 text-center">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <img src="/image.png" alt="No Investments" className="w-8 h-8 opacity-50" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No investment products found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Investment Detail Modal */}
        {showInvestmentModal && selectedInvestment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="Investment Detail Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">{selectedInvestment.name}</h3>
                </div>
                <button
                  onClick={() => setShowInvestmentModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Investment Overview */}
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Investment Overview</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium capitalize">{selectedInvestment.type.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Risk Level:</span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(selectedInvestment.riskLevel)}`}>
                          {selectedInvestment.riskLevel}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expected Returns:</span>
                        <span className="font-medium">{selectedInvestment.minReturn}% - {selectedInvestment.maxReturn}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Return:</span>
                        <span className="font-medium text-green-600">{selectedInvestment.currentReturn}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Min Investment:</span>
                        <span className="font-medium">{formatCurrency(selectedInvestment.minInvestment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Maturity Period:</span>
                        <span className="font-medium">{selectedInvestment.maturityPeriod}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Investors:</span>
                        <span className="font-medium">{selectedInvestment.totalInvestors.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Assets Under Management:</span>
                        <span className="font-medium">{formatCurrency(selectedInvestment.totalAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fund Manager:</span>
                        <span className="font-medium">{selectedInvestment.manager}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Inception Date:</span>
                        <span className="font-medium">{formatDate(selectedInvestment.inception)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedInvestment.status)}`}>
                          {selectedInvestment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Chart */}
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Performance Trend</h4>
                    <LineChart 
                      data={{
                        labels: selectedInvestment.performance.map((p: any) => p.month),
                        datasets: [
                          {
                            label: 'Monthly Return (%)',
                            data: selectedInvestment.performance.map((p: any) => p.return),
                            borderColor: '#10B981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            fill: true,
                            tension: 0.4,
                          }
                        ]
                      }}
                      height={240}
                    />
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Description</h4>
                    <p className="text-gray-700 leading-relaxed">{selectedInvestment.description}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors">
                  Edit Product
                </button>
                <button className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 py-3 rounded-lg font-medium transition-colors">
                  View Analytics
                </button>
                <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors">
                  {selectedInvestment.status === 'active' ? 'Pause' : 'Activate'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentOversight;