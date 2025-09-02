import React, { useState } from 'react';
import {
  Settings,
  Target,
  Clock,
  DollarSign,
  Percent,
  Calendar,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  Plus,
  Edit,
  Save,
  Eye,
  Trash2,
  Copy,
  RefreshCw,
  BarChart3,
  TrendingUp,
  Users,
  Shield,
  Zap,
  Timer,
  Calculator
} from 'lucide-react';
import BarChart from '../../components/charts/BarChart';
import LineChart from '../../components/charts/LineChart';

const PlanConfigurationEngine: React.FC = () => {
  const [activeTab, setActiveTab] = useState('parameters');
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);

  const [planConfig, setPlanConfig] = useState({
    name: '',
    type: 'flexible',
    interestRate: 10.0,
    maturityPeriod: 12,
    minAmount: 1000,
    maxAmount: '',
    autoSaveEnabled: false,
    autoSaveFrequency: 'monthly',
    autoSaveAmount: 5000,
    lockDuration: 0,
    earlyWithdrawalPenalty: 0,
    gracePeriod: 0,
    compoundingFrequency: 'monthly',
    tierBasedRates: false,
    bonusRates: [],
    restrictions: {
      ageLimit: { min: 18, max: 65 },
      kycRequired: 1,
      maxAccountsPerUser: 1,
      geographicRestrictions: []
    }
  });

  const existingPlans = [
    {
      id: 1,
      name: 'Flex Save',
      type: 'flexible',
      interestRate: 10.0,
      maturityPeriod: null,
      minAmount: 1000,
      maxAmount: null,
      autoSaveEnabled: true,
      lockDuration: 0,
      earlyWithdrawalPenalty: 0,
      gracePeriod: 7,
      status: 'active',
      users: 45230,
      totalAmount: 15200000000,
      avgBalance: 336000,
      retentionRate: 89.5,
      adoptionRate: 12.3
    },
    {
      id: 2,
      name: 'Fixed Save',
      type: 'fixed',
      interestRate: 15.0,
      maturityPeriod: 12,
      minAmount: 10000,
      maxAmount: null,
      autoSaveEnabled: false,
      lockDuration: 365,
      earlyWithdrawalPenalty: 5.0,
      gracePeriod: 0,
      status: 'active',
      users: 28450,
      totalAmount: 18700000000,
      avgBalance: 657000,
      retentionRate: 94.2,
      adoptionRate: 8.7
    },
    {
      id: 3,
      name: 'Target Save',
      type: 'goal',
      interestRate: 13.0,
      maturityPeriod: 24,
      minAmount: 5000,
      maxAmount: null,
      autoSaveEnabled: true,
      lockDuration: 0,
      earlyWithdrawalPenalty: 2.5,
      gracePeriod: 14,
      status: 'active',
      users: 52100,
      totalAmount: 11300000000,
      avgBalance: 217000,
      retentionRate: 91.8,
      adoptionRate: 15.2
    }
  ];

  const lockWithdrawalRules = [
    {
      id: 1,
      planId: 2,
      planName: 'Fixed Save',
      lockDuration: 365,
      lockType: 'fixed',
      earlyWithdrawalAllowed: true,
      penaltyType: 'percentage',
      penaltyValue: 5.0,
      gracePeriod: 0,
      emergencyWithdrawal: true,
      emergencyPenalty: 10.0,
      partialWithdrawalAllowed: false,
      minimumLockAmount: 10000,
      status: 'active'
    },
    {
      id: 2,
      planId: 3,
      planName: 'Target Save',
      lockDuration: 0,
      lockType: 'flexible',
      earlyWithdrawalAllowed: true,
      penaltyType: 'percentage',
      penaltyValue: 2.5,
      gracePeriod: 14,
      emergencyWithdrawal: true,
      emergencyPenalty: 1.0,
      partialWithdrawalAllowed: true,
      minimumLockAmount: 5000,
      status: 'active'
    }
  ];

  const tabs = [
    { id: 'parameters', label: 'Plan Parameters', icon: Settings },
    { id: 'rules', label: 'Lock & Withdrawal Rules', icon: Lock },
    { id: 'analytics', label: 'Performance Analytics', icon: BarChart3 },
    { id: 'testing', label: 'Plan Testing', icon: Target }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'paused':
        return 'bg-yellow-100 text-yellow-700';
      case 'sunset':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleCreatePlan = () => {
    console.log('Creating plan with config:', planConfig);
    setShowCreateModal(false);
    // Reset form
    setPlanConfig({
      name: '',
      type: 'flexible',
      interestRate: 10.0,
      maturityPeriod: 12,
      minAmount: 1000,
      maxAmount: '',
      autoSaveEnabled: false,
      autoSaveFrequency: 'monthly',
      autoSaveAmount: 5000,
      lockDuration: 0,
      earlyWithdrawalPenalty: 0,
      gracePeriod: 0,
      compoundingFrequency: 'monthly',
      tierBasedRates: false,
      bonusRates: [],
      restrictions: {
        ageLimit: { min: 18, max: 65 },
        kycRequired: 1,
        maxAccountsPerUser: 1,
        geographicRestrictions: []
      }
    });
  };

  const handlePlanAction = (action: string, planId: number) => {
    console.log(`${action} plan:`, planId);
  };

  const calculateProjectedInterest = (principal: number, rate: number, period: number) => {
    return (principal * rate * period) / (100 * 12);
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
                alt="Plan Configuration Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Plan Configuration Engine</h1>
              <p className="text-gray-600">Define plan parameters, configure rules, and analyze performance</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
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

        {/* Plan Parameters Tab */}
        {activeTab === 'parameters' && (
          <div className="space-y-8">
            {/* Action Bar */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img src="/image.png" alt="Parameters Mascot" className="w-5 h-5" />
                  <h2 className="text-xl font-semibold text-gray-900">Savings Plan Parameters</h2>
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create New Plan</span>
                </button>
              </div>
            </div>

            {/* Existing Plans */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {existingPlans.map((plan) => (
                <div key={plan.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary-100 p-2 rounded-lg">
                        <img src="/image.png" alt="Plan Icon" className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(plan.status)}`}>
                      {plan.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Interest Rate:</span>
                      <span className="text-sm font-medium">{plan.interestRate}% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Min Amount:</span>
                      <span className="text-sm font-medium">{formatCurrency(plan.minAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Lock Duration:</span>
                      <span className="text-sm font-medium">
                        {plan.lockDuration > 0 ? `${plan.lockDuration} days` : 'Flexible'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Users:</span>
                      <span className="text-sm font-medium">{plan.users.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Amount:</span>
                      <span className="text-sm font-medium">{formatCurrency(plan.totalAmount)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-gray-600">Retention Rate</p>
                      <p className="text-lg font-bold text-green-600">{plan.retentionRate}%</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-gray-600">Adoption Rate</p>
                      <p className="text-lg font-bold text-blue-600">{plan.adoptionRate}%</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedPlan(plan);
                        setShowCreateModal(true);
                      }}
                      className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handlePlanAction('analytics', plan.id)}
                      className="px-3 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors"
                    >
                      <BarChart3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handlePlanAction('copy', plan.id)}
                      className="px-3 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lock & Withdrawal Rules Tab */}
        {activeTab === 'rules' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <img src="/image.png" alt="Rules Mascot" className="w-5 h-5" />
                  <h2 className="text-xl font-semibold text-gray-900">Lock & Withdrawal Rules</h2>
                </div>
                <button
                  onClick={() => setShowRulesModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Rule</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lock Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Early Withdrawal
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Penalty
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Grace Period
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
                    {lockWithdrawalRules.map((rule) => (
                      <tr key={rule.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="bg-primary-100 p-2 rounded-lg">
                              {rule.lockType === 'fixed' ? (
                                <Lock className="h-5 w-5 text-primary-600" />
                              ) : (
                                <Unlock className="h-5 w-5 text-primary-600" />
                              )}
                            </div>
                            <div className="text-sm font-medium text-gray-900">{rule.planName}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {rule.lockDuration > 0 ? `${rule.lockDuration} days` : 'No lock'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            rule.earlyWithdrawalAllowed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {rule.earlyWithdrawalAllowed ? 'Allowed' : 'Not Allowed'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {rule.penaltyValue}% of interest
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {rule.gracePeriod > 0 ? `${rule.gracePeriod} days` : 'None'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(rule.status)}`}>
                            {rule.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-primary-600 hover:text-primary-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <Eye className="h-4 w-4" />
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

        {/* Performance Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Plans</p>
                    <p className="text-2xl font-bold text-gray-900">{existingPlans.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg Adoption</p>
                    <p className="text-2xl font-bold text-green-600">
                      {(existingPlans.reduce((sum, p) => sum + p.adoptionRate, 0) / existingPlans.length).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg Retention</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {(existingPlans.reduce((sum, p) => sum + p.retentionRate, 0) / existingPlans.length).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total AUM</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatCurrency(existingPlans.reduce((sum, p) => sum + p.totalAmount, 0))}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Plan Performance Table */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <img src="/image.png" alt="Performance Mascot" className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-900">Plan Performance Analytics</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Users
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avg Balance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Retention Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Adoption Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {existingPlans.map((plan) => (
                      <tr key={plan.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{plan.name}</div>
                          <div className="text-sm text-gray-500 capitalize">{plan.type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {plan.users.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(plan.totalAmount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(plan.avgBalance)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${plan.retentionRate}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{plan.retentionRate}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${plan.adoptionRate * 5}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{plan.adoptionRate}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-primary-600 hover:text-primary-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <BarChart3 className="h-4 w-4" />
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

        {/* Plan Testing Tab */}
        {activeTab === 'testing' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <img src="/image.png" alt="Testing Mascot" className="w-5 h-5" />
                <h2 className="text-xl font-semibold text-gray-900">Plan Testing & Simulation</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Interest Calculator</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Principal Amount (₦)</label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="100000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="15.0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Period (months)</label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="12"
                        />
                      </div>
                      <button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors">
                        Calculate Interest
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-4">Calculation Results</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Principal:</span>
                      <span className="font-medium">₦100,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Rate:</span>
                      <span className="font-medium">15% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Period:</span>
                      <span className="font-medium">12 months</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interest Earned:</span>
                        <span className="font-bold text-green-600">₦15,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Final Amount:</span>
                        <span className="font-bold text-primary-600">₦115,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create/Edit Plan Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="Create Plan Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedPlan ? 'Edit Plan' : 'Create New Plan'}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setSelectedPlan(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-8">
                {/* Basic Parameters */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Basic Parameters</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Plan Name</label>
                      <input
                        type="text"
                        value={planConfig.name}
                        onChange={(e) => setPlanConfig({...planConfig, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="e.g., Super Save"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Plan Type</label>
                      <select
                        value={planConfig.type}
                        onChange={(e) => setPlanConfig({...planConfig, type: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="flexible">Flexible</option>
                        <option value="fixed">Fixed</option>
                        <option value="goal">Goal-based</option>
                        <option value="premium">Premium</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={planConfig.interestRate}
                        onChange={(e) => setPlanConfig({...planConfig, interestRate: parseFloat(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Maturity Period (months)</label>
                      <input
                        type="number"
                        value={planConfig.maturityPeriod}
                        onChange={(e) => setPlanConfig({...planConfig, maturityPeriod: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Amount (₦)</label>
                      <input
                        type="number"
                        value={planConfig.minAmount}
                        onChange={(e) => setPlanConfig({...planConfig, minAmount: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Amount (₦)</label>
                      <input
                        type="number"
                        value={planConfig.maxAmount}
                        onChange={(e) => setPlanConfig({...planConfig, maxAmount: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Leave empty for no limit"
                      />
                    </div>
                  </div>
                </div>

                {/* Auto-Save Configuration */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Auto-Save Configuration</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h5 className="font-medium text-gray-900">Enable Auto-Save</h5>
                        <p className="text-sm text-gray-600">Allow users to set up automatic savings</p>
                      </div>
                      <button
                        onClick={() => setPlanConfig({...planConfig, autoSaveEnabled: !planConfig.autoSaveEnabled})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          planConfig.autoSaveEnabled ? 'bg-primary-500' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            planConfig.autoSaveEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {planConfig.autoSaveEnabled && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Auto-Save Frequency</label>
                          <select
                            value={planConfig.autoSaveFrequency}
                            onChange={(e) => setPlanConfig({...planConfig, autoSaveFrequency: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Default Auto-Save Amount (₦)</label>
                          <input
                            type="number"
                            value={planConfig.autoSaveAmount}
                            onChange={(e) => setPlanConfig({...planConfig, autoSaveAmount: parseInt(e.target.value)})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Lock & Withdrawal Rules */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Lock & Withdrawal Rules</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Lock Duration (days)</label>
                      <input
                        type="number"
                        value={planConfig.lockDuration}
                        onChange={(e) => setPlanConfig({...planConfig, lockDuration: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="0 for flexible"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Early Withdrawal Penalty (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={planConfig.earlyWithdrawalPenalty}
                        onChange={(e) => setPlanConfig({...planConfig, earlyWithdrawalPenalty: parseFloat(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Grace Period (days)</label>
                      <input
                        type="number"
                        value={planConfig.gracePeriod}
                        onChange={(e) => setPlanConfig({...planConfig, gracePeriod: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Advanced Settings */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Advanced Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Compounding Frequency</label>
                      <select
                        value={planConfig.compoundingFrequency}
                        onChange={(e) => setPlanConfig({...planConfig, compoundingFrequency: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="annually">Annually</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Required KYC Tier</label>
                      <select
                        value={planConfig.restrictions.kycRequired}
                        onChange={(e) => setPlanConfig({
                          ...planConfig, 
                          restrictions: {
                            ...planConfig.restrictions,
                            kycRequired: parseInt(e.target.value)
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value={1}>Tier 1</option>
                        <option value={2}>Tier 2</option>
                        <option value={3}>Tier 3</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setSelectedPlan(null);
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePlan}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  {selectedPlan ? 'Update Plan' : 'Create Plan'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lock & Withdrawal Rules Modal */}
        {showRulesModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="Rules Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">Configure Lock & Withdrawal Rules</h3>
                </div>
                <button
                  onClick={() => setShowRulesModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Plan</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                    {existingPlans.map((plan) => (
                      <option key={plan.id} value={plan.id}>{plan.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lock Duration (days)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="365"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Early Withdrawal Penalty (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="5.0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Grace Period (days)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="7"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Withdrawal Penalty (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="10.0"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h5 className="font-medium text-gray-900">Allow Partial Withdrawals</h5>
                      <p className="text-sm text-gray-600">Users can withdraw part of their savings</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-500">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h5 className="font-medium text-gray-900">Emergency Withdrawal</h5>
                      <p className="text-sm text-gray-600">Allow emergency withdrawals with higher penalty</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-500">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowRulesModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log('Saving rules');
                    setShowRulesModal(false);
                  }}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Save Rules
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanConfigurationEngine;