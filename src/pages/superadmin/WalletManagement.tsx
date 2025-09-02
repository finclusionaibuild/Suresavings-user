import React, { useState } from 'react';
import {
  Wallet,
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Lock,
  Unlock,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Building,
  Shield
} from 'lucide-react';

const WalletManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const wallets = [
    {
      id: 1,
      userName: 'John Doe',
      userEmail: 'john.doe@example.com',
      walletType: 'individual',
      balance: 125000,
      status: 'active',
      kycTier: 2,
      dailyLimit: 500000
    },
    {
      id: 2,
      userName: 'TechCorp Solutions Ltd',
      userEmail: 'admin@techcorp.com',
      walletType: 'business',
      balance: 5500000,
      status: 'active',
      kycTier: 2,
      dailyLimit: 10000000
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Wallet Management</h1>
          <p className="text-gray-600">Monitor user wallets and manage balances</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Wallets</h3>
          <div className="space-y-4">
            {wallets.map((wallet) => (
              <div key={wallet.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900">{wallet.userName}</h4>
                <p className="text-gray-600">{wallet.userEmail}</p>
                <p className="text-gray-600">Balance: {formatCurrency(wallet.balance)}</p>
                <p className="text-gray-600">Type: {wallet.walletType} | KYC Tier: {wallet.kycTier}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletManagement;