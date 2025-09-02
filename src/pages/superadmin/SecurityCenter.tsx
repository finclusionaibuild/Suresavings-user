import React, { useState } from 'react';
import {
  Shield,
  Lock,
  AlertTriangle,
  CheckCircle,
  Eye,
  UserX,
  Key,
  RefreshCw,
  Download,
  Calendar,
  Clock,
  Search,
  Filter,
  Settings,
  Globe,
  Users,
  Database,
  Server,
  FileText,
  XCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const SecurityCenter: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('day');

  const securityMetrics = [
    {
      title: 'Security Score',
      value: '98.5%',
      change: '+2.1%',
      trend: 'up',
      icon: Shield,
      color: 'green'
    },
    {
      title: 'Active Sessions',
      value: '1,247',
      change: '+125',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Security Alerts',
      value: '3',
      change: '-2',
      trend: 'down',
      icon: AlertTriangle,
      color: 'yellow'
    },
    {
      title: 'Failed Logins',
      value: '24',
      change: '+5',
      trend: 'up',
      icon: UserX,
      color: 'red'
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      message: 'High memory usage detected on DB-Cluster-03',
      timestamp: '2025-01-15 14:30',
      status: 'unread',
      region: 'Global'
    },
    {
      id: 2,
      type: 'info',
      message: 'Scheduled maintenance completed successfully',
      timestamp: '2025-01-15 10:00',
      status: 'resolved',
      region: 'Global'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Security Center</h1>
          <p className="text-gray-600">Monitor security threats and manage security policies</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {securityMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                    <div className="flex items-center mt-2">
                      {metric.trend === 'up' ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-green-500 mr-1" />
                      )}
                      <span className="text-sm text-green-600">{metric.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-${metric.color}-100`}>
                    <Icon className={`h-6 w-6 text-${metric.color}-600`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Alerts</h3>
          <div className="space-y-4">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900">{alert.message}</h4>
                <p className="text-gray-600">{alert.timestamp}</p>
                <p className="text-gray-600">Status: {alert.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityCenter;