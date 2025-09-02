import React, { useState } from 'react';
import {
  Settings,
  User,
  Shield,
  Bell,
  Globe,
  Lock,
  Key,
  Mail,
  Phone,
  CreditCard,
  Database,
  Server,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter
} from 'lucide-react';

const AccountSettingsManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [showBackupModal, setShowBackupModal] = useState(false);

  const [settings, setSettings] = useState({
    general: {
      platformName: 'SureSavings',
      platformDescription: 'Smart Savings Platform',
      supportEmail: 'support@suresavings.com',
      supportPhone: '+234 800 SURE SAVE',
      companyAddress: 'Lagos, Nigeria',
      timezone: 'Africa/Lagos',
      currency: 'NGN',
      language: 'en',
      maintenanceMode: false,
      newRegistrations: true,
      platformStatus: 'operational'
    },
    security: {
      twoFactorRequired: true,
      sessionTimeout: 30,
      passwordMinLength: 8,
      passwordRequireSpecial: true,
      maxLoginAttempts: 5,
      accountLockoutDuration: 15,
      apiKeyRotationDays: 90,
      encryptionLevel: '256-bit',
      sslEnabled: true,
      fraudDetection: true
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: true,
      systemAlerts: true,
      maintenanceNotices: true,
      securityAlerts: true,
      marketingEmails: false,
      transactionAlerts: true
    },
    limits: {
      dailyTransactionLimit: 1000000,
      monthlyTransactionLimit: 50000000,
      maxSavingsAmount: 10000000,
      maxInvestmentAmount: 5000000,
      kycTier1Limit: 50000,
      kycTier2Limit: 500000,
      kycTier3Limit: 10000000,
      withdrawalDailyLimit: 500000,
      transferDailyLimit: 200000
    },
    integrations: {
      paymentGateway: 'Paystack',
      smsProvider: 'Twilio',
      emailProvider: 'SendGrid',
      kycProvider: 'Smile Identity',
      backupEnabled: true,
      analyticsEnabled: true,
      webhooksEnabled: true,
      apiRateLimit: 1000
    },
    compliance: {
      kycRequired: true,
      amlEnabled: true,
      dataRetentionPeriod: 2555, // 7 years in days
      auditLogging: true,
      complianceReporting: true,
      regulatoryAlerts: true
    }
  });

  const tabs = [
    { id: 'general', label: 'General Settings', icon: Settings },
    { id: 'security', label: 'Security & Privacy', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'limits', label: 'Transaction Limits', icon: CreditCard },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'compliance', label: 'Compliance', icon: Lock },
    { id: 'backup', label: 'Backup & Recovery', icon: Database }
  ];

  const systemStatus = [
    { service: 'Authentication', status: 'operational', uptime: '99.9%', lastCheck: '2 min ago' },
    { service: 'Payment Gateway', status: 'operational', uptime: '99.8%', lastCheck: '1 min ago' },
    { service: 'Database', status: 'operational', uptime: '99.9%', lastCheck: '30 sec ago' },
    { service: 'Email Service', status: 'degraded', uptime: '98.5%', lastCheck: '5 min ago' },
    { service: 'SMS Service', status: 'operational', uptime: '99.7%', lastCheck: '1 min ago' },
    { service: 'KYC Service', status: 'operational', uptime: '99.6%', lastCheck: '3 min ago' }
  ];

  const recentBackups = [
    {
      id: 1,
      type: 'Full Backup',
      size: '2.4 GB',
      status: 'completed',
      date: '2025-01-15T02:00:00Z',
      duration: '45 minutes'
    },
    {
      id: 2,
      type: 'Incremental Backup',
      size: '450 MB',
      status: 'completed',
      date: '2025-01-14T14:00:00Z',
      duration: '8 minutes'
    },
    {
      id: 3,
      type: 'Database Backup',
      size: '1.8 GB',
      status: 'completed',
      date: '2025-01-14T02:00:00Z',
      duration: '32 minutes'
    }
  ];

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = (category: string) => {
    console.log(`Saving ${category} settings:`, settings[category as keyof typeof settings]);
    // Implement save logic
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'degraded':
      case 'running':
        return 'bg-yellow-100 text-yellow-700';
      case 'outage':
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
                alt="Account Settings Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Account Settings Management</h1>
              <p className="text-gray-600">Configure platform settings, security policies, and system preferences</p>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <img src="/image.png" alt="System Status Mascot" className="w-5 h-5" />
            <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {systemStatus.map((service, index) => (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${getStatusColor(service.status)} mb-2`}>
                  <Server className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-medium text-gray-900">{service.service}</h4>
                <p className="text-xs text-gray-600">{service.uptime} uptime</p>
                <p className="text-xs text-gray-500">{service.lastCheck}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-2 sticky top-8">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-500'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-8">
              {/* General Settings */}
              {activeTab === 'general' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">General Settings</h3>
                    <button
                      onClick={() => handleSaveSettings('general')}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                        <input
                          type="text"
                          value={settings.general.platformName}
                          onChange={(e) => handleSettingChange('general', 'platformName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Platform Description</label>
                        <input
                          type="text"
                          value={settings.general.platformDescription}
                          onChange={(e) => handleSettingChange('general', 'platformDescription', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                        <input
                          type="email"
                          value={settings.general.supportEmail}
                          onChange={(e) => handleSettingChange('general', 'supportEmail', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Support Phone</label>
                        <input
                          type="tel"
                          value={settings.general.supportPhone}
                          onChange={(e) => handleSettingChange('general', 'supportPhone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Address</label>
                        <input
                          type="text"
                          value={settings.general.companyAddress}
                          onChange={(e) => handleSettingChange('general', 'companyAddress', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                        <select
                          value={settings.general.timezone}
                          onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="Africa/Lagos">Africa/Lagos</option>
                          <option value="UTC">UTC</option>
                          <option value="America/New_York">America/New_York</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Maintenance Mode</h4>
                          <p className="text-sm text-gray-600">Put the platform in maintenance mode</p>
                        </div>
                        <button
                          onClick={() => handleSettingChange('general', 'maintenanceMode', !settings.general.maintenanceMode)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.general.maintenanceMode ? 'bg-red-500' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.general.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">New User Registration</h4>
                          <p className="text-sm text-gray-600">Allow new users to register</p>
                        </div>
                        <button
                          onClick={() => handleSettingChange('general', 'newRegistrations', !settings.general.newRegistrations)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.general.newRegistrations ? 'bg-primary-500' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.general.newRegistrations ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Security & Privacy Settings</h3>
                    <button
                      onClick={() => handleSaveSettings('security')}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-600">Require 2FA for all admin accounts</p>
                        </div>
                        <button
                          onClick={() => handleSettingChange('security', 'twoFactorRequired', !settings.security.twoFactorRequired)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.security.twoFactorRequired ? 'bg-primary-500' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.security.twoFactorRequired ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">SSL Encryption</h4>
                          <p className="text-sm text-gray-600">Enable SSL encryption for all connections</p>
                        </div>
                        <button
                          onClick={() => handleSettingChange('security', 'sslEnabled', !settings.security.sslEnabled)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.security.sslEnabled ? 'bg-primary-500' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.security.sslEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Fraud Detection</h4>
                          <p className="text-sm text-gray-600">Enable automated fraud detection</p>
                        </div>
                        <button
                          onClick={() => handleSettingChange('security', 'fraudDetection', !settings.security.fraudDetection)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.security.fraudDetection ? 'bg-primary-500' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.security.fraudDetection ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                        <input
                          type="number"
                          value={settings.security.sessionTimeout}
                          onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password Minimum Length</label>
                        <input
                          type="number"
                          value={settings.security.passwordMinLength}
                          onChange={(e) => handleSettingChange('security', 'passwordMinLength', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                        <input
                          type="number"
                          value={settings.security.maxLoginAttempts}
                          onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Account Lockout Duration (minutes)</label>
                        <input
                          type="number"
                          value={settings.security.accountLockoutDuration}
                          onChange={(e) => handleSettingChange('security', 'accountLockoutDuration', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Key className="h-5 w-5 text-yellow-600" />
                        <h4 className="font-medium text-yellow-800">API Key Management</h4>
                      </div>
                      <p className="text-sm text-yellow-700 mb-3">Current API key expires in 45 days</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <input
                            type={showApiKey ? 'text' : 'password'}
                            value="STRIPE_SECRET_KEY"
                            readOnly
                            className="w-full px-3 py-2 border border-yellow-300 rounded-lg bg-yellow-50"
                          />
                        </div>
                        <button
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="p-2 text-yellow-600 hover:text-yellow-700"
                        >
                          {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                        <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors">
                          Regenerate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Transaction Limits */}
              {activeTab === 'limits' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Transaction Limits</h3>
                    <button
                      onClick={() => handleSaveSettings('limits')}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(settings.limits).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()} (₦)
                        </label>
                        <input
                          type="number"
                          value={value}
                          onChange={(e) => handleSettingChange('limits', key, parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Backup & Recovery */}
              {activeTab === 'backup' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Backup & Recovery</h3>
                    <button
                      onClick={() => setShowBackupModal(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Create Backup</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center space-x-3 mb-4">
                          <Database className="h-8 w-8 text-blue-500" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Database Backup</h4>
                            <p className="text-sm text-gray-600">Last: 2 hours ago</p>
                          </div>
                        </div>
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
                          Backup Now
                        </button>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center space-x-3 mb-4">
                          <Server className="h-8 w-8 text-green-500" />
                          <div>
                            <h4 className="font-semibold text-gray-900">System Backup</h4>
                            <p className="text-sm text-gray-600">Last: 6 hours ago</p>
                          </div>
                        </div>
                        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors">
                          Backup Now
                        </button>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center space-x-3 mb-4">
                          <Upload className="h-8 w-8 text-purple-500" />
                          <div>
                            <h4 className="font-semibold text-gray-900">File Backup</h4>
                            <p className="text-sm text-gray-600">Last: 12 hours ago</p>
                          </div>
                        </div>
                        <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition-colors">
                          Backup Now
                        </button>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg">
                      <div className="px-6 py-4 border-b border-gray-200">
                        <h4 className="text-lg font-semibold text-gray-900">Recent Backups</h4>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {recentBackups.map((backup) => (
                          <div key={backup.id} className="p-6 hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="bg-primary-100 p-2 rounded-lg">
                                  <Database className="h-6 w-6 text-primary-600" />
                                </div>
                                <div>
                                  <h5 className="font-medium text-gray-900">{backup.type}</h5>
                                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <span>Size: {backup.size}</span>
                                    <span>Duration: {backup.duration}</span>
                                    <span>{formatDate(backup.date)}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(backup.status)}`}>
                                  {backup.status}
                                </span>
                                <button className="text-primary-600 hover:text-primary-700">
                                  <Download className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Compliance Settings */}
              {activeTab === 'compliance' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Compliance Settings</h3>
                    <button
                      onClick={() => handleSaveSettings('compliance')}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      {Object.entries(settings.compliance).map(([key, value]) => {
                        if (typeof value === 'boolean') {
                          return (
                            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div>
                                <h4 className="font-medium text-gray-900 capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {key === 'kycRequired' && 'Require KYC verification for all users'}
                                  {key === 'amlEnabled' && 'Enable Anti-Money Laundering checks'}
                                  {key === 'auditLogging' && 'Log all administrative actions'}
                                  {key === 'complianceReporting' && 'Generate compliance reports'}
                                  {key === 'regulatoryAlerts' && 'Send regulatory compliance alerts'}
                                </p>
                              </div>
                              <button
                                onClick={() => handleSettingChange('compliance', key, !value)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  value ? 'bg-primary-500' : 'bg-gray-200'
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    value ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                            </div>
                          );
                        } else {
                          return (
                            <div key={key}>
                              <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()} (days)
                              </label>
                              <input
                                type="number"
                                value={value}
                                onChange={(e) => handleSettingChange('compliance', key, parseInt(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                              />
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsManagement;