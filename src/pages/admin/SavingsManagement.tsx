import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Users,
  DollarSign,
  Percent,
  Calendar,
  Target,
  Settings,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  MoreVertical,
  PieChart,
  Activity
} from 'lucide-react';

const SavingsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [showPlanModal, setShowPlanModal] = useState(false);

  const savingsPlans = [
    {
      id: 1,
      name: 'Flex Save',
      type: 'flexible',
      interestRate: 10.0,
      minAmount: 1000,
      maxAmount: null,
      totalUsers: 45230,
      totalAmount: 15200000000,
      status: 'active',
      createdDate: '2023-01-15',
      lastModified: '2025-01-10',
      description: 'Flexible savings with anytime withdrawal',
      features: ['No minimum balance', 'Withdraw anytime', 'Daily interest calculation'],
      withdrawalPenalty: 0,
      compoundingFrequency: 'daily'
    },
    {
      id: 2,
      name: 'Fixed Save',
      type: 'fixed',
      interestRate: 15.0,
      minAmount: 10000,
      maxAmount: null,
      totalUsers: 28450,
      totalAmount: 18700000000,
      status: 'active',
      createdDate: '2023-01-15',
      lastModified: '2025-01-08',
      description: 'Fixed-term savings with higher returns',
      features: ['Higher interest rates', '6-12 month terms', 'Guaranteed returns'],
      withdrawalPenalty: 5.0,
      compoundingFrequency: 'monthly'
    },
    {
      id: 3,
      name: 'Target Save',
      type: 'goal',
      interestRate: 13.0,
      minAmount: 5000,
      maxAmount: null,
      totalUsers: 52100,
      totalAmount: 11300000000,
      status: 'active',
      createdDate: '2023-02-01',
      lastModified: '2025-01-12',
      description: 'Goal-oriented savings with automated contributions',
      features: ['Goal tracking', 'Automated savings', 'Milestone rewards'],
      withdrawalPenalty: 2.5,
      compoundingFrequency: 'monthly'
    },
    {
      id: 4,
      name: 'Premium Save',
      type: 'premium',
      interestRate: 18.0,
      minAmount: 100000,
      maxAmount: null,
      totalUsers: 8750,
      totalAmount: 8500000000,
      status: 'active',
      createdDate: '2023-06-01',
      lastModified: '2025-01-05',
      description: 'Premium savings for high-value customers',
      features: ['Highest interest rates', 'Priority support', 'Exclusive benefits'],
      withdrawalPenalty: 3.0,
      compoundingFrequency: 'daily'
    },
    {
      id: 5,
      name: 'Student Save',
      type: 'student',
      interestRate: 12.0,
      minAmount: 500,
      maxAmount: 50000,
      totalUsers: 15600,
      totalAmount: 780000000,
      status: 'paused',
      createdDate: '2023-09-01',
      lastModified: '2024-12-20',
      description: 'Special savings plan for students',
      features: ['Low minimum amount', 'Student verification required', 'Educational resources'],
      withdrawalPenalty: 1.0,
      compoundingFrequency: 'monthly'
    }
  ];

  const [newPlan, setNewPlan] = useState({
    name: '',
    type: 'flexible',
    interestRate: 10.0,
    minAmount: 1000,
    maxAmount: '',
    description: '',
    withdrawalPenalty: 0,
    compoundingFrequency: 'monthly'
  });

  const filterOptions = [
    { value: 'all', label: 'All Plans' },
    { value: 'active', label: 'Active Plans' },
    { value: 'paused', label: 'Paused Plans' },
    { value: 'flexible', label: 'Flexible Plans' },
    { value: 'fixed', label: 'Fixed Plans' },
    { value: 'goal', label: 'Goal Plans' },
    { value: 'premium', label: 'Premium Plans' }
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
        return 'bg-green-100 text-green-700 border-green-200';
      case 'paused':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'inactive':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'flexible':
        return 'bg-blue-100 text-blue-700';
      case 'fixed':
        return 'bg-purple-100 text-purple-700';
      case 'goal':
        return 'bg-green-100 text-green-700';
      case 'premium':
        return 'bg-yellow-100 text-yellow-700';
      case 'student':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredPlans = savingsPlans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         plan.status === selectedFilter ||
                         plan.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleCreatePlan = () => {
    console.log('Creating new plan:', newPlan);
    setShowCreateModal(false);
    setNewPlan({
      name: '',
      type: 'flexible',
      interestRate: 10.0,
      minAmount: 1000,
      maxAmount: '',
      description: '',
      withdrawalPenalty: 0,
      compoundingFrequency: 'monthly'
    });
  };

  const handlePlanAction = (action: string, planId: number) => {
    console.log(`${action} plan:`, planId);
  };

  // Calculate totals
  const totalPlans = savingsPlans.length;
  const activePlans = savingsPlans.filter(p => p.status === 'active').length;
  const totalUsers = savingsPlans.reduce((sum, p) => sum + p.totalUsers, 0);
  const totalValue = savingsPlans.reduce((sum, p) => sum + p.totalAmount, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <img 
                src="/image.png" 
                alt="Savings Management Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Savings Management</h1>
              <p className="text-gray-600">Oversee savings plans, manage interest rates, and monitor savings performance</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <PieChart className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Plans</p>
                <p className="text-2xl font-bold text-gray-900">{totalPlans}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Plans</p>
                <p className="text-2xl font-bold text-green-600">{activePlans}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Savers</p>
                <p className="text-2xl font-bold text-purple-600">{totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-orange-600">{formatCurrency(totalValue)}</p>
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
                  placeholder="Search savings plans..."
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

              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Create Plan</span>
              </button>

              <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Savings Plans Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <img src="/image.png" alt="Plans List Mascot" className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-gray-900">
                Savings Plans ({filteredPlans.length})
              </h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Interest Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Users & Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Modified
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPlans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary-100 p-2 rounded-lg">
                          <img src="/image.png" alt="Plan Icon" className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <div className="text-sm font-medium text-gray-900">{plan.name}</div>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(plan.type)}`}>
                              {plan.type}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">{plan.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{plan.interestRate}% p.a.</div>
                      <div className="text-sm text-gray-500">
                        Min: {formatCurrency(plan.minAmount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {plan.totalUsers.toLocaleString()} users
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatCurrency(plan.totalAmount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(plan.status)}`}>
                        {plan.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(plan.lastModified)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedPlan(plan);
                            setShowPlanModal(true);
                          }}
                          className="text-primary-600 hover:text-primary-900 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handlePlanAction('edit', plan.id)}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handlePlanAction('settings', plan.id)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          <Settings className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPlans.length === 0 && (
            <div className="p-12 text-center">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <img src="/image.png" alt="No Plans" className="w-8 h-8 opacity-50" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No savings plans found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Create Plan Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="Create Plan Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">Create New Savings Plan</h3>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Plan Name</label>
                    <input
                      type="text"
                      value={newPlan.name}
                      onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Super Save"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Plan Type</label>
                    <select
                      value={newPlan.type}
                      onChange={(e) => setNewPlan({...newPlan, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="flexible">Flexible</option>
                      <option value="fixed">Fixed</option>
                      <option value="goal">Goal-based</option>
                      <option value="premium">Premium</option>
                      <option value="student">Student</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newPlan.interestRate}
                      onChange={(e) => setNewPlan({...newPlan, interestRate: parseFloat(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Amount (₦)</label>
                    <input
                      type="number"
                      value={newPlan.minAmount}
                      onChange={(e) => setNewPlan({...newPlan, minAmount: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Amount (₦)</label>
                    <input
                      type="number"
                      value={newPlan.maxAmount}
                      onChange={(e) => setNewPlan({...newPlan, maxAmount: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Leave empty for no limit"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Penalty (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newPlan.withdrawalPenalty}
                      onChange={(e) => setNewPlan({...newPlan, withdrawalPenalty: parseFloat(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newPlan.description}
                    onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Describe the savings plan..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Compounding Frequency</label>
                  <select
                    value={newPlan.compoundingFrequency}
                    onChange={(e) => setNewPlan({...newPlan, compoundingFrequency: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
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
                  onClick={handleCreatePlan}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Create Plan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Plan Detail Modal */}
        {showPlanModal && selectedPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="Plan Detail Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">{selectedPlan.name} Details</h3>
                </div>
                <button
                  onClick={() => setShowPlanModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Plan Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium capitalize">{selectedPlan.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interest Rate:</span>
                        <span className="font-medium">{selectedPlan.interestRate}% p.a.</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Min Amount:</span>
                        <span className="font-medium">{formatCurrency(selectedPlan.minAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Penalty:</span>
                        <span className="font-medium">{selectedPlan.withdrawalPenalty}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Performance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Users:</span>
                        <span className="font-medium">{selectedPlan.totalUsers.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="font-medium">{formatCurrency(selectedPlan.totalAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedPlan.status)}`}>
                          {selectedPlan.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Created:</span>
                        <span className="font-medium">{formatDate(selectedPlan.createdDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedPlan.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 pt-4 border-t border-gray-200">
                  <button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors">
                    Edit Plan
                  </button>
                  <button className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 py-3 rounded-lg font-medium transition-colors">
                    View Analytics
                  </button>
                  <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors">
                    {selectedPlan.status === 'active' ? 'Pause' : 'Activate'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavingsManagement;