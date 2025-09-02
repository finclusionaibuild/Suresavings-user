import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  Filter, 
  Download,
  Calendar,
  CreditCard,
  TrendingUp,
  RefreshCw,
  Eye,
  CheckCircle,
  Clock,
  X
} from 'lucide-react';

const TransactionHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const transactions = [
    {
      id: 'TXN001',
      type: 'credit',
      category: 'savings',
      description: 'Monthly Auto-Save',
      amount: 25000,
      date: '2025-01-15T10:30:00Z',
      status: 'completed',
      reference: 'AS20250115001',
      balance: 275000
    },
    {
      id: 'TXN002',
      type: 'debit',
      category: 'investment',
      description: 'Fixed Income Investment',
      amount: 100000,
      date: '2025-01-14T14:20:00Z',
      status: 'completed',
      reference: 'INV20250114001',
      balance: 250000
    },
    {
      id: 'TXN003',
      type: 'credit',
      category: 'interest',
      description: 'Interest Payment - Fixed Save',
      amount: 5200,
      date: '2025-01-12T09:15:00Z',
      status: 'completed',
      reference: 'INT20250112001',
      balance: 350000
    },
    {
      id: 'TXN004',
      type: 'credit',
      category: 'deposit',
      description: 'Bank Transfer Deposit',
      amount: 50000,
      date: '2025-01-10T16:45:00Z',
      status: 'completed',
      reference: 'DEP20250110001',
      balance: 344800
    },
    {
      id: 'TXN005',
      type: 'debit',
      category: 'withdrawal',
      description: 'Withdrawal to Bank Account',
      amount: 30000,
      date: '2025-01-09T11:30:00Z',
      status: 'completed',
      reference: 'WTD20250109001',
      balance: 294800
    },
    {
      id: 'TXN006',
      type: 'credit',
      category: 'referral',
      description: 'Referral Bonus',
      amount: 2500,
      date: '2025-01-08T13:20:00Z',
      status: 'completed',
      reference: 'REF20250108001',
      balance: 324800
    },
    {
      id: 'TXN007',
      type: 'credit',
      category: 'savings',
      description: 'Target Goal Save - Vacation',
      amount: 15000,
      date: '2025-01-08T08:00:00Z',
      status: 'completed',
      reference: 'TGS20250108001',
      balance: 322300
    },
    {
      id: 'TXN008',
      type: 'debit',
      category: 'investment',
      description: 'Mutual Fund Investment',
      amount: 75000,
      date: '2025-01-05T15:10:00Z',
      status: 'pending',
      reference: 'INV20250105001',
      balance: 307300
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Transactions' },
    { value: 'credit', label: 'Money In' },
    { value: 'debit', label: 'Money Out' },
    { value: 'savings', label: 'Savings' },
    { value: 'investment', label: 'Investments' },
    { value: 'interest', label: 'Interest' },
    { value: 'withdrawal', label: 'Withdrawals' }
  ];

  const periodOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
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

  const getTransactionIcon = (category: string) => {
    switch (category) {
      case 'savings':
        return () => <img src="/image.png" alt="Savings" className="w-6 h-6" />;
      case 'investment':
        return TrendingUp;
      case 'deposit':
        return CreditCard;
      case 'withdrawal':
        return CreditCard;
      case 'interest':
        return TrendingUp;
      case 'referral':
        return RefreshCw;
      default:
        return CreditCard;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'pending':
        return Clock;
      case 'failed':
        return X;
      default:
        return Clock;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'savings':
        return 'bg-primary-100 text-primary-600';
      case 'investment':
        return 'bg-secondary-100 text-secondary-600';
      case 'interest':
        return 'bg-green-100 text-green-600';
      case 'withdrawal':
        return 'bg-red-100 text-red-600';
      case 'deposit':
        return 'bg-blue-100 text-blue-600';
      case 'referral':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         transaction.type === selectedFilter || 
                         transaction.category === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const totalIn = transactions
    .filter(t => t.type === 'credit' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOut = transactions
    .filter(t => t.type === 'debit' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Header with Mascot */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <img 
                src="/image.png" 
                alt="Transaction Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
              <p className="text-gray-600">Track all your savings, investments, and transactions</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <ArrowDownRight className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Money In</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalIn)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-3 rounded-lg">
                <ArrowUpRight className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Money Out</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(totalOut)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Net Flow</p>
                <p className={`text-2xl font-bold ${totalIn - totalOut >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(totalIn - totalOut)}
                </p>
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>

              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {periodOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>

              <button className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <img src="/image.png" alt="Transactions List Mascot" className="w-5 h-5" />
              <h2 className="text-lg font-semibold text-gray-900">
                Transactions ({filteredTransactions.length})
              </h2>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => {
              const IconComponent = getTransactionIcon(transaction.category);
              const StatusIcon = getStatusIcon(transaction.status);
              const { date, time } = formatDate(transaction.date);

              return (
                <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${getCategoryColor(transaction.category)}`}>
                        {transaction.category === 'savings' ? (
                          <img src="/image.png" alt="Savings" className="w-6 h-6" />
                        ) : (
                          <IconComponent className="h-6 w-6" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-semibold text-gray-900">{transaction.description}</h3>
                          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                            <StatusIcon className="h-3 w-3" />
                            <span className="capitalize">{transaction.status}</span>
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{date} at {time}</span>
                          <span>Ref: {transaction.reference}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className={`text-lg font-bold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Balance: {formatCurrency(transaction.balance)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
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

        {/* Load More Button */}
        {filteredTransactions.length > 0 && (
          <div className="mt-8 text-center">
            <button className="px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg font-medium transition-colors">
              Load More Transactions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;