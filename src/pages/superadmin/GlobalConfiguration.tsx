import React, { useState } from 'react';
import {
  Settings,
  Flag,
  ToggleLeft,
  ToggleRight,
  Save,
  RefreshCw,
  Download,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Server,
  Database,
  Shield,
  Users,
  DollarSign,
  Key,
  Eye,
  EyeOff
} from 'lucide-react';

const GlobalConfiguration: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const systemSettings = [
    {
      id: 1,
      category: 'Security',
      settings: [
        { name: 'Two-Factor Authentication', value: true, type: 'boolean' },
        { name: 'Session Timeout (minutes)', value: 30, type: 'number' },
        { name: 'Password Expiry (days)', value: 90, type: 'number' },
        { name: 'Failed Login Attempts', value: 5, type: 'number' }
      ]
    },
    {
      id: 2,
      category: 'Transactions',
      settings: [
        { name: 'Daily Transaction Limit', value: 1000000, type: 'currency' },
        { name: 'Monthly Transaction Limit', value: 50000000, type: 'currency' },
        { name: 'Minimum Deposit', value: 1000, type: 'currency' },
        { name: 'Maximum Withdrawal', value: 5000000, type: 'currency' }
      ]
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
          <h1 className="text-3xl font-bold text-gray-900">Global Configuration</h1>
          <p className="text-gray-600">Manage platform-wide settings and configurations</p>
        </div>

        <div className="space-y-8">
          {systemSettings.map((category) => (
            <div key={category.id} className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category} Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.settings.map((setting, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">{setting.name}</label>
                      {setting.type === 'boolean' ? (
                        <button className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          setting.value ? 'bg-purple-500' : 'bg-gray-200'
                        }`}>
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            setting.value ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      ) : (
                        <div className="flex items-center space-x-2">
                          {setting.type === 'currency' && <span className="text-gray-500">₦</span>}
                          <input
                            type="number"
                            value={setting.value}
                            className="w-24 px-2 py-1 border border-gray-300 rounded text-right"
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      {setting.type === 'boolean' ? 
                        `Currently ${setting.value ? 'enabled' : 'disabled'}` : 
                        `Current value: ${setting.type === 'currency' ? formatCurrency(setting.value) : setting.value}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalConfiguration;