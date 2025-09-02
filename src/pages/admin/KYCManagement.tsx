import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  FileText,
  Camera,
  CreditCard,
  Home,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Shield,
  Flag,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Upload,
  Paperclip,
  Edit,
  RefreshCw
} from 'lucide-react';

const KYCManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedKYC, setSelectedKYC] = useState<any>(null);
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [reviewComment, setReviewComment] = useState('');
  const [bulkAction, setBulkAction] = useState('');
  const [selectedApplications, setSelectedApplications] = useState<number[]>([]);

  const kycApplications = [
    {
      id: 1,
      userId: 'USR001',
      userName: 'John Doe',
      userEmail: 'john.doe@example.com',
      userPhone: '+234 801 234 5678',
      currentTier: 1,
      requestedTier: 2,
      status: 'pending',
      submittedDate: '2025-01-15T10:30:00Z',
      reviewedDate: null,
      reviewedBy: null,
      priority: 'medium',
      documents: [
        { 
          type: 'bvn', 
          status: 'submitted', 
          url: '/docs/bvn_001.pdf', 
          uploadDate: '2025-01-15T10:30:00Z',
          verificationScore: 95,
          extractedData: { bvn: '12345678901', name: 'John Doe', dob: '1990-05-15' }
        },
        { 
          type: 'government_id', 
          status: 'submitted', 
          url: '/docs/id_001.jpg', 
          uploadDate: '2025-01-15T10:32:00Z',
          verificationScore: 92,
          extractedData: { idNumber: 'A12345678', name: 'John Doe', dob: '1990-05-15' }
        },
        { 
          type: 'selfie', 
          status: 'submitted', 
          url: '/docs/selfie_001.jpg', 
          uploadDate: '2025-01-15T10:35:00Z',
          verificationScore: 88,
          faceMatch: 94
        }
      ],
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-05-15',
        phone: '+234 801 234 5678',
        address: '123 Victoria Island, Lagos',
        occupation: 'Software Developer',
        bvn: '12345678901',
        nin: '12345678901234'
      },
      riskFlags: [],
      complianceScore: 92,
      idCertifyResponse: {
        status: 'verified',
        confidence: 94,
        timestamp: '2025-01-15T10:36:00Z'
      }
    },
    {
      id: 2,
      userId: 'USR002',
      userName: 'Sarah Johnson',
      userEmail: 'sarah.johnson@example.com',
      userPhone: '+234 802 345 6789',
      currentTier: 2,
      requestedTier: 3,
      status: 'under_review',
      submittedDate: '2025-01-14T14:20:00Z',
      reviewedDate: null,
      reviewedBy: 'admin@suresavings.com',
      priority: 'high',
      documents: [
        { 
          type: 'utility_bill', 
          status: 'submitted', 
          url: '/docs/utility_002.pdf', 
          uploadDate: '2025-01-14T14:20:00Z',
          verificationScore: 89,
          extractedData: { 
            address: '456 Ikoyi, Lagos', 
            accountHolder: 'Sarah Johnson',
            billDate: '2024-12-15'
          }
        },
        { 
          type: 'income_proof', 
          status: 'submitted', 
          url: '/docs/income_002.pdf', 
          uploadDate: '2025-01-14T14:25:00Z',
          verificationScore: 91,
          extractedData: {
            employer: 'Tech Solutions Ltd',
            salary: 450000,
            employmentDate: '2022-03-01'
          }
        },
        { 
          type: 'bank_statement', 
          status: 'submitted', 
          url: '/docs/statement_002.pdf', 
          uploadDate: '2025-01-14T14:30:00Z',
          verificationScore: 93,
          extractedData: {
            accountNumber: '0123456789',
            bankName: 'GTBank',
            avgBalance: 850000
          }
        }
      ],
      personalInfo: {
        firstName: 'Sarah',
        lastName: 'Johnson',
        dateOfBirth: '1985-08-22',
        phone: '+234 802 345 6789',
        address: '456 Ikoyi, Lagos',
        occupation: 'Business Owner',
        bvn: '23456789012',
        nin: '23456789012345'
      },
      riskFlags: ['high_transaction_volume'],
      complianceScore: 91,
      idCertifyResponse: {
        status: 'pending_review',
        confidence: 91,
        timestamp: '2025-01-14T14:31:00Z'
      }
    },
    {
      id: 3,
      userId: 'USR003',
      userName: 'Michael Chen',
      userEmail: 'michael.chen@example.com',
      userPhone: '+234 803 456 7890',
      currentTier: 0,
      requestedTier: 1,
      status: 'rejected',
      submittedDate: '2025-01-13T09:15:00Z',
      reviewedDate: '2025-01-14T16:45:00Z',
      reviewedBy: 'admin@suresavings.com',
      priority: 'low',
      documents: [
        { 
          type: 'government_id', 
          status: 'rejected', 
          url: '/docs/id_003.jpg', 
          uploadDate: '2025-01-13T09:15:00Z', 
          rejectReason: 'Document unclear - text not readable',
          verificationScore: 45
        },
        { 
          type: 'selfie', 
          status: 'rejected', 
          url: '/docs/selfie_003.jpg', 
          uploadDate: '2025-01-13T09:18:00Z', 
          rejectReason: 'Face not clearly visible - poor lighting',
          verificationScore: 32,
          faceMatch: 23
        }
      ],
      personalInfo: {
        firstName: 'Michael',
        lastName: 'Chen',
        dateOfBirth: '1992-03-10',
        phone: '+234 803 456 7890',
        address: '789 Surulere, Lagos',
        occupation: 'Student',
        bvn: '34567890123',
        nin: '34567890123456'
      },
      riskFlags: ['multiple_failed_attempts', 'document_quality_issues'],
      complianceScore: 38,
      idCertifyResponse: {
        status: 'failed',
        confidence: 38,
        timestamp: '2025-01-13T09:19:00Z',
        failureReasons: ['poor_document_quality', 'face_match_failed']
      }
    },
    {
      id: 4,
      userId: 'USR004',
      userName: 'Amina Bello',
      userEmail: 'amina.bello@example.com',
      userPhone: '+234 804 567 8901',
      currentTier: 2,
      requestedTier: 3,
      status: 'approved',
      submittedDate: '2025-01-12T11:30:00Z',
      reviewedDate: '2025-01-13T10:15:00Z',
      reviewedBy: 'admin@suresavings.com',
      priority: 'high',
      documents: [
        { 
          type: 'utility_bill', 
          status: 'approved', 
          url: '/docs/utility_004.pdf', 
          uploadDate: '2025-01-12T11:30:00Z',
          verificationScore: 96,
          extractedData: {
            address: '321 Wuse, Abuja',
            accountHolder: 'Amina Bello',
            billDate: '2024-12-20'
          }
        },
        { 
          type: 'income_proof', 
          status: 'approved', 
          url: '/docs/income_004.pdf', 
          uploadDate: '2025-01-12T11:35:00Z',
          verificationScore: 98,
          extractedData: {
            employer: 'Federal Medical Centre',
            salary: 750000,
            employmentDate: '2018-06-01'
          }
        },
        { 
          type: 'bank_statement', 
          status: 'approved', 
          url: '/docs/statement_004.pdf', 
          uploadDate: '2025-01-12T11:40:00Z',
          verificationScore: 97,
          extractedData: {
            accountNumber: '9876543210',
            bankName: 'Access Bank',
            avgBalance: 1250000
          }
        }
      ],
      personalInfo: {
        firstName: 'Amina',
        lastName: 'Bello',
        dateOfBirth: '1988-11-05',
        phone: '+234 804 567 8901',
        address: '321 Wuse, Abuja',
        occupation: 'Doctor',
        bvn: '45678901234',
        nin: '45678901234567'
      },
      riskFlags: [],
      complianceScore: 97,
      idCertifyResponse: {
        status: 'verified',
        confidence: 97,
        timestamp: '2025-01-12T11:41:00Z'
      }
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Applications' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'under_review', label: 'Under Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'tier_1', label: 'Tier 1 Requests' },
    { value: 'tier_2', label: 'Tier 2 Requests' },
    { value: 'tier_3', label: 'Tier 3 Requests' },
    { value: 'high_priority', label: 'High Priority' },
    { value: 'flagged', label: 'Risk Flagged' }
  ];

  const bulkActions = [
    { value: '', label: 'Bulk Actions' },
    { value: 'approve', label: 'Approve Selected' },
    { value: 'reject', label: 'Reject Selected' },
    { value: 'assign_reviewer', label: 'Assign Reviewer' },
    { value: 'export', label: 'Export Selected' }
  ];

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-NG', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-NG', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'under_review':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'government_id':
      case 'bvn':
      case 'nin':
        return CreditCard;
      case 'utility_bill':
        return Home;
      case 'income_proof':
      case 'bank_statement':
        return FileText;
      case 'selfie':
        return Camera;
      default:
        return Paperclip;
    }
  };

  const getComplianceScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredApplications = kycApplications.filter(application => {
    const matchesSearch = application.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.userId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         application.status === selectedFilter ||
                         (selectedFilter === 'tier_1' && application.requestedTier === 1) ||
                         (selectedFilter === 'tier_2' && application.requestedTier === 2) ||
                         (selectedFilter === 'tier_3' && application.requestedTier === 3) ||
                         (selectedFilter === 'high_priority' && application.priority === 'high') ||
                         (selectedFilter === 'flagged' && application.riskFlags.length > 0);
    
    return matchesSearch && matchesFilter;
  });

  const handleKYCAction = (action: string, applicationId: number) => {
    console.log(`${action} KYC application:`, applicationId);
    if (action === 'approve' || action === 'reject') {
      // Update application status
      setShowKYCModal(false);
      setReviewComment('');
    }
  };

  const handleBulkAction = () => {
    if (bulkAction && selectedApplications.length > 0) {
      console.log(`Bulk ${bulkAction}:`, selectedApplications);
      setBulkAction('');
      setSelectedApplications([]);
    }
  };

  const toggleSelectApplication = (id: number) => {
    setSelectedApplications(prev => 
      prev.includes(id) 
        ? prev.filter(appId => appId !== id)
        : [...prev, id]
    );
  };

  const selectAllApplications = () => {
    if (selectedApplications.length === filteredApplications.length) {
      setSelectedApplications([]);
    } else {
      setSelectedApplications(filteredApplications.map(app => app.id));
    }
  };

  // Calculate stats
  const totalApplications = kycApplications.length;
  const pendingApplications = kycApplications.filter(app => app.status === 'pending' || app.status === 'under_review').length;
  const approvedApplications = kycApplications.filter(app => app.status === 'approved').length;
  const rejectedApplications = kycApplications.filter(app => app.status === 'rejected').length;
  const avgProcessingTime = '2.5 hours';
  const complianceRate = Math.round((approvedApplications / totalApplications) * 100);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <img 
                src="/image.png" 
                alt="KYC Management Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">KYC Management</h1>
              <p className="text-gray-600">Review and manage customer identity verification processes</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{totalApplications}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingApplications}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{approvedApplications}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-3 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{rejectedApplications}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <RefreshCw className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Processing</p>
                <p className="text-2xl font-bold text-purple-600">{avgProcessingTime}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Compliance Rate</p>
                <p className="text-2xl font-bold text-indigo-600">{complianceRate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search KYC applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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

              {selectedApplications.length > 0 && (
                <div className="flex items-center space-x-2">
                  <select
                    value={bulkAction}
                    onChange={(e) => setBulkAction(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {bulkActions.map(action => (
                      <option key={action.value} value={action.value}>{action.label}</option>
                    ))}
                  </select>
                  <button
                    onClick={handleBulkAction}
                    disabled={!bulkAction}
                    className="px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium disabled:opacity-50 transition-colors"
                  >
                    Apply ({selectedApplications.length})
                  </button>
                </div>
              )}

              <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* KYC Applications Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img src="/image.png" alt="KYC Applications Mascot" className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-900">
                  KYC Applications ({filteredApplications.length})
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedApplications.length === filteredApplications.length && filteredApplications.length > 0}
                  onChange={selectAllApplications}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-500">Select All</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Select</span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tier Request
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documents
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Compliance Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((application) => {
                  const { date, time } = formatDateTime(application.submittedDate);
                  
                  return (
                    <tr key={application.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedApplications.includes(application.id)}
                          onChange={() => toggleSelectApplication(application.id)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary-100 p-2 rounded-lg">
                            <User className="h-5 w-5 text-primary-600" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <div className="text-sm font-medium text-gray-900">{application.userName}</div>
                              {application.riskFlags.length > 0 && (
                                <Flag className="h-4 w-4 text-red-500" />
                              )}
                            </div>
                            <div className="text-sm text-gray-500">{application.userEmail}</div>
                            <div className="text-xs text-gray-400">ID: {application.userId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          Tier {application.currentTier} → Tier {application.requestedTier}
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(application.priority)}`}>
                          {application.priority} priority
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          {application.documents.map((doc, index) => {
                            const IconComponent = getDocumentIcon(doc.type);
                            return (
                              <div key={index} className={`p-1 rounded ${
                                doc.status === 'approved' ? 'bg-green-100 text-green-600' :
                                doc.status === 'rejected' ? 'bg-red-100 text-red-600' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                <IconComponent className="h-4 w-4" />
                              </div>
                            );
                          })}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {application.documents.length} documents
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className="w-12 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                application.complianceScore >= 90 ? 'bg-green-500' :
                                application.complianceScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${application.complianceScore}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-medium ${getComplianceScoreColor(application.complianceScore)}`}>
                            {application.complianceScore}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(application.status)}`}>
                          {application.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{date}</div>
                        <div className="text-sm text-gray-500">{time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedKYC(application);
                              setShowKYCModal(true);
                            }}
                            className="text-primary-600 hover:text-primary-900 transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {application.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleKYCAction('approve', application.id)}
                                className="text-green-600 hover:text-green-900 transition-colors"
                              >
                                <ThumbsUp className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleKYCAction('reject', application.id)}
                                className="text-red-600 hover:text-red-900 transition-colors"
                              >
                                <ThumbsDown className="h-4 w-4" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleKYCAction('message', application.id)}
                            className="text-blue-600 hover:text-blue-900 transition-colors"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredApplications.length === 0 && (
            <div className="p-12 text-center">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <img src="/image.png" alt="No Applications" className="w-8 h-8 opacity-50" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No KYC applications found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* KYC Detail Modal */}
        {showKYCModal && selectedKYC && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="KYC Detail Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">KYC Application Review</h3>
                </div>
                <button
                  onClick={() => setShowKYCModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* User Information */}
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">User Information</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{selectedKYC.personalInfo.firstName} {selectedKYC.personalInfo.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{selectedKYC.userEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{selectedKYC.personalInfo.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date of Birth:</span>
                        <span className="font-medium">{selectedKYC.personalInfo.dateOfBirth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Occupation:</span>
                        <span className="font-medium">{selectedKYC.personalInfo.occupation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">BVN:</span>
                        <span className="font-medium">{selectedKYC.personalInfo.bvn}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">KYC Request</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Tier:</span>
                        <span className="font-medium">Tier {selectedKYC.currentTier}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Requested Tier:</span>
                        <span className="font-medium">Tier {selectedKYC.requestedTier}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Priority:</span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedKYC.priority)}`}>
                          {selectedKYC.priority}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedKYC.status)}`}>
                          {selectedKYC.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Compliance Score:</span>
                        <span className={`font-medium ${getComplianceScoreColor(selectedKYC.complianceScore)}`}>
                          {selectedKYC.complianceScore}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedKYC.riskFlags.length > 0 && (
                    <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                      <h4 className="text-lg font-semibold text-red-900 mb-4 flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5" />
                        <span>Risk Flags</span>
                      </h4>
                      <div className="space-y-2">
                        {selectedKYC.riskFlags.map((flag: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Flag className="h-4 w-4 text-red-500" />
                            <span className="text-red-700 capitalize">{flag.replace('_', ' ')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedKYC.idCertifyResponse && (
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <h4 className="text-lg font-semibold text-blue-900 mb-4 flex items-center space-x-2">
                        <Shield className="h-5 w-5" />
                        <span>ID Certify Response</span>
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-blue-700">Status:</span>
                          <span className="font-medium text-blue-900">{selectedKYC.idCertifyResponse.status}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">Confidence:</span>
                          <span className="font-medium text-blue-900">{selectedKYC.idCertifyResponse.confidence}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">Verified:</span>
                          <span className="font-medium text-blue-900">{formatDateTime(selectedKYC.idCertifyResponse.timestamp).date}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Documents and Review */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Submitted Documents</h4>
                    <div className="space-y-4">
                      {selectedKYC.documents.map((doc: any, index: number) => {
                        const IconComponent = getDocumentIcon(doc.type);
                        return (
                          <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                            <div className="flex items-center space-x-4">
                              <div className={`p-3 rounded-lg ${
                                doc.status === 'approved' ? 'bg-green-100 text-green-600' :
                                doc.status === 'rejected' ? 'bg-red-100 text-red-600' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                <IconComponent className="h-6 w-6" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 capitalize">
                                  {doc.type.replace('_', ' ')}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Uploaded: {formatDateTime(doc.uploadDate).date}
                                </div>
                                {doc.verificationScore && (
                                  <div className="text-sm text-gray-600">
                                    Verification Score: {doc.verificationScore}%
                                  </div>
                                )}
                                {doc.faceMatch && (
                                  <div className="text-sm text-gray-600">
                                    Face Match: {doc.faceMatch}%
                                  </div>
                                )}
                                {doc.extractedData && (
                                  <div className="text-xs text-gray-500 mt-2">
                                    <strong>Extracted Data:</strong>
                                    <pre className="mt-1 text-xs bg-gray-100 p-2 rounded">
                                      {JSON.stringify(doc.extractedData, null, 2)}
                                    </pre>
                                  </div>
                                )}
                                {doc.rejectReason && (
                                  <div className="text-sm text-red-600 mt-1">
                                    Reason: {doc.rejectReason}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(doc.status)}`}>
                                {doc.status}
                              </span>
                              <button className="text-primary-600 hover:text-primary-900 transition-colors">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                                <Download className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {selectedKYC.status === 'pending' && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Review Comments</h4>
                      <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Add review comments (optional)..."
                      />
                    </div>
                  )}

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Audit Trail</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg mt-1">
                          <Upload className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Application submitted</p>
                          <p className="text-sm text-gray-600">
                            {selectedKYC.userName} • {formatDateTime(selectedKYC.submittedDate).date} at {formatDateTime(selectedKYC.submittedDate).time}
                          </p>
                        </div>
                      </div>
                      
                      {selectedKYC.reviewedDate && (
                        <div className="flex items-start space-x-3">
                          <div className="bg-green-100 p-2 rounded-lg mt-1">
                            <Eye className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Review completed</p>
                            <p className="text-sm text-gray-600">
                              {selectedKYC.reviewedBy} • {formatDateTime(selectedKYC.reviewedDate).date} at {formatDateTime(selectedKYC.reviewedDate).time}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {selectedKYC.status === 'pending' && (
                <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => handleKYCAction('approve', selectedKYC.id)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span>Approve KYC</span>
                  </button>
                  <button
                    onClick={() => handleKYCAction('reject', selectedKYC.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <XCircle className="h-5 w-5" />
                    <span>Reject KYC</span>
                  </button>
                  <button
                    onClick={() => handleKYCAction('request_more', selectedKYC.id)}
                    className="px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg font-medium transition-colors"
                  >
                    Request More Info
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KYCManagement;