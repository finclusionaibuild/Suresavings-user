import React, { useState } from 'react';
import {
  Globe,
  Link,
  Zap,
  Mail,
  MessageSquare,
  CreditCard,
  User,
  RefreshCw,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Filter,
  Play,
  Pause,
  BarChart3
} from 'lucide-react';

const PlatformIntegrations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const integrations = [
    {
      id: 1,
      name: 'Paystack',
      type: 'Payment Gateway',
      status: 'active',
      version: 'v2.3.1',
      lastSync: '2025-01-15T14:30:00Z',
      successRate: 99.9,
      responseTime: 120,
      callVolume: 250000
    },
    {
      id: 2,
      name: 'Twilio',
      type: 'SMS Provider',
      status: 'active',
      version: 'v1.8.5',
      lastSync: '2025-01-15T13:45:00Z',
      successRate: 99.7,
      responseTime: 150,
      callVolume: 180000
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Platform Integrations</h1>
          <p className="text-gray-600">Manage third-party integrations and API connections</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Integrations</h3>
          <div className="space-y-4">
            {integrations.map((integration) => (
              <div key={integration.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900">{integration.name}</h4>
                <p className="text-gray-600">{integration.type}</p>
                <p className="text-gray-600">Success Rate: {integration.successRate}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformIntegrations;