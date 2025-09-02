import React, { useState } from 'react';
import {
  Settings,
  Users,
  Shield,
  Bell,
  Mail,
  Database,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  DollarSign,
  Percent,
  Calendar,
  Phone,
  MapPin,
  Building
} from 'lucide-react';
import BarChart from '../../components/charts/BarChart';
import DoughnutChart from '../../components/charts/DoughnutChart';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showApiKey, setShowApiKey] = useState(false);
  const [settings, setSettings] = useState({
    general: {
      platformName: 'SureSavings',
      platformDescription: 'Smart Savings Platform',
      supportEmail: 'support@suresavings.com',
      supportPhone: '+234 800 SURE SAVE',
      companyAddress: 'Lagos, Nigeria',
      timezone: 'Africa/Lagos',
      currency: 'NGN',
      language: 'en'
    },
    security: {
      twoFactorRequired: true,
      sessionTimeout: 30,
      passwordMinLength: 8,
      passwordRequireSpecial: true,
      maxLoginAttempts: 5,
      accountLockoutDuration: 15,
      apiKeyRotationDays: 90
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: true,
      systemAlerts: true,
      maintenanceNotices: true,
      securityAlerts: true
    },
    limits: {
      dailyTransactionLimit: 1000000,
      monthlyTransactionLimit: 50000000,
      maxSavingsAmount: 10000000,
      maxInvestmentAmount: 5000000,
      kycTier1Limit: 50000,
      kycTier2Limit: 500000,
      kycTier3Limit: 10000000
    },
    rates: {
      flexSaveRate: 10.0,
      fixedSaveRate: 15.0,
      targetSaveRate: 13.0,
      premiumSaveRate: 18.0,
      withdrawalFee: 0.5,
      transferFee: 1.0,
      investmentFee: 2.0
    },
    integrations: {
      paymentGateway: 'Paystack',
      smsProvider: 'Twilio',
      emailProvider: 'SendGrid',
      kycProvider: 'Smile Identity',
      backupEnabled: true,
      analyticsEnabled: true
    }
  });

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'limits', label: 'Transaction Limits', icon: DollarSign },
    { id: 'rates', label: 'Interest Rates', icon: Percent },
    { id: 'integrations', label: 'Integrations', icon: Globe }
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

  const systemStatus = [
    { service: 'Database', status: 'healthy', uptime: '99.9%' },
    { service: 'Payment Gateway', status: 'healthy', uptime: '99.8%' },
    { service: 'SMS Service', status: 'warning', uptime: '98.5%' },
    { service: 'Email Service', status: 'healthy', uptime: '99.7%' },
    { service: 'KYC Service', status: 'healthy', uptime: '99.6%' },
    { service: 'Backup System', status: 'healthy', uptime: '100%' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-700';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700';
      case 'error':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return CheckCircle;
      case 'warning':
        return AlertTriangle;
      case 'error':
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  // System status chart data
  const systemStatusChartData = {
    labels: systemStatus.map(s => s.service),
    datasets: [
      {
        label: 'Uptime',
        data: systemStatus.map(s => parseFloat(s.uptime.replace('%', ''))),
        backgroundColor: systemStatus.map(s => {
          switch (s.status) {
            case 'healthy': return 'rgba(16, 185, 129, 0.7)';
            case 'warning': return 'rgba(245, 158, 11, 0.7)';
            case 'error': return 'rgba(239, 68, 68, 0.7)';
            default: return 'rgba(107, 114, 128, 0.7)';
          }
        }),
        borderWidth: 0,
      },
    ],
  };

  // Notification settings chart data
  const notificationSettingsChartData = {
    labels: ['Email', 'SMS', 'Push', 'System Alerts', 'Maintenance', 'Security'],
    datasets: [
      {
        data: [
          settings.notifications.emailNotifications ? 1 : 0,
          settings.notifications.smsNotifications ? 1 : 0,
          settings.notifications.pushNotifications ? 1 : 0,
          settings.notifications.systemAlerts ? 1 : 0,
          settings.notifications.maintenanceNotices ? 1 : 0,
          settings.notifications.securityAlerts ? 1 : 0,
        ],
        backgroundColor: [
          '#10B981', // Primary green
          '#3B82F6', // Blue
          '#8B5CF6', // Purple
          '#F59E0B', // Orange
          '#EF4444', // Red
          '#6B7280', // Gray
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
                alt="Admin Settings Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
              <p className="text-gray-600">Configure admin-level settings, manage permissions, and control platform features</p>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <img src="/image.png" alt="System Status Mascot" className="w-5 h-5" />
            <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {systemStatus.map((service, index) => {
                const StatusIcon = getStatusIcon(service.status);
                return (
                  <div key={index} className="text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${getStatusColor(service.status)} mb-2`}>
                      <StatusIcon className="h-6 w-6" />
                    </div>
                    <h4 className="text-sm font-medium text-gray-900">{service.service}</h4>
                    <p className="text-xs text-gray-600">{service.uptime} uptime</p>
                  </div>
                );
              })}
            </div>
            <div>
              <BarChart data={systemStatusChartData} height={200} />
            </div>
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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                      <select
                        value={settings.general.currency}
                        onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="NGN">Nigerian Naira (NGN)</option>
                        <option value="USD">US Dollar (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <select
                        value={settings.general.language}
                        onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="en">English</option>
                        <option value="ha">Hausa</option>
                        <option value="yo">Yoruba</option>
                        <option value="ig">Igbo</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Security Settings</h3>
                    <button
                      onClick={() => handleSaveSettings('security')}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  <div className="space-y-6">
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
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
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

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Notification Settings</h3>
                    <button
                      onClick={() => handleSaveSettings('notifications')}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      {Object.entries(settings.notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {key === 'emailNotifications' && 'Send notifications via email'}
                              {key === 'smsNotifications' && 'Send notifications via SMS'}
                              {key === 'pushNotifications' && 'Send push notifications'}
                              {key === 'systemAlerts' && 'Receive system alerts and warnings'}
                              {key === 'maintenanceNotices' && 'Get notified about maintenance schedules'}
                              {key === 'securityAlerts' && 'Receive security-related alerts'}
                            </p>
                          </div>
                          <button
                            onClick={() => handleSettingChange('notifications', key, !value)}
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
                      ))}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Notification Settings Overview</h4>
                      <DoughnutChart data={notificationSettingsChartData} height={300} />
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

              {/* Interest Rates */}
              {activeTab === 'rates' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Interest Rates & Fees</h3>
                    <button
                      onClick={() => handleSaveSettings('rates')}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(settings.rates).map(([key, value]) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()} (%)
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={value}
                            onChange={(e) => handleSettingChange('rates', key, parseFloat(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Savings Plan Rates</h4>
                      <BarChart 
                        data={{
                          labels: ['Flex Save', 'Fixed Save', 'Target Save', 'Premium Save'],
                          datasets: [
                            {
                              label: 'Interest Rate (%)',
                              data: [
                                settings.rates.flexSaveRate,
                                settings.rates.fixedSaveRate,
                                settings.rates.targetSaveRate,
                                settings.rates.premiumSaveRate
                              ],
                              backgroundColor: [
                                'rgba(16, 185, 129, 0.7)',
                                'rgba(59, 130, 246, 0.7)',
                                'rgba(139, 92, 246, 0.7)',
                                'rgba(245, 158, 11, 0.7)'
                              ],
                              borderWidth: 0,
                            }
                          ]
                        }}
                        height={300}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Integrations */}
              {activeTab === 'integrations' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Third-Party Integrations</h3>
                    <button
                      onClick={() => handleSaveSettings('integrations')}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Payment Gateway</label>
                        <select
                          value={settings.integrations.paymentGateway}
                          onChange={(e) => handleSettingChange('integrations', 'paymentGateway', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="Paystack">Paystack</option>
                          <option value="Flutterwave">Flutterwave</option>
                          <option value="Interswitch">Interswitch</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">SMS Provider</label>
                        <select
                          value={settings.integrations.smsProvider}
                          onChange={(e) => handleSettingChange('integrations', 'smsProvider', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="Twilio">Twilio</option>
                          <option value="Termii">Termii</option>
                          <option value="BulkSMS">BulkSMS</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Provider</label>
                        <select
                          value={settings.integrations.emailProvider}
                          onChange={(e) => handleSettingChange('integrations', 'emailProvider', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="SendGrid">SendGrid</option>
                          <option value="Mailgun">Mailgun</option>
                          <option value="Amazon SES">Amazon SES</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">KYC Provider</label>
                        <select
                          value={settings.integrations.kycProvider}
                          onChange={(e) => handleSettingChange('integrations', 'kycProvider', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="Smile Identity">Smile Identity</option>
                          <option value="Youverify">Youverify</option>
                          <option value="Prembly">Prembly</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Backup System</h4>
                          <p className="text-sm text-gray-600">Enable automated daily backups</p>
                        </div>
                        <button
                          onClick={() => handleSettingChange('integrations', 'backupEnabled', !settings.integrations.backupEnabled)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.integrations.backupEnabled ? 'bg-primary-500' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.integrations.backupEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Analytics Tracking</h4>
                          <p className="text-sm text-gray-600">Enable user behavior analytics</p>
                        </div>
                        <button
                          onClick={() => handleSettingChange('integrations', 'analyticsEnabled', !settings.integrations.analyticsEnabled)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.integrations.analyticsEnabled ? 'bg-primary-500' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.integrations.analyticsEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
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

export default AdminSettings;