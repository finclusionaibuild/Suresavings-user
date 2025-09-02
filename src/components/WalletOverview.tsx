import React, { useState } from 'react';
import { 
  Wallet, 
  Eye, 
  EyeOff, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  RefreshCw,
  TrendingUp,
  DollarSign,
  CreditCard
} from 'lucide-react';

interface WalletOverviewProps {
  showBalances?: boolean;
  onToggleBalances?: () => void;
}

const WalletOverview: React.FC<WalletOverviewProps> = ({ 
  showBalances = true, 
  onToggleBalances 
}) => {
  const [activeWallet, setActiveWallet] = useState('ngn');

  const wallets = [
    {
      id: 'ngn',
      currency: 'NGN',
      symbol: '₦',
      balance: 275000,
      available: 275000,
      pending: 0,
      color: 'bg-gradient-to-br from-primary-500 to-primary-600'
    },
    {
      id: 'usd',
      currency: 'USD',
      symbol: '$',
      balance: 450,
      available: 450,
      pending: 0,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600'
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      type: 'credit',
      description: 'Deposit from GTBank',
      amount: 50000,
      currency: 'NGN',
      date: '2025-01-15T14:30:00Z',
      status: 'completed'
    },
    {
      id: 2,
      type: 'debit',
      description: 'Investment Purchase',
      amount: 100000,
      currency: 'NGN',
      date: '2025-01-14T10:20:00Z',
      status: 'completed'
    },
    {
      id: 3,
      type: 'credit',
      description: 'Interest Payment',
      amount: 5200,
      currency: 'NGN',
      date: '2025-01-12T09:00:00Z',
      status: 'completed'
    }
  ];

  const formatCurrency = (amount: number, currency: string) => {
    const symbol = currency === 'USD' ? '$' : '₦';
    return `${symbol}${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const activeWalletData = wallets.find(w => w.id === activeWallet) || wallets[0];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <img src="/image.png" alt="Wallet Mascot" className="w-6 h-6" />
          <h2 className="text-xl font-semibold text-gray-900">Wallet Overview</h2>
        </div>
        <button
          onClick={onToggleBalances}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          {showBalances ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {/* Wallet Selector */}
      <div className="flex space-x-2 mb-6">
        {wallets.map((wallet) => (
          <button
            key={wallet.id}
            onClick={() => setActiveWallet(wallet.id)}
            className={`flex-1 p-3 rounded-lg border transition-colors ${
              activeWallet === wallet.id
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-center">
              <p className="font-medium">{wallet.currency}</p>
              <p className="text-sm text-gray-500">
                {showBalances ? formatCurrency(wallet.balance, wallet.currency) : '****'}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Active Wallet Card */}
      <div className={`${activeWalletData.color} rounded-xl p-6 text-white mb-6 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Wallet className="w-5 h-5" />
              <span className="text-sm opacity-90">{activeWalletData.currency} Wallet</span>
            </div>
            <CreditCard className="w-5 h-5 opacity-75" />
          </div>
          
          <div className="mb-4">
            <p className="text-sm opacity-75">Available Balance</p>
            <p className="text-3xl font-bold">
              {showBalances ? formatCurrency(activeWalletData.available, activeWalletData.currency) : '****'}
            </p>
          </div>

          {activeWalletData.pending > 0 && (
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 opacity-75" />
              <span className="text-sm opacity-90">
                Pending: {showBalances ? formatCurrency(activeWalletData.pending, activeWalletData.currency) : '****'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <button className="flex flex-col items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
          <ArrowDownRight className="w-6 h-6 text-green-600 mb-1" />
          <span className="text-xs font-medium text-green-700">Deposit</span>
        </button>
        <button className="flex flex-col items-center p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
          <ArrowUpRight className="w-6 h-6 text-red-600 mb-1" />
          <span className="text-xs font-medium text-red-700">Withdraw</span>
        </button>
        <button className="flex flex-col items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
          <RefreshCw className="w-6 h-6 text-blue-600 mb-1" />
          <span className="text-xs font-medium text-blue-700">Transfer</span>
        </button>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View All
          </button>
        </div>
        
        <div className="space-y-3">
          {recentTransactions.slice(0, 3).map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'credit' ? (
                    <ArrowDownRight className="w-4 h-4 text-green-600" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${
                  transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}
                  {formatCurrency(transaction.amount, transaction.currency)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletOverview;