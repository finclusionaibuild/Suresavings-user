import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Filter,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  Tag,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Download,
  RefreshCw,
  Star,
  Paperclip,
  TrendingUp
} from 'lucide-react';
import LineChart from '../../components/charts/LineChart';
import BarChart from '../../components/charts/BarChart';
import { generateTicketData } from '../../utils/chartData';

const SupportTickets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const tickets = [
    {
      id: 'TKT-001',
      subject: 'Unable to withdraw funds from Fixed Save account',
      customer: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+234 801 234 5678',
        tier: 'Premium'
      },
      priority: 'high',
      status: 'open',
      category: 'withdrawal',
      assignedTo: 'Sarah Support',
      createdDate: '2025-01-15T10:30:00Z',
      lastUpdate: '2025-01-15T14:20:00Z',
      responseTime: '2h 15m',
      description: 'Customer is unable to withdraw funds from their Fixed Save account. Error message appears when attempting withdrawal.',
      messages: [
        {
          id: 1,
          sender: 'John Doe',
          type: 'customer',
          message: 'I am trying to withdraw ₦50,000 from my Fixed Save account but getting an error message.',
          timestamp: '2025-01-15T10:30:00Z',
          attachments: ['screenshot.png']
        },
        {
          id: 2,
          sender: 'Sarah Support',
          type: 'agent',
          message: 'Thank you for contacting us. I can see your Fixed Save account has a lock period until March 2025. Early withdrawal will incur a 5% penalty. Would you like to proceed?',
          timestamp: '2025-01-15T11:45:00Z',
          attachments: []
        }
      ],
      tags: ['withdrawal', 'fixed-save', 'penalty']
    },
    {
      id: 'TKT-002',
      subject: 'KYC verification documents rejected',
      customer: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        phone: '+234 802 345 6789',
        tier: 'Basic'
      },
      priority: 'medium',
      status: 'in_progress',
      category: 'kyc',
      assignedTo: 'Mike Verification',
      createdDate: '2025-01-14T14:20:00Z',
      lastUpdate: '2025-01-15T09:30:00Z',
      responseTime: '4h 30m',
      description: 'Customer\'s KYC documents were rejected and they need guidance on resubmission.',
      messages: [
        {
          id: 1,
          sender: 'Sarah Johnson',
          type: 'customer',
          message: 'My KYC documents were rejected. Can you please tell me what was wrong?',
          timestamp: '2025-01-14T14:20:00Z',
          attachments: []
        }
      ],
      tags: ['kyc', 'verification', 'documents']
    },
    {
      id: 'TKT-003',
      subject: 'Investment returns calculation query',
      customer: {
        name: 'Michael Chen',
        email: 'michael.chen@example.com',
        phone: '+234 803 456 7890',
        tier: 'VIP'
      },
      priority: 'low',
      status: 'resolved',
      category: 'investment',
      assignedTo: 'David Investment',
      createdDate: '2025-01-13T09:15:00Z',
      lastUpdate: '2025-01-14T16:45:00Z',
      responseTime: '1h 20m',
      description: 'Customer has questions about how investment returns are calculated.',
      messages: [],
      tags: ['investment', 'returns', 'calculation']
    },
    {
      id: 'TKT-004',
      subject: 'Mobile app login issues',
      customer: {
        name: 'Amina Bello',
        email: 'amina.bello@example.com',
        phone: '+234 804 567 8901',
        tier: 'Premium'
      },
      priority: 'urgent',
      status: 'escalated',
      category: 'technical',
      assignedTo: 'Tech Support Team',
      createdDate: '2025-01-15T08:00:00Z',
      lastUpdate: '2025-01-15T15:30:00Z',
      responseTime: '30m',
      description: 'Customer cannot log into the mobile app despite correct credentials.',
      messages: [],
      tags: ['mobile-app', 'login', 'technical']
    }
  ];

  const ticketStats = [
    {
      title: 'Open Tickets',
      value: '24',
      change: '+3',
      trend: 'up',
      icon: MessageSquare,
      color: 'blue'
    },
    {
      title: 'Avg Response Time',
      value: '2h 15m',
      change: '-15m',
      trend: 'down',
      icon: Clock,
      color: 'green'
    },
    {
      title: 'Resolution Rate',
      value: '94.5%',
      change: '+2.1%',
      trend: 'up',
      icon: CheckCircle,
      color: 'purple'
    },
    {
      title: 'Customer Satisfaction',
      value: '4.8/5',
      change: '+0.2',
      trend: 'up',
      icon: Star,
      color: 'orange'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Tickets' },
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'escalated', label: 'Escalated' },
    { value: 'closed', label: 'Closed' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'resolved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'escalated':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'closed':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'withdrawal':
        return ArrowUpRight;
      case 'deposit':
        return ArrowDownRight;
      case 'kyc':
        return User;
      case 'investment':
        return TrendingUp;
      case 'technical':
        return AlertTriangle;
      default:
        return MessageSquare;
    }
  };

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

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || ticket.status === selectedFilter;
    const matchesPriority = selectedPriority === 'all' || ticket.priority === selectedPriority;
    
    return matchesSearch && matchesFilter && matchesPriority;
  });

  const handleTicketAction = (action: string, ticketId: string) => {
    console.log(`${action} ticket:`, ticketId);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedTicket) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  // Generate ticket data for charts
  const ticketData = generateTicketData(30);

  // Ticket volume chart data
  const ticketVolumeChartData = {
    labels: ticketData.labels,
    datasets: [
      {
        label: 'Open Tickets',
        data: ticketData.openTickets,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Resolved Tickets',
        data: ticketData.resolvedTickets,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Ticket categories chart data
  const ticketCategoriesChartData = {
    labels: ['Withdrawal', 'KYC', 'Investment', 'Technical', 'Other'],
    datasets: [
      {
        label: 'Tickets by Category',
        data: [35, 25, 15, 20, 5],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(107, 114, 128, 0.7)',
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
                alt="Support Tickets Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
              <p className="text-gray-600">Manage customer support tickets, track resolution times, and handle escalations</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {ticketStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-green-500 mr-1" />
                      )}
                      <span className="text-sm text-green-600">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                    <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Ticket Volume Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <img src="/image.png" alt="Ticket Volume Mascot" className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-900">Ticket Volume Trend</h3>
              </div>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View Details
              </button>
            </div>
            <LineChart data={ticketVolumeChartData} height={280} />
          </div>

          {/* Ticket Categories Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <img src="/image.png" alt="Ticket Categories Mascot" className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-900">Tickets by Category</h3>
              </div>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View Details
              </button>
            </div>
            <DoughnutChart data={ticketCategoriesChartData} height={280} />
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
                  placeholder="Search tickets..."
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

              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {priorityOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>

              <button className="flex items-center space-x-2 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
                <Plus className="h-4 w-4" />
                <span>New Ticket</span>
              </button>

              <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <img src="/image.png" alt="Tickets List Mascot" className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-gray-900">
                Support Tickets ({filteredTickets.length})
              </h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTickets.map((ticket) => {
                  const CategoryIcon = getCategoryIcon(ticket.category);
                  const { date, time } = formatDateTime(ticket.createdDate);
                  
                  return (
                    <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary-100 p-2 rounded-lg">
                            <CategoryIcon className="h-5 w-5 text-primary-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{ticket.id}</div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">{ticket.subject}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{ticket.customer.name}</div>
                        <div className="text-sm text-gray-500">{ticket.customer.tier}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ticket.assignedTo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{date}</div>
                        <div className="text-sm text-gray-500">{time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedTicket(ticket);
                              setShowTicketModal(true);
                            }}
                            className="text-primary-600 hover:text-primary-900 transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleTicketAction('reply', ticket.id)}
                            className="text-blue-600 hover:text-blue-900 transition-colors"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleTicketAction('escalate', ticket.id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                          >
                            <AlertTriangle className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredTickets.length === 0 && (
            <div className="p-12 text-center">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <img src="/image.png" alt="No Tickets" className="w-8 h-8 opacity-50" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Ticket Detail Modal */}
        {showTicketModal && selectedTicket && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="Ticket Detail Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">{selectedTicket.id}</h3>
                </div>
                <button
                  onClick={() => setShowTicketModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Ticket Details */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{selectedTicket.subject}</h4>
                    <p className="text-gray-700">{selectedTicket.description}</p>
                  </div>

                  {/* Messages */}
                  <div>
                    <h5 className="text-md font-semibold text-gray-900 mb-4">Conversation</h5>
                    <div className="space-y-4 max-h-64 overflow-y-auto">
                      {selectedTicket.messages.map((message: any) => (
                        <div key={message.id} className={`flex ${message.type === 'agent' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.type === 'agent' 
                              ? 'bg-primary-500 text-white' 
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <p className="text-sm">{message.message}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs opacity-75">{message.sender}</span>
                              <span className="text-xs opacity-75">{formatDateTime(message.timestamp).time}</span>
                            </div>
                            {message.attachments.length > 0 && (
                              <div className="mt-2">
                                {message.attachments.map((attachment: string, index: number) => (
                                  <div key={index} className="flex items-center space-x-1 text-xs">
                                    <Paperclip className="h-3 w-3" />
                                    <span>{attachment}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Reply Box */}
                    <div className="mt-4 border-t pt-4">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Type your reply..."
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={handleSendMessage}
                          className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                        >
                          Send Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ticket Info Sidebar */}
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-3">Ticket Information</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedTicket.status)}`}>
                          {selectedTicket.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Priority:</span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedTicket.priority)}`}>
                          {selectedTicket.priority}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium">{selectedTicket.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Assigned to:</span>
                        <span className="font-medium">{selectedTicket.assignedTo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Response time:</span>
                        <span className="font-medium">{selectedTicket.responseTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-3">Customer Information</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{selectedTicket.customer.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{selectedTicket.customer.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{selectedTicket.customer.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tier:</span>
                        <span className="font-medium">{selectedTicket.customer.tier}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-3">Tags</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedTicket.tags.map((tag: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors">
                      Resolve Ticket
                    </button>
                    <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors">
                      Escalate Ticket
                    </button>
                    <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-2 rounded-lg transition-colors">
                      Transfer Ticket
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportTickets;