import React, { useState } from 'react';
import { Activity, Server, Database, Zap, AlertTriangle, CheckCircle, Clock, RefreshCw, Download, Calendar, ArrowUpRight, ArrowDownRight, BarChart3, PieChart, Settings, HardDrive, Cpu, MemoryStick as Memory, Wifi, Globe, Shield, XCircle } from 'lucide-react';

const SystemHealth: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('day');

  const systemMetrics = [
    {
      title: 'API Response Time',
      value: '45ms',
      change: '-5ms',
      trend: 'down',
      status: 'excellent',
      icon: Zap,
      color: 'green'
    },
    {
      title: 'Database Performance',
      value: '12ms',
      change: '-2ms',
      trend: 'down',
      status: 'excellent',
      icon: Database,
      color: 'blue'
    },
    {
      title: 'Error Rate',
      value: '0.02%',
      change: '-0.01%',
      trend: 'down',
      status: 'excellent',
      icon: AlertTriangle,
      color: 'green'
    },
    {
      title: 'System Uptime',
      value: '99.97%',
      change: '+0.02%',
      trend: 'up',
      status: 'excellent',
      icon: Server,
      color: 'purple'
    }
  ];

  const systemServices = [
    {
      id: 1,
      name: 'Authentication Service',
      status: 'healthy',
      uptime: '99.98%',
      responseTime: '45ms',
      lastIncident: '2024-12-15',
      host: 'auth-service-prod',
      region: 'West Africa',
      version: 'v2.3.1'
    },
    {
      id: 2,
      name: 'Payment Gateway',
      status: 'healthy',
      uptime: '99.95%',
      responseTime: '120ms',
      lastIncident: '2024-12-20',
      host: 'payment-gateway-prod',
      region: 'West Africa',
      version: 'v1.8.5'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">System Health</h1>
          <p className="text-gray-600">Monitor system performance and health</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {systemMetrics.map((metric, index) => {
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Services</h3>
          <div className="space-y-4">
            {systemServices.map((service) => (
              <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900">{service.name}</h4>
                <p className="text-gray-600">Status: {service.status}</p>
                <p className="text-gray-600">Uptime: {service.uptime}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;