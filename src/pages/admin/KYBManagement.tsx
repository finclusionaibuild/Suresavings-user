import React, { useState } from 'react';
import {
  Building,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  User,
  CreditCard,
  Home,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Flag,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Upload,
  Paperclip,
  Shield,
  BarChart3,
  Users,
  TrendingUp
} from 'lucide-react';

const KYBManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedKYB, setSelectedKYB] = useState<any>(null);
  const [showKYBModal, setShowKYBModal] = useState(false);
  const [reviewComment, setReviewComment] = useState('');
  const [selectedApplications, setSelectedApplications] = useState<number[]>([]);

  const kybApplications = [
    {
      id: 1,
      businessId: 'BUS001',
      businessName: 'TechCorp Solutions Ltd',
      businessEmail: 'admin@techcorp.com',
      businessPhone: '+234 801 234 5678',
      businessType: 'Technology',
      registrationNumber: 'RC123456',
      taxId: 'TIN987654321',
      currentTier: 1,
      requestedTier: 2,
      status: 'pending',
      submittedDate: '2025-01-15T10:30:00Z',
      reviewedDate: null,
      reviewedBy: null,
      priority: 'medium',
      documents: [
        {
          type: 'cac_certificate',
          status: 'submitted',
          url: '/docs/cac_001.pdf',
          uploadDate: '2025-01-15T10:30:00Z',
          verificationScore: 94,
          extractedData: {
            companyName: 'TechCorp Solutions Limited',
            registrationNumber: 'RC123456',
            incorporationDate: '2020-03-15',
            registeredAddress: '123 Business District, Lagos'
          }
        },
        {
          type: 'tax_certificate',
          status: 'submitted',
          url: '/docs/tax_001.pdf',
          uploadDate: '2025-01-15T10:32:00Z',
          verificationScore: 91,
          extractedData: {
            taxId: 'TIN987654321',
            companyName: 'TechCorp Solutions Ltd',
            taxStatus: 'Active'
          }
        },
        {
          type: 'bank_statement',
          status: 'submitted',
          url: '/docs/bank_001.pdf',
          uploadDate: '2025-01-15T10:35:00Z',
          verificationScore: 89,
          extractedData: {
            accountNumber: '0123456789',
            bankName: 'GTBank',
            accountName: 'TechCorp Solutions Ltd',
            avgBalance: 5500000
          }
        },
        {
          type: 'director_id',
          status: 'submitted',
          url: '/docs/director_001.jpg',
          uploadDate: '2025-01-15T10:37:00Z',
          verificationScore: 93,
          extractedData: {
            directorName: 'James Okafor',
            idNumber: 'A98765432',
            position: 'Managing Director'
          }
        }
      ],
      businessInfo: {
        companyName: 'TechCorp Solutions Limited',
        registrationNumber: 'RC123456',
        incorporationDate: '2020-03-15',
        businessAddress: '123 Business District, Lagos',
        businessType: 'Technology',
        numberOfEmployees: 25,
        annualRevenue: 150000000,
        website: 'https://techcorp.com',
        directors: [
          { name: 'James Okafor', position: 'Managing Director', shareholding: 60 },
          { name: 'Mary Adebayo', position: 'Executive Director', shareholding: 40 }
        ]
      },
      riskFlags: [],
      complianceScore: 92,
      idCertifyResponse: {
        status: 'pending_review',
        confidence: 92,
        timestamp: '2025-01-15T10:38:00Z'
      }
    },
    {
      id: 2,
      businessId: 'BUS002',
      businessName: 'Green Energy Ltd',
      businessEmail: 'info@greenenergy.com',
      businessPhone: '+234 802 345 6789',
      businessType: 'Energy',
      registrationNumber: 'RC234567',
      taxId: 'TIN876543210',
      currentTier: 2,
      requestedTier: 3,
      status: 'under_review',
      submittedDate: '2025-01-14T14:20:00Z',
      reviewedDate: null,
      reviewedBy: 'admin@suresavings.com',
      priority: 'high',
      documents: [
        {
          type: 'cac_certificate',
          status: 'approved',
          url: '/docs/cac_002.pdf',
          uploadDate: '2025-01-14T14:20:00Z',
          verificationScore: 97
        },
        {
          type: 'audited_financials',
          status: 'submitted',
          url: '/docs/audit_002.pdf',
          uploadDate: '2025-01-14T14:25:00Z',
          verificationScore: 88,
          extractedData: {
            auditFirm: 'KPMG Nigeria',
            auditYear: 2024,
            revenue: 2500000000,
            netProfit: 450000000
          }
        },
        {
          type: 'board_resolution',
          status: 'submitted',
          url: '/docs/resolution_002.pdf',
          uploadDate: '2025-01-14T14:30:00Z',
          verificationScore: 95
        }
      ],
      businessInfo: {
        companyName: 'Green Energy Limited',
        registrationNumber: 'RC234567',
        incorporationDate: '2018-08-20',
        businessAddress: '456 Energy Plaza, Abuja',
        businessType: 'Renewable Energy',
        numberOfEmployees: 150,
        annualRevenue: 2500000000,
        website: 'https://greenenergy.com',
        directors: [
          { name: 'Dr. Ahmed Musa', position: 'Chairman', shareholding: 45 },
          { name: 'Eng. Fatima Bello', position: 'CEO', shareholding: 35 },
          { name: 'Mr. Peter Okonkwo', position: 'CFO', shareholding: 20 }
        ]
      },
      riskFlags: ['high_value_business'],
      complianceScore: 93,
      idCertifyResponse: {
        status: 'verified',
        confidence: 93,
        timestamp: '2025-01-14T14:31:00Z'
      }
    },
    {
      id: 3,
      businessId: 'BUS003',
      businessName: 'Quick Mart Stores',
      businessEmail: 'admin@quickmart.ng',
      businessPhone: '+234 803 456 7890',
      businessType: 'Retail',
      registrationNumber: 'RC345678',
      taxId: 'TIN765432109',
      currentTier: 0,
      requestedTier: 1,
      status: 'rejected',
      submittedDate: '2025-01-13T09:15:00Z',
      reviewedDate: '2025-01-14T16:45:00Z',
      reviewedBy: 'admin@suresavings.com',
      priority: 'low',
      documents: [
        {
          type: 'cac_certificate',
          status: 'rejected',
          url: '/docs/cac_003.pdf',
          uploadDate: '2025-01-13T09:15:00Z',
          rejectReason: 'Document expired - certificate from 2019',
          verificationScore: 25
        },
        {
          type: 'tax_certificate',
          status: 'rejected',
          url: '/docs/tax_003.pdf',
          uploadDate: '2025-01-13T09:18:00Z',
          rejectReason: 'Tax clearance certificate expired',
          verificationScore: 30
        }
      ],
      businessInfo: {
        companyName: 'Quick Mart Stores Limited',
        registrationNumber: 'RC345678',
        incorporationDate: '2019-05-10',
        businessAddress: '789 Market Street, Kano',
        businessType: 'Retail',
        numberOfEmployees: 8,
        annualRevenue: 25000000,
        website: 'https://quickmart.ng'
      },
      riskFlags: ['expired_documents', 'low_compliance_score'],
      complianceScore: 27,
      idCertifyResponse: {
        status: 'failed',
        confidence: 27,
        timestamp: '2025-01-13T09:19:00Z',
        failureReasons: ['expired_documents', 'insufficient_documentation']
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
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
      case 'cac_certificate':
        return Building;
      case 'tax_certificate':
        return FileText;
      case 'bank_statement':
        return CreditCard;
      case 'audited_financials':
        return BarChart3;
      case 'board_resolution':
        return Users;
      case 'director_id':
        return User;
      default:
        return Paperclip;
    }
  };

  const getComplianceScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredApplications = kybApplications.filter(application => {
    const matchesSearch = application.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.businessEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.businessId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         application.status === selectedFilter ||
                         (selectedFilter === 'tier_1' && application.requestedTier === 1) ||
                         (selectedFilter === 'tier_2' && application.requestedTier === 2) ||
                         (selectedFilter === 'tier_3' && application.requestedTier === 3) ||
                         (selectedFilter === 'high_priority' && application.priority === 'high') ||
                         (selectedFilter === 'flagged' && application.riskFlags.length > 0);
    
    return matchesSearch && matchesFilter;
  });

  const handleKYBAction = (action: string, applicationId: number) => {
    console.log(`${action} KYB application:`, applicationId);
    if (action === 'approve' || action === 'reject') {
      setShowKYBModal(false);
      setReviewComment('');
    }
  };

  // Calculate stats
  const totalApplications = kybApplications.length;
  const pendingApplications = kybApplications.filter(app => app.status === 'pending' || app.status === 'under_review').length;
  const approvedApplications = kybApplications.filter(app => app.status === 'approved').length;
  const rejectedApplications = kybApplications.filter(app => app.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <img 
                src="/image.png" 
                alt="KYB Management Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">KYB Management</h1>
              <p className="text-gray-600">Review and manage business customer verification processes</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Building className="h-6 w-6 text-blue-600" />
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
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search KYB applications..."
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

              <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* KYB Applications Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <img src="/image.png" alt="KYB Applications Mascot" className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-gray-900">
                KYB Applications ({filteredApplications.length})
              </h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Building className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <div className="text-sm font-medium text-gray-900">{application.businessName}</div>
                              {application.riskFlags.length > 0 && (
                                <Flag className="h-4 w-4 text-red-500" />
                              )}
                            </div>
                            <div className="text-sm text-gray-500">{application.businessType}</div>
                            <div className="text-xs text-gray-400">ID: {application.businessId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{application.businessEmail}</div>
                        <div className="text-sm text-gray-500">{application.businessPhone}</div>
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
                              setSelectedKYB(application);
                              setShowKYBModal(true);
                            }}
                            className="text-primary-600 hover:text-primary-900 transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {application.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleKYBAction('approve', application.id)}
                                className="text-green-600 hover:text-green-900 transition-colors"
                              >
                                <ThumbsUp className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleKYBAction('reject', application.id)}
                                className="text-red-600 hover:text-red-900 transition-colors"
                              >
                                <ThumbsDown className="h-4 w-4" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleKYBAction('message', application.id)}
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">No KYB applications found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* KYB Detail Modal */}
        {showKYBModal && selectedKYB && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="KYB Detail Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">KYB Application Review</h3>
                </div>
                <button
                  onClick={() => setShowKYBModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Business Information */}
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Company Name:</span>
                        <span className="font-medium">{selectedKYB.businessInfo.companyName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Registration Number:</span>
                        <span className="font-medium">{selectedKYB.businessInfo.registrationNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Business Type:</span>
                        <span className="font-medium">{selectedKYB.businessInfo.businessType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Incorporation Date:</span>
                        <span className="font-medium">{selectedKYB.businessInfo.incorporationDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Employees:</span>
                        <span className="font-medium">{selectedKYB.businessInfo.numberOfEmployees}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Annual Revenue:</span>
                        <span className="font-medium">{formatCurrency(selectedKYB.businessInfo.annualRevenue)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Directors</h4>
                    <div className="space-y-3">
                      {selectedKYB.businessInfo.directors.map((director: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{director.name}</p>
                            <p className="text-sm text-gray-600">{director.position}</p>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{director.shareholding}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedKYB.riskFlags.length > 0 && (
                    <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                      <h4 className="text-lg font-semibold text-red-900 mb-4 flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5" />
                        <span>Risk Flags</span>
                      </h4>
                      <div className="space-y-2">
                        {selectedKYB.riskFlags.map((flag: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Flag className="h-4 w-4 text-red-500" />
                            <span className="text-red-700 capitalize">{flag.replace('_', ' ')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Documents */}
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Submitted Documents</h4>
                    <div className="space-y-4">
                      {selectedKYB.documents.map((doc: any, index: number) => {
                        const IconComponent = getDocumentIcon(doc.type);
                        return (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg ${
                                doc.status === 'approved' ? 'bg-green-100 text-green-600' :
                                doc.status === 'rejected' ? 'bg-red-100 text-red-600' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                <IconComponent className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900 capitalize">
                                  {doc.type.replace('_', ' ')}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {formatDateTime(doc.uploadDate).date}
                                </div>
                                {doc.verificationScore && (
                                  <div className="text-sm text-gray-600">
                                    Score: {doc.verificationScore}%
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
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {selectedKYB.status === 'pending' && (
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
                </div>
              </div>

              {selectedKYB.status === 'pending' && (
                <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => handleKYBAction('approve', selectedKYB.id)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span>Approve KYB</span>
                  </button>
                  <button
                    onClick={() => handleKYBAction('reject', selectedKYB.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <XCircle className="h-5 w-5" />
                    <span>Reject KYB</span>
                  </button>
                  <button
                    onClick={() => handleKYBAction('request_more', selectedKYB.id)}
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

export default KYBManagement;