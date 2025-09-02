import React, { useState } from 'react';
import {
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Upload,
  Search,
  Filter,
  Eye,
  Edit,
  Calendar,
  Users,
  Building,
  Gavel,
  BookOpen,
  Flag,
  TrendingUp,
  XCircle
} from 'lucide-react';
import BarChart from '../../components/charts/BarChart';
import DoughnutChart from '../../components/charts/DoughnutChart';
import { generateComplianceData } from '../../utils/chartData';

const Compliance: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const complianceMetrics = [
    {
      title: 'Compliance Score',
      value: '98.5%',
      change: '+2.1%',
      status: 'excellent',
      icon: Shield
    },
    {
      title: 'Active Audits',
      value: '3',
      change: '-1',
      status: 'normal',
      icon: FileText
    },
    {
      title: 'Pending Reviews',
      value: '12',
      change: '+4',
      status: 'attention',
      icon: Clock
    },
    {
      title: 'Violations',
      value: '0',
      change: '0',
      status: 'excellent',
      icon: CheckCircle
    }
  ];

  const regulatoryRequirements = [
    {
      id: 1,
      regulation: 'CBN Guidelines on Electronic Banking',
      status: 'compliant',
      lastReview: '2025-01-10',
      nextReview: '2025-04-10',
      responsible: 'Compliance Team',
      priority: 'high'
    },
    {
      id: 2,
      regulation: 'NDIC Deposit Insurance Requirements',
      status: 'compliant',
      lastReview: '2025-01-05',
      nextReview: '2025-07-05',
      responsible: 'Risk Management',
      priority: 'high'
    },
    {
      id: 3,
      regulation: 'Data Protection Regulation (NDPR)',
      status: 'under_review',
      lastReview: '2024-12-15',
      nextReview: '2025-03-15',
      responsible: 'IT Security',
      priority: 'medium'
    },
    {
      id: 4,
      regulation: 'Anti-Money Laundering (AML) Guidelines',
      status: 'compliant',
      lastReview: '2025-01-08',
      nextReview: '2025-04-08',
      responsible: 'AML Team',
      priority: 'high'
    },
    {
      id: 5,
      regulation: 'Know Your Customer (KYC) Requirements',
      status: 'action_required',
      lastReview: '2024-12-20',
      nextReview: '2025-02-20',
      responsible: 'KYC Team',
      priority: 'urgent'
    }
  ];

  const auditTrail = [
    {
      id: 1,
      action: 'Compliance Review Completed',
      user: 'Sarah Compliance',
      timestamp: '2025-01-15T14:30:00Z',
      details: 'CBN Guidelines review completed with no issues found',
      category: 'review'
    },
    {
      id: 2,
      action: 'Policy Updated',
      user: 'John Manager',
      timestamp: '2025-01-15T10:15:00Z',
      details: 'Updated AML policy to include new transaction monitoring rules',
      category: 'policy'
    },
    {
      id: 3,
      action: 'Audit Initiated',
      user: 'External Auditor',
      timestamp: '2025-01-14T16:20:00Z',
      details: 'Started quarterly compliance audit for Q4 2024',
      category: 'audit'
    },
    {
      id: 4,
      action: 'Violation Reported',
      user: 'System Alert',
      timestamp: '2025-01-14T09:45:00Z',
      details: 'Potential AML violation detected and flagged for review',
      category: 'violation'
    }
  ];

  const complianceDocuments = [
    {
      id: 1,
      title: 'CBN Compliance Certificate',
      type: 'Certificate',
      uploadDate: '2024-12-01',
      expiryDate: '2025-12-01',
      status: 'valid',
      size: '2.4 MB'
    },
    {
      id: 2,
      title: 'NDIC Insurance Policy',
      type: 'Policy',
      uploadDate: '2024-11-15',
      expiryDate: '2025-11-15',
      status: 'valid',
      size: '1.8 MB'
    },
    {
      id: 3,
      title: 'Data Protection Impact Assessment',
      type: 'Assessment',
      uploadDate: '2024-10-20',
      expiryDate: '2025-10-20',
      status: 'expiring_soon',
      size: '3.2 MB'
    },
    {
      id: 4,
      title: 'AML Risk Assessment Report',
      type: 'Report',
      uploadDate: '2025-01-10',
      expiryDate: '2025-07-10',
      status: 'valid',
      size: '4.1 MB'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'valid':
      case 'excellent':
        return 'bg-green-100 text-green-700';
      case 'under_review':
      case 'expiring_soon':
      case 'attention':
        return 'bg-yellow-100 text-yellow-700';
      case 'action_required':
      case 'violation':
      case 'expired':
        return 'bg-red-100 text-red-700';
      case 'normal':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-700';
      case 'high':
        return 'bg-orange-100 text-orange-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'requirements', label: 'Requirements', icon: FileText },
    { id: 'documents', label: 'Documents', icon: BookOpen },
    { id: 'audit', label: 'Audit Trail', icon: Flag }
  ];

  // Generate compliance chart data
  const complianceData = generateComplianceData();

  // Compliance score chart data
  const complianceScoreChartData = {
    labels: complianceData.labels,
    datasets: [
      {
        label: 'Compliance Score',
        data: complianceData.scores,
        backgroundColor: complianceData.scores.map(score => {
          if (score >= 90) return 'rgba(16, 185, 129, 0.7)';
          if (score >= 80) return 'rgba(59, 130, 246, 0.7)';
          if (score >= 70) return 'rgba(245, 158, 11, 0.7)';
          return 'rgba(239, 68, 68, 0.7)';
        }),
        borderWidth: 0,
      },
    ],
  };

  // Compliance status distribution chart data
  const complianceStatusChartData = {
    labels: ['Compliant', 'Under Review', 'Action Required'],
    datasets: [
      {
        data: [
          complianceData.statuses.filter(status => status === 'compliant').length,
          complianceData.statuses.filter(status => status === 'under_review').length,
          complianceData.statuses.filter(status => status === 'action_required').length,
        ],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
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
                alt="Compliance Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Compliance</h1>
              <p className="text-gray-600">Ensure regulatory compliance, manage audit trails, and handle compliance reporting</p>
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
                    onClick={() => setSelectedTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      selectedTab === tab.id
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

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="space-y-8">
            {/* Compliance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {complianceMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{metric.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                        <p className={`text-sm mt-1 ${
                          metric.change.startsWith('+') ? 'text-green-600' : 
                          metric.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {metric.change !== '0' && (metric.change.startsWith('+') || metric.change.startsWith('-')) ? metric.change : 'No change'}
                        </p>
                      </div>
                      <div className={`p-3 rounded-lg ${getStatusColor(metric.status)}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Compliance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Compliance Score Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <img src="/image.png" alt="Compliance Score Mascot" className="w-5 h-5" />
                  <h3 className="text-lg font-semibold text-gray-900">Compliance Score by Category</h3>
                </div>
                <BarChart data={complianceScoreChartData} height={280} />
              </div>

              {/* Compliance Status Distribution */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <img src="/image.png" alt="Status Distribution Mascot" className="w-5 h-5" />
                  <h3 className="text-lg font-semibold text-gray-900">Compliance Status Distribution</h3>
                </div>
                <DoughnutChart data={complianceStatusChartData} height={280} />
              </div>
            </div>

            {/* Compliance Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Regulatory Status */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <img src="/image.png" alt="Regulatory Status Mascot" className="w-5 h-5" />
                  <h3 className="text-lg font-semibold text-gray-900">Regulatory Status</h3>
                </div>
                <div className="space-y-4">
                  {regulatoryRequirements.slice(0, 3).map((req) => (
                    <div key={req.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{req.regulation}</h4>
                        <p className="text-sm text-gray-600">Next review: {formatDate(req.nextReview)}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(req.status)}`}>
                        {req.status.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <img src="/image.png" alt="Activity Mascot" className="w-5 h-5" />
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                </div>
                <div className="space-y-4">
                  {auditTrail.slice(0, 4).map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="bg-primary-100 p-2 rounded-lg">
                        <Flag className="h-4 w-4 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-600">{activity.user} • {formatDate(activity.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Requirements Tab */}
        {selectedTab === 'requirements' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <img src="/image.png" alt="Requirements Mascot" className="w-5 h-5" />
                  <h3 className="text-lg font-semibold text-gray-900">Regulatory Requirements</h3>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Export Report</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Regulation
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Next Review
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Responsible
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {regulatoryRequirements.map((req) => (
                      <tr key={req.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{req.regulation}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(req.status)}`}>
                            {req.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(req.priority)}`}>
                            {req.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(req.nextReview)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {req.responsible}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-primary-600 hover:text-primary-900 transition-colors">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900 transition-colors">
                              <Edit className="h-4 w-4" />
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

        {/* Documents Tab */}
        {selectedTab === 'documents' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <img src="/image.png" alt="Documents Mascot" className="w-5 h-5" />
                  <h3 className="text-lg font-semibold text-gray-900">Compliance Documents</h3>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
                  <Upload className="h-4 w-4" />
                  <span>Upload Document</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {complianceDocuments.map((doc) => (
                  <div key={doc.id} className="border border-gray-200 rounded-lg p-6 hover:border-primary-300 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <FileText className="h-8 w-8 text-primary-600" />
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(doc.status)}`}>
                        {doc.status.replace('_', ' ')}
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">{doc.title}</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Type: {doc.type}</p>
                      <p>Size: {doc.size}</p>
                      <p>Uploaded: {formatDate(doc.uploadDate)}</p>
                      <p>Expires: {formatDate(doc.expiryDate)}</p>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <button className="flex-1 text-primary-600 hover:text-primary-700 text-sm font-medium">
                        View
                      </button>
                      <button className="flex-1 text-gray-600 hover:text-gray-700 text-sm font-medium">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Audit Trail Tab */}
        {selectedTab === 'audit' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <img src="/image.png" alt="Audit Trail Mascot" className="w-5 h-5" />
                  <h3 className="text-lg font-semibold text-gray-900">Audit Trail</h3>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search activities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {auditTrail.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-primary-100 p-2 rounded-lg">
                      <Flag className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{activity.action}</h4>
                        <span className="text-sm text-gray-500">{formatDate(activity.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{activity.details}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>User: {activity.user}</span>
                        <span>Category: {activity.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compliance;