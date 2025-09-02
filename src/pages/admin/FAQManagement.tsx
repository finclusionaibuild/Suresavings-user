import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  ChevronUp,
  ChevronDown,
  CheckCircle,
  XCircle,
  Clock,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Tag,
  Globe,
  Users,
  BarChart3,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import BarChart from '../../components/charts/BarChart';
import LineChart from '../../components/charts/LineChart';

const FAQManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('faqs');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<any>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I create a SureSavings account?',
      answer: 'Creating a SureSavings account is simple! Click on "Get Started" on our homepage, fill in your basic information including your name, email, and phone number. You\'ll need to verify your email and phone number, then complete your KYC verification to start saving.',
      category: 'account',
      status: 'published',
      views: 15420,
      helpful: 1245,
      notHelpful: 85,
      lastModified: '2025-01-10',
      createdBy: 'Support Team',
      tags: ['registration', 'account creation', 'getting started'],
      priority: 'high',
      language: 'en'
    },
    {
      id: 2,
      question: 'What are the different savings plans available?',
      answer: 'We offer three main savings plans: Flex Save (10% p.a.) for flexible savings with anytime withdrawal, Fixed Save (up to 15% p.a.) for locked savings with higher returns, and Target Save (13% p.a.) for goal-oriented savings with automated contributions.',
      category: 'savings',
      status: 'published',
      views: 12850,
      helpful: 1089,
      notHelpful: 45,
      lastModified: '2025-01-08',
      createdBy: 'Product Team',
      tags: ['savings plans', 'interest rates', 'flex save', 'fixed save', 'target save'],
      priority: 'high',
      language: 'en'
    },
    {
      id: 3,
      question: 'How long do withdrawals take to process?',
      answer: 'Withdrawals are typically processed within 24 hours on business days. For Flex Save accounts, withdrawals are instant. Fixed Save accounts may have penalties for early withdrawal. You\'ll receive an email notification once your withdrawal is processed.',
      category: 'transactions',
      status: 'published',
      views: 9875,
      helpful: 856,
      notHelpful: 32,
      lastModified: '2025-01-05',
      createdBy: 'Support Team',
      tags: ['withdrawals', 'processing time', 'business days'],
      priority: 'medium',
      language: 'en'
    },
    {
      id: 4,
      question: 'How secure is my money with SureSavings?',
      answer: 'Your money is completely secure with us. We use bank-level 256-bit SSL encryption, are licensed by the CBN, and all funds are NDIC insured up to ₦500,000 per depositor. We also employ multi-factor authentication and advanced fraud detection systems.',
      category: 'security',
      status: 'published',
      views: 8420,
      helpful: 742,
      notHelpful: 18,
      lastModified: '2024-12-20',
      createdBy: 'Security Team',
      tags: ['security', 'encryption', 'NDIC', 'CBN', 'insurance'],
      priority: 'high',
      language: 'en'
    },
    {
      id: 5,
      question: 'What investment options are available?',
      answer: 'We offer three investment categories: Fixed Income (12-18% returns, low risk), Mutual Funds (15-25% returns, medium risk), and Stock Portfolio (20-35% returns, higher risk). All investments are professionally managed and you can start with as little as ₦50,000.',
      category: 'investments',
      status: 'draft',
      views: 0,
      helpful: 0,
      notHelpful: 0,
      lastModified: '2025-01-12',
      createdBy: 'Investment Team',
      tags: ['investments', 'returns', 'risk levels', 'minimum investment'],
      priority: 'medium',
      language: 'en'
    }
  ];

  const categories = [
    { id: 'account', name: 'Account & Profile', count: 12, color: 'blue' },
    { id: 'savings', name: 'Savings & Plans', count: 15, color: 'green' },
    { id: 'investments', name: 'Investments', count: 8, color: 'purple' },
    { id: 'transactions', name: 'Transactions', count: 10, color: 'orange' },
    { id: 'security', name: 'Security & Privacy', count: 7, color: 'red' },
    { id: 'technical', name: 'Technical Issues', count: 6, color: 'gray' }
  ];

  const [newFAQ, setNewFAQ] = useState({
    question: '',
    answer: '',
    category: 'account',
    tags: '',
    priority: 'medium',
    language: 'en'
  });

  const filterOptions = [
    { value: 'all', label: 'All FAQs' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
    { value: 'archived', label: 'Archived' },
    { value: 'account', label: 'Account' },
    { value: 'savings', label: 'Savings' },
    { value: 'investments', label: 'Investments' },
    { value: 'transactions', label: 'Transactions' },
    { value: 'security', label: 'Security' }
  ];

  const tabs = [
    { id: 'faqs', label: 'FAQ Management', icon: HelpCircle },
    { id: 'categories', label: 'Categories', icon: Tag },
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
      case 'published':
        return 'bg-green-100 text-green-700';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700';
      case 'archived':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
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

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
                         faq.status === selectedFilter ||
                         faq.category === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleCreateFAQ = () => {
    console.log('Creating FAQ:', newFAQ);
    setShowCreateModal(false);
    setNewFAQ({
      question: '',
      answer: '',
      category: 'account',
      tags: '',
      priority: 'medium',
      language: 'en'
    });
  };

  const handleFAQAction = (action: string, faqId: number) => {
    console.log(`${action} FAQ:`, faqId);
  };

  const handleFAQToggle = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  // Generate analytics data
  const faqViewsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'FAQ Views',
        data: [45000, 52000, 48000, 55000, 58000],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ],
  };

  const categoryPerformanceData = {
    labels: categories.map(cat => cat.name),
    datasets: [
      {
        label: 'Views',
        data: [15420, 12850, 9875, 8420, 7650, 5200],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(107, 114, 128, 0.7)'
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
                alt="FAQ Management Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">FAQ Management</h1>
              <p className="text-gray-600">Create, edit, and organize frequently asked questions for customer support</p>
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

        {/* FAQ Management Tab */}
        {activeTab === 'faqs' && (
          <div className="space-y-8">
            {/* FAQ Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <HelpCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total FAQs</p>
                    <p className="text-2xl font-bold text-gray-900">{faqs.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Published</p>
                    <p className="text-2xl font-bold text-green-600">
                      {faqs.filter(f => f.status === 'published').length}
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
                    <p className="text-sm text-gray-600">Total Views</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {faqs.reduce((sum, f) => sum + f.views, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <ThumbsUp className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Helpful Rate</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {(faqs.reduce((sum, f) => sum + (f.helpful / (f.helpful + f.notHelpful) * 100), 0) / faqs.length).toFixed(1)}%
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
                      placeholder="Search FAQs..."
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
                    <span>Create FAQ</span>
                  </button>

                  <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>

            {/* FAQs List */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <img src="/image.png" alt="FAQs List Mascot" className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Frequently Asked Questions ({filteredFAQs.length})
                </h3>
              </div>

              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg">
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <button
                              onClick={() => handleFAQToggle(faq.id.toString())}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              {expandedFAQ === faq.id.toString() ? (
                                <ChevronUp className="h-5 w-5" />
                              ) : (
                                <ChevronDown className="h-5 w-5" />
                              )}
                            </button>
                            <h4 className="font-medium text-gray-900">{faq.question}</h4>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500 ml-8">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(faq.status)}`}>
                              {faq.status}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(faq.priority)}`}>
                              {faq.priority}
                            </span>
                            <span>Category: {faq.category}</span>
                            <span>Views: {faq.views.toLocaleString()}</span>
                            <span>👍 {faq.helpful} 👎 {faq.notHelpful}</span>
                          </div>

                          {expandedFAQ === faq.id.toString() && (
                            <div className="mt-4 ml-8">
                              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                              </div>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                {faq.tags.map((tag, index) => (
                                  <span key={index} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              
                              <div className="text-xs text-gray-500">
                                Created by {faq.createdBy} • Last modified {formatDate(faq.lastModified)}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => handleFAQAction('edit', faq.id)}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleFAQAction('analytics', faq.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <BarChart3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleFAQAction('delete', faq.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredFAQs.length === 0 && (
                <div className="p-12 text-center">
                  <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <img src="/image.png" alt="No FAQs" className="w-8 h-8 opacity-50" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <img src="/image.png" alt="Categories Mascot" className="w-5 h-5" />
                  <h3 className="text-lg font-semibold text-gray-900">FAQ Categories</h3>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
                  <Plus className="h-4 w-4" />
                  <span>Add Category</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <div key={category.id} className="border border-gray-200 rounded-lg p-6 hover:border-primary-300 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-${category.color}-100`}>
                        <HelpCircle className={`h-6 w-6 text-${category.color}-600`} />
                      </div>
                      <span className="text-2xl font-bold text-gray-900">{category.count}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{category.name}</h4>
                    <p className="text-sm text-gray-600">{category.count} FAQs in this category</p>
                    <div className="flex space-x-2 mt-4">
                      <button className="flex-1 text-primary-600 hover:text-primary-700 text-sm font-medium">
                        View FAQs
                      </button>
                      <button className="flex-1 text-gray-600 hover:text-gray-700 text-sm font-medium">
                        Edit
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
              {/* FAQ Views Trend */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <img src="/image.png" alt="Views Chart Mascot" className="w-5 h-5" />
                  <h3 className="text-lg font-semibold text-gray-900">FAQ Views Trend</h3>
                </div>
                <LineChart data={faqViewsData} height={280} />
              </div>

              {/* Category Performance */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <img src="/image.png" alt="Category Chart Mascot" className="w-5 h-5" />
                  <h3 className="text-lg font-semibold text-gray-900">Category Performance</h3>
                </div>
                <BarChart data={categoryPerformanceData} height={280} />
              </div>
            </div>

            {/* Top Performing FAQs */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <img src="/image.png" alt="Top FAQs Mascot" className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-900">Top Performing FAQs</h3>
              </div>

              <div className="space-y-4">
                {faqs
                  .sort((a, b) => b.views - a.views)
                  .slice(0, 5)
                  .map((faq, index) => (
                    <div key={faq.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary-100 p-2 rounded-lg">
                          <span className="text-primary-600 font-bold">#{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{faq.question}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Views: {faq.views.toLocaleString()}</span>
                            <span>Helpful: {((faq.helpful / (faq.helpful + faq.notHelpful)) * 100).toFixed(1)}%</span>
                            <span className="capitalize">{faq.category}</span>
                          </div>
                        </div>
                      </div>
                      <button className="text-primary-600 hover:text-primary-700">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Create FAQ Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="Create FAQ Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">Create New FAQ</h3>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                  <input
                    type="text"
                    value={newFAQ.question}
                    onChange={(e) => setNewFAQ({...newFAQ, question: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter the question"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                  <textarea
                    value={newFAQ.answer}
                    onChange={(e) => setNewFAQ({...newFAQ, answer: e.target.value})}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Provide a detailed answer"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newFAQ.category}
                      onChange={(e) => setNewFAQ({...newFAQ, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={newFAQ.priority}
                      onChange={(e) => setNewFAQ({...newFAQ, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={newFAQ.tags}
                    onChange={(e) => setNewFAQ({...newFAQ, tags: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., account, registration, getting started"
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateFAQ}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Create FAQ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQManagement;