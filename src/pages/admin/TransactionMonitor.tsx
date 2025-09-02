import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  Flag,
  RefreshCw,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Zap,
  CreditCard,
  Building
} from 'lucide-react';

const TransactionMonitor: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const transactions = [
    {
      id: 'TXN001',
      type: 'credit',
      category: 'deposit',
      amount: 50000,
      fee: 0,
      netAmount: 50000,
      status: 'completed',
      timestamp: '2025-01-15T14:30:00Z',
      userId: 'USR001',
      userName: 'John Doe',
      userEmail: 'john.doe@example.com',
      description: 'Bank Transfer Deposit',
      reference: 'DEP20250115001',
      paymentMethod: 'bank_transfer',
      riskScore: 'low',
      flagged: false,
      location: 'Lagos, Nigeria',
      deviceInfo: 'Mobile App - iOS',
      balanceBefore: 125000,
      balanceAfter: 175000
    },
    {
      id: 'TXN002',
      type: 'debit',
      category: 'withdrawal',
      amount: 100000,
      fee: 500,
      netAmount: 99500,
      status: 'pending',
      timestamp: '2025-01-15T13:45:00Z',
      userId: 'USR002',
      userName: 'Sarah Johnson',
      userEmail: 'sarah.johnson@example.com',
      description: 'Withdrawal to Bank Account',
      reference: 'WTD20250115002',
      paymentMethod: 'bank_transfer',
      riskScore: 'medium',
      flagged: true,
      location: 'Abuja, Nigeria',
      deviceInfo: 'Web Browser - Chrome',
      balanceBefore: 750000,
      balanceAfter: 650000
    },
    {
      id: 'TXN003',
      type: 'credit',
      category: 'investment',
      amount: 250000,
      fee: 0,
      netAmount: 250000,
      status: 'completed',
      timestamp: '2025-01-15T12:20:00Z',
      userId: 'USR003',
      userName: 'Michael Chen',
      userEmail: 'michael.chen@example.com',
      description: 'Fixed Income Investment',
      reference: 'INV20250115003',
      paymentMethod: 'wallet',
      riskScore: 'low',
      flagged: false,
      location: 'Port Harcourt, Nigeria',
      deviceInfo: 'Mobile App - Android',
      balanceBefore: 300000,
      balanceAfter: 50000
    },
    {
      id: 'TXN004',
      type: 'debit',
      category: 'transfer',
      amount: 75000,
      fee: 100,
      netAmount: 74900,
      status: 'failed',
      timestamp: '2025-01-15T11:15:00Z',
      userId: 'USR004',
      userName: 'Amina Bello',
      userEmail: 'amina.bello@example.com',
      description: 'P2P Transfer',
      reference: 'TRF20250115004',
      paymentMethod: 'wallet',
      riskScore: 'high',
      flagged: true,
      location: 'Kano, Nigeria',
      deviceInfo: 'Web Browser - Safari',
      balanceBefore: 2500000,
      balanceAfter: 2500000
    },
    {
      id: 'TXN005',
      type: 'credit',
      category: 'savings',
      amount: 25000,
      fee: 0,
      netAmount: 25000,
      status: 'completed',
      timestamp: '2025-01-15T10:00:00Z',
      userId: 'USR005',
      userName: 'David Wilson',
      userEmail: 'david.wilson@example.com',
      description: 'Auto-Save Deposit',
      reference: 'SAV20250115005',
      paymentMethod: 'auto_debit',
      riskScore: 'low',
      flagged: false,
      location: 'Ibadan, Nigeria',
      deviceInfo: 'System - Automated',
      balanceBefore: 15000,
      balanceAfter: 40000
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Transactions' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
    { value: 'flagged', label: 'Flagged' },
    { value: 'high-risk', label: 'High Risk' },
    { value: 'large-amount', label: 'Large Amount (>₦500K)' }
  ];

  const timeframeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
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
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'high':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTransactionIcon = (category: string, type: string) => {
    switch (category) {
      case 'deposit':
        return <ArrowDownRight className="h-5 w-5 text-green-600" />;
      case 'withdrawal':
        return <ArrowUpRight className="h-5 w-5 text-red-600" />;
      case 'investment':
        return <TrendingUp className="h-5 w-5 text-blue-600" />;
      case 'savings':
        return <img src="/image.png" alt="Savings" className="w-5 h-5" />;
      case 'transfer':
        return <RefreshCw className="h-5 w-5 text-purple-600" />;
      default:
        return <CreditCard className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'bank_transfer':
        return <Building className="h-4 w-4" />;
      case 'wallet':
        return <CreditCard className="h-4 w-4" />;
      case 'auto_debit':
        return <Zap className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.userName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         transaction.status === selectedFilter ||
                         (selectedFilter === 'flagged' && transaction.flagged) ||
                         (selectedFilter === 'high-risk' && transaction.riskScore === 'high') ||
                         (selectedFilter === 'large-amount' && transaction.amount > 500000);
    
    return matchesSearch && matchesFilter;
  });

  const handleTransactionAction = (action: string, transactionId: string) => {
    console.log(`${action} transaction:`, transactionId);
    // Implement transaction actions
  };

  // Calculate stats
  const totalTransactions = transactions.length;
  const completedTransactions = transactions.filter(t => t.status === 'completed').length;
  const pendingTransactions = transactions.filter(t => t.status === 'pending').length;
  const flaggedTransactions = transactions.filter(t => t.flagged).length;
  const totalVolume = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <img 
                src="/image.png" 
                alt="Transaction Monitor Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Transaction Monitor</h1>
              <p className="text-gray-600">Monitor all platform transactions, detect anomalies, and manage transaction disputes</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Volume</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(totalVolume)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-100 p-3 rounded-lg">
                <RefreshCw className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Transactions</p>
                <p className="text-xl font-bold text-gray-900">{totalTransactions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-xl font-bold text-green-600">{completedTransactions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-bold text-yellow-600">{pendingTransactions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-3 rounded-lg">
                <Flag className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Flagged</p>
                <p className="text-xl font-bold text-red-600">{flaggedTransactions}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
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

              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {timeframeOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>

              <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <img src="/image.png" alt="Transactions List Mascot" className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-gray-900">
                Transactions ({filteredTransactions.length})
              </h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => {
                  const { date, time } = formatDateTime(transaction.timestamp);
                  
                  return (
                    <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gray-100 p-2 rounded-lg">
                            {getTransactionIcon(transaction.category, transaction.type)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <div className="text-sm font-medium text-gray-900">
                                {transaction.description}
                              </div>
                              {transaction.flagged && (
                                <Flag className="h-4 w-4 text-red-500" />
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              {transaction.reference}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{transaction.userName}</div>
                        <div className="text-sm text-gray-500">{transaction.userEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </div>
                        {transaction.fee > 0 && (
                          <div className="text-xs text-gray-500">
                            Fee: {formatCurrency(transaction.fee)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(transaction.riskScore)}`}>
                          {transaction.riskScore}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{date}</div>
                        <div className="text-sm text-gray-500">{time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedTransaction(transaction);
                              setShowTransactionModal(true);
                            }}
                            className="text-primary-600 hover:text-primary-900 transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {transaction.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleTransactionAction('approve', transaction.id)}
                                className="text-green-600 hover:text-green-900 transition-colors"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleTransactionAction('reject', transaction.id)}
                                className="text-red-600 hover:text-red-900 transition-colors"
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleTransactionAction('flag', transaction.id)}
                            className="text-yellow-600 hover:text-yellow-900 transition-colors"
                          >
                            <Flag className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="p-12 text-center">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <img src="/image.png" alt="No Transactions" className="w-8 h-8 opacity-50" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Transaction Detail Modal */}
        {showTransactionModal && selectedTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="Transaction Detail Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">Transaction Details</h3>
                </div>
                <button
                  onClick={() => setShowTransactionModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Transaction Overview */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white p-2 rounded-lg">
                        {getTransactionIcon(selectedTransaction.category, selectedTransaction.type)}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{selectedTransaction.description}</h4>
                        <p className="text-gray-600">{selectedTransaction.reference}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        selectedTransaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {selectedTransaction.type === 'credit' ? '+' : '-'}{formatCurrency(selectedTransaction.amount)}
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(selectedTransaction.status)}`}>
                        {selectedTransaction.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* User Information */}
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">User Information</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="text-gray-900 font-medium">{selectedTransaction.userName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="text-gray-900 font-medium">{selectedTransaction.userEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="text-gray-900 font-medium">{selectedTransaction.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Device</p>
                      <p className="text-gray-900 font-medium">{selectedTransaction.deviceInfo}</p>
                    </div>
                  </div>
                </div>

                {/* Transaction Details */}
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">Transaction Details</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className="text-gray-900 font-medium">{formatCurrency(selectedTransaction.amount)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Fee</p>
                      <p className="text-gray-900 font-medium">{formatCurrency(selectedTransaction.fee)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Net Amount</p>
                      <p className="text-gray-900 font-medium">{formatCurrency(selectedTransaction.netAmount)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Method</p>
                      <div className="flex items-center space-x-2">
                        {getPaymentMethodIcon(selectedTransaction.paymentMethod)}
                        <span className="text-gray-900 font-medium capitalize">
                          {selectedTransaction.paymentMethod.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Balance Before</p>
                      <p className="text-gray-900 font-medium">{formatCurrency(selectedTransaction.balanceBefore)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Balance After</p>
                      <p className="text-gray-900 font-medium">{formatCurrency(selectedTransaction.balanceAfter)}</p>
                    </div>
                  </div>
                </div>

                {/* Risk Assessment */}
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">Risk Assessment</h5>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Risk Score</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(selectedTransaction.riskScore)}`}>
                          {selectedTransaction.riskScore} risk
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {selectedTransaction.flagged ? (
                        <div className="flex items-center space-x-2 text-red-600">
                          <Flag className="h-4 w-4" />
                          <span className="text-sm font-medium">Flagged</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">Clean</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4 border-t border-gray-200">
                  {selectedTransaction.status === 'pending' && (
                    <>
                      <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors">
                        Approve Transaction
                      </button>
                      <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors">
                        Reject Transaction
                      </button>
                    </>
                  )}
                  <button className="px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg font-medium transition-colors">
                    View User Profile
                  </button>
                  <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors">
                    {selectedTransaction.flagged ? 'Unflag' : 'Flag'} Transaction
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

export default TransactionMonitor;