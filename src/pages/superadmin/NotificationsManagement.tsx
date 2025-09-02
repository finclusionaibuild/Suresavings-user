import React, { useState } from 'react';
import {
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Users,
  Send,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Target,
  Calendar,
  BarChart3,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const NotificationsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const campaigns = [
    {
      id: 1,
      name: 'Welcome Series',
      type: 'automated',
      channel: 'email',
      status: 'active',
      recipients: 125000,
      sent: 125000,
      delivered: 123750,
      opened: 30375
    },
    {
      id: 2,
      name: 'Monthly Savings Report',
      type: 'scheduled',
      channel: 'email',
      status: 'active',
      recipients: 985000,
      sent: 985000,
      delivered: 972300,
      opened: 238215
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Notifications Management</h1>
          <p className="text-gray-600">Manage notification campaigns and templates</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Campaigns</h3>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                <p className="text-gray-600">{campaign.type} - {campaign.channel}</p>
                <p className="text-gray-600">Recipients: {campaign.recipients.toLocaleString()}</p>
                <p className="text-gray-600">Status: {campaign.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsManagement;