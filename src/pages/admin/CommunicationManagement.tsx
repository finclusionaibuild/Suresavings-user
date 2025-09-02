import React, { useState } from 'react';
import {
  MessageSquare,
  Mail,
  Bell,
  Send,
  Users,
  Target,
  Calendar,
  Clock,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  User,
  Globe,
  Smartphone,
  Monitor,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import BarChart from '../../components/charts/BarChart';
import LineChart from '../../components/charts/LineChart';

const CommunicationManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

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
      opened: 30375,
      clicked: 7594,
      createdDate: '2024-12-01',
      lastSent: '2025-01-15T14:30:00Z',
      openRate: 24.5,
      clickRate: 6.1,
      deliveryRate: 99.0
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
      opened: 238215,
      clicked: 47643,
      createdDate: '2024-10-15',
      lastSent: '2025-01-01T09:00:00Z',
      openRate: 24.5,
      clickRate: 4.9,
      deliveryRate: 98.7
    },
    {
      id: 3,
      name: 'Investment Opportunities',
      type: 'one-time',
      channel: 'sms',
      status: 'completed',
      recipients: 450000,
      sent: 450000,
      delivered: 445500,
      opened: 0,
      clicked: 0,
      createdDate: '2025-01-10',
      lastSent: '2025-01-10T16:00:00Z',
      openRate: 0,
      clickRate: 0,
      deliveryRate: 99.0
    },
    {
      id: 4,
      name: 'KYC Reminder Campaign',
      type: 'triggered',
      channel: 'push',
      status: 'active',
      recipients: 75000,
      sent: 75000,
      delivered: 72000,
      opened: 18000,
      clicked: 5400,
      createdDate: '2024-11-20',
      lastSent: '2025-01-15T11:30:00Z',
      openRate: 25.0,
      clickRate: 7.5,
      deliveryRate: 96.0
    }
  ];

  const templates = [
    {
      id: 1,
      name: 'Welcome Email',
      type: 'email',
      category: 'onboarding',
      status: 'active',
      usage: 125000,
      lastModified: '2024-12-01',
      subject: 'Welcome to SureSavings! 🎉',
      preview: 'Thank you for joining SureSavings. Start your savings journey today...'
    },
    {
      id: 2,
      name: 'Monthly Statement',
      type: 'email',
      category: 'reporting',
      status: 'active',
      usage: 985000,
      lastModified: '2024-11-15',
      subject: 'Your Monthly Savings Report',
      preview: 'Here\'s your savings summary for this month...'
    },
    {
      id: 3,
      name: 'KYC Verification SMS',
      type: 'sms',
      category: 'verification',
      status: 'active',
      usage: 75000,
      lastModified: '2024-10-20',
      subject: '',
      preview: 'Complete your KYC verification to unlock all features...'
    },
    {
      id: 4,
      name: 'Investment Alert',
      type: 'push',
      category: 'investment',
      status: 'active',
      usage: 450000,
      lastModified: '2025-01-05',
      subject: '',
      preview: 'New investment opportunity available with 18% returns...'
    }
  ];

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'one-time',
    channel: 'email',
    audience: 'all',
    subject: '',
    content: '',
    scheduledDate: '',
    templateId: ''
  });

  const filterOptions = [
    { value: 'all', label: 'All Campaigns' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'draft', label: 'Draft' },
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'push', label: 'Push Notifications' }
  ];

  const templateFilterOptions = [
    { value: 'all', label: 'All Templates' },
    { value: 'email', label: 'Email Templates' },
    { value: 'sms', label: 'SMS Templates' },
    { value: 'push', label: 'Push Templates' },
    { value: 'onboarding', label: 'Onboarding' },
    { value: 'reporting', label: 'Reporting' },
    { value: 'verification', label: 'Verification' }
  ];

  const tabs = [
    { id: 'campaigns', label: 'Campaigns', icon: Send },
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

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
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700';
      case 'paused':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'sms':
        return <MessageSquare className="h-4 w-4" />;
      case 'push':
        return <Bell className="h-4 w-4" />;
      default:
        return <Send className="h-4 w-4" />;
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         campaign.status === selectedFilter ||
                         campaign.channel === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         template.type === selectedFilter ||
                         template.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleCreateCampaign = () => {
    console.log('Creating campaign:', newCampaign);
    setShowCreateModal(false);
    setNewCampaign({
      name: '',
      type: 'one-time',
      channel: 'email',
      audience: 'all',
      subject: '',
      content: '',
      scheduledDate: '',
      templateId: ''
    });
  };

  // Generate chart data
  const campaignPerformanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Email Open Rate (%)',
        data: [22.5, 24.1, 23.8, 25.2, 24.5],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'SMS Delivery Rate (%)',
        data: [98.5, 99.1, 98.8, 99.2, 99.0],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ],
  };

  const channelDistributionData = {
    labels: ['Email', 'SMS', 'Push Notifications'],
    datasets: [
      {
        label: 'Messages Sent',
        data: [1110000, 450000, 75000],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(139, 92, 246, 0.7)'
        ],
        borderWidth: 0,
      },
    ],
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
                alt="Communication Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Communication Management</h1>
              <p className="text-gray-600">Manage email campaigns, SMS notifications, and communication templates</p>
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

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div className="space-y-8">
            {/* Campaign Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Send className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Campaigns</p>
                    <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Messages Sent</p>
                    <p className="text-2xl font-bold text-green-600">
                      {campaigns.reduce((sum, c) => sum + c.sent, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Eye className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg Open Rate</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {(campaigns.reduce((sum, c) => sum + c.openRate, 0) / campaigns.length).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Target className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg Click Rate</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {(campaigns.reduce((sum, c) => sum + c.clickRate, 0) / campaigns.length).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search campaigns..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                    <span>Create Campaign</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Campaigns Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <img src="/image.png" alt="Campaigns Mascot" className="w-5 h-5" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Communication Campaigns ({filteredCampaigns.length})
                  </h3>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Campaign
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Channel
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recipients
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Performance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Sent
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCampaigns.map((campaign) => (
                      <tr key={campaign.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="bg-primary-100 p-2 rounded-lg">
                              {getChannelIcon(campaign.channel)}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                              <div className="text-sm text-gray-500 capitalize">{campaign.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {getChannelIcon(campaign.channel)}
                            <span className="text-sm text-gray-900 capitalize">{campaign.channel}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {campaign.recipients.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {campaign.channel === 'email' ? (
                              <>
                                <div>Open: {campaign.openRate}%</div>
                                <div>Click: {campaign.clickRate}%</div>
                              </>
                            ) : (
                              <div>Delivery: {campaign.deliveryRate}%</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                            {campaign.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(campaign.lastSent)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-primary-600 hover:text-primary-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">
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

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
                <div className="flex items-center space-x-2">
                  <img src="/image.png" alt="Templates Mascot" className="w-5 h-5" />
                  <h3 className="text-lg font-semibold text-gray-900">Message Templates</h3>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {templateFilterOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
                    <Plus className="h-4 w-4" />
                    <span>Create Template</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-6 hover:border-primary-300 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {getChannelIcon(template.type)}
                        <h4 className="font-semibold text-gray-900">{template.name}</h4>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(template.status)}`}>
                        {template.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium capitalize">{template.type}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium capitalize">{template.category}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Usage:</span>
                        <span className="font-medium">{template.usage.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Modified:</span>
                        <span className="font-medium">{formatDate(template.lastModified)}</span>
                      </div>
                    </div>

                    {template.subject && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-600 mb-1">Subject:</p>
                        <p className="text-sm font-medium text-gray-900">{template.subject}</p>
                      </div>
                    )}

                    <div className="mb-4">
                      <p className="text-xs text-gray-600 mb-1">Preview:</p>
                      <p className="text-sm text-gray-700 line-clamp-2">{template.preview}</p>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Edit
                      </button>
                      <button className="flex-1 text-gray-600 hover:text-gray-700 text-sm font-medium">
                        Preview
                      </button>
                      <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors">
                        Use
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Campaign Performance Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <img src="/image.png" alt="Performance Chart Mascot" className="w-5 h-5" />
                  <h3 className="text-lg font-semibold text-gray-900">Campaign Performance</h3>
                </div>
                <LineChart data={campaignPerformanceData} height={280} />
              </div>

              {/* Channel Distribution Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <img src="/image.png" alt="Distribution Chart Mascot" className="w-5 h-5" />
                  <h3 className="text-lg font-semibold text-gray-900">Channel Distribution</h3>
                </div>
                <BarChart data={channelDistributionData} height={280} />
              </div>
            </div>
          </div>
        )}

        {/* Create Campaign Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="Create Campaign Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">Create New Campaign</h3>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
                    <input
                      type="text"
                      value={newCampaign.name}
                      onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., New Year Savings Promo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Type</label>
                    <select
                      value={newCampaign.type}
                      onChange={(e) => setNewCampaign({...newCampaign, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="one-time">One-time</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="automated">Automated</option>
                      <option value="triggered">Triggered</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Channel</label>
                    <select
                      value={newCampaign.channel}
                      onChange={(e) => setNewCampaign({...newCampaign, channel: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="email">Email</option>
                      <option value="sms">SMS</option>
                      <option value="push">Push Notification</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                    <select
                      value={newCampaign.audience}
                      onChange={(e) => setNewCampaign({...newCampaign, audience: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="all">All Users</option>
                      <option value="active">Active Users</option>
                      <option value="inactive">Inactive Users</option>
                      <option value="high-value">High Value Users</option>
                      <option value="new-users">New Users</option>
                    </select>
                  </div>
                </div>

                {newCampaign.channel === 'email' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line</label>
                    <input
                      type="text"
                      value={newCampaign.subject}
                      onChange={(e) => setNewCampaign({...newCampaign, subject: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter email subject"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message Content</label>
                  <textarea
                    value={newCampaign.content}
                    onChange={(e) => setNewCampaign({...newCampaign, content: e.target.value})}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter your message content..."
                  />
                </div>

                {(newCampaign.type === 'scheduled') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Date & Time</label>
                    <input
                      type="datetime-local"
                      value={newCampaign.scheduledDate}
                      onChange={(e) => setNewCampaign({...newCampaign, scheduledDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                )}
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCampaign}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Create Campaign
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunicationManagement;