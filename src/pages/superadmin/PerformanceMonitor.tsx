import React, { useState } from 'react';
import { Activity, Zap, Server, Cpu, MemoryStick as Memory, HardDrive, Wifi, RefreshCw, Download, Calendar, ArrowUpRight, ArrowDownRight, BarChart3, PieChart, Settings, AlertTriangle, CheckCircle, Clock, Search, Filter, XCircle, Eye } from 'lucide-react';

const PerformanceMonitor: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('day');

  const performanceMetrics = [
    {
      title: 'API Response Time',
      value: '45ms',
      change: '-5ms',
      trend: 'down',
      icon: Zap,
      color: 'green'
    },
    {
      title: 'CPU Usage',
      value: '42%',
      change: '+3%',
      trend: 'up',
      icon: Cpu,
      color: 'blue'
    },
    {
      title: 'Memory Usage',
      value: '68%',
      change: '+5%',
      trend: 'up',
      icon: Memory,
      color: 'purple'
    },
    {
      title: 'Network Throughput',
      value: '1.2GB/s',
      change: '+0.2GB/s',
      trend: 'up',
      icon: Wifi,
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Performance Monitor</h1>
          <p className="text-gray-600">Track application performance and system metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceMetrics.map((metric, index) => {
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
      </div>
    </div>
  );
};

export default PerformanceMonitor;