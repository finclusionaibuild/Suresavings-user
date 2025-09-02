import React, { useState } from 'react';
import {
  Globe,
  Webhook,
  Activity,
  Code,
  Key,
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
  BarChart3,
  Zap,
  Database,
  Server,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const WebhooksAPIConsole: React.FC = () => {
  const [activeTab, setActiveTab] = useState('webhooks');
  const [searchTerm, setSearchTerm] = useState('');

  const webhooks = [
    {
      id: 1,
      name: 'Payment Confirmation',
      url: 'https://api.suresavings.com/webhooks/payment',
      events: ['payment.success', 'payment.failed'],
      status: 'active',
      lastTriggered: '2025-01-15T14:30:00Z',
      successRate: 99.9
    },
    {
      id: 2,
      name: 'User Registration',
      url: 'https://api.suresavings.com/webhooks/user',
      events: ['user.created', 'user.verified'],
      status: 'active',
      lastTriggered: '2025-01-15T13:45:00Z',
      successRate: 99.7
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Webhooks & API Console</h1>
          <p className="text-gray-600">Monitor API usage and manage webhooks</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Webhooks</h3>
          <div className="space-y-4">
            {webhooks.map((webhook) => (
              <div key={webhook.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900">{webhook.name}</h4>
                <p className="text-gray-600 font-mono text-sm">{webhook.url}</p>
                <p className="text-gray-600">Success Rate: {webhook.successRate}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebhooksAPIConsole;