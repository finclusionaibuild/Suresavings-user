import React, { useState } from 'react';
import {
  Database,
  Server,
  HardDrive,
  RefreshCw,
  Download,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Activity,
  Lock,
  FileText,
  XCircle,
  Zap
} from 'lucide-react';

const DatabaseManagement: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('day');

  const databaseMetrics = [
    {
      title: 'Query Response Time',
      value: '12ms',
      change: '-2ms',
      trend: 'down',
      icon: Zap,
      color: 'green'
    },
    {
      title: 'Database Size',
      value: '1.2TB',
      change: '+50GB',
      trend: 'up',
      icon: HardDrive,
      color: 'blue'
    },
    {
      title: 'Active Connections',
      value: '1,247',
      change: '+125',
      trend: 'up',
      icon: Activity,
      color: 'purple'
    },
    {
      title: 'Backup Status',
      value: 'Healthy',
      change: 'Latest: 2h ago',
      trend: 'stable',
      icon: CheckCircle,
      color: 'green'
    }
  ];

  const databases = [
    {
      id: 1,
      name: 'Main Production DB',
      type: 'PostgreSQL',
      version: '14.5',
      size: '850GB',
      status: 'healthy',
      host: 'db-prod-main-01',
      region: 'West Africa',
      connections: 850,
      uptime: '99.99%',
      lastBackup: '2025-01-15T12:30:00Z'
    },
    {
      id: 2,
      name: 'Reporting DB',
      type: 'PostgreSQL',
      version: '14.5',
      size: '350GB',
      status: 'healthy',
      host: 'db-prod-reporting-01',
      region: 'West Africa',
      connections: 125,
      uptime: '99.98%',
      lastBackup: '2025-01-15T12:00:00Z'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Database Management</h1>
          <p className="text-gray-600">Monitor database performance and manage backups</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {databaseMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                    <div className="flex items-center mt-2">
                      <ArrowDownRight className="h-4 w-4 text-green-500 mr-1" />
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Database Instances</h3>
          <div className="space-y-4">
            {databases.map((db) => (
              <div key={db.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900">{db.name}</h4>
                <p className="text-gray-600">{db.type} {db.version}</p>
                <p className="text-gray-600">Size: {db.size} | Status: {db.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseManagement;