import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  UserPlus,
  Bell,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Settings,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const GroupSavings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('my-groups');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showGroupDetailsModal, setShowGroupDetailsModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);

  // Sample data for groups
  const myGroups = [
    {
      id: 1,
      name: "Office Colleagues Savings",
      type: "Rotational",
      members: 12,
      contribution: 25000,
      frequency: "Monthly",
      nextContribution: "2025-02-15",
      totalSaved: 300000,
      myTurn: false,
      nextTurn: "2025-05-15",
      status: "active",
      admin: "John Doe",
      balance: 25000,
      progress: 25,
      description: "Monthly savings group for office colleagues with rotational payouts",
      createdDate: "2024-10-01"
    },
    {
      id: 2,
      name: "Family Vacation Fund",
      type: "Goal-based",
      members: 5,
      contribution: 15000,
      frequency: "Bi-weekly",
      nextContribution: "2025-02-01",
      totalSaved: 225000,
      targetAmount: 500000,
      status: "active",
      admin: "You",
      balance: 45000,
      progress: 45,
      description: "Saving for our annual family vacation to Dubai in December 2025",
      createdDate: "2024-11-15"
    },
    {
      id: 3,
      name: "Business Investment Group",
      type: "Rotational",
      members: 8,
      contribution: 50000,
      frequency: "Monthly",
      nextContribution: "2025-02-20",
      totalSaved: 400000,
      myTurn: true,
      nextTurn: "2025-02-20",
      status: "active",
      admin: "Sarah Johnson",
      balance: 50000,
      progress: 75,
      description: "Investment group for small business owners with monthly contributions",
      createdDate: "2024-09-01"
    }
  ];

  const availableGroups = [
    {
      id: 4,
      name: "Tech Professionals Savings",
      type: "Rotational",
      members: 10,
      maxMembers: 15,
      contribution: 30000,
      frequency: "Monthly",
      nextContribution: "2025-02-10",
      totalSaved: 600000,
      status: "open",
      admin: "Michael Chen",
      description: "Savings group for tech professionals with monthly rotational payouts",
      createdDate: "2024-12-01"
    },
    {
      id: 5,
      name: "Home Ownership Fund",
      type: "Goal-based",
      members: 8,
      maxMembers: 10,
      contribution: 100000,
      frequency: "Monthly",
      nextContribution: "2025-02-05",
      totalSaved: 2400000,
      targetAmount: 10000000,
      status: "open",
      admin: "Amina Bello",
      description: "Long-term savings group for home ownership with high monthly contributions",
      createdDate: "2024-08-15"
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      group: "Office Colleagues Savings",
      type: "contribution",
      amount: 25000,
      date: "2025-01-15T10:30:00Z",
      status: "completed"
    },
    {
      id: 2,
      group: "Family Vacation Fund",
      type: "contribution",
      amount: 15000,
      date: "2025-01-14T14:20:00Z",
      status: "completed"
    },
    {
      id: 3,
      group: "Business Investment Group",
      type: "payout",
      amount: 400000,
      date: "2024-12-20T09:15:00Z",
      status: "completed"
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Groups' },
    { value: 'rotational', label: 'Rotational' },
    { value: 'goal-based', label: 'Goal-based' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'open':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleCreateGroup = () => {
    console.log('Creating new group');
    setShowCreateModal(false);
  };

  const handleJoinGroup = (groupId: number) => {
    console.log('Joining group:', groupId);
    setShowJoinModal(false);
  };

  const handleViewGroup = (group: any) => {
    setSelectedGroup(group);
    setShowGroupDetailsModal(true);
  };

  const filteredMyGroups = myGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         group.type.toLowerCase() === selectedFilter.toLowerCase() ||
                         group.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const filteredAvailableGroups = availableGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         group.type.toLowerCase() === selectedFilter.toLowerCase() ||
                         group.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <img 
                src="/image.png" 
                alt="Group Savings Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Group Savings (Esusu/Ajo)</h1>
              <p className="text-gray-600">Join or create savings groups, track contributions, and achieve your financial goals together</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">My Active Groups</p>
                <p className="text-2xl font-bold text-gray-900">{myGroups.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Contributions</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(myGroups.reduce((sum, group) => sum + group.balance, 0))}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Next Contribution</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatDate(myGroups.sort((a, b) => 
                    new Date(a.nextContribution).getTime() - new Date(b.nextContribution).getTime()
                  )[0]?.nextContribution || '')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setActiveTab('my-groups')}
                className={`px-4 py-2 font-medium rounded-lg transition-colors ${
                  activeTab === 'my-groups'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                My Groups
              </button>
              <button
                onClick={() => setActiveTab('available-groups')}
                className={`px-4 py-2 font-medium rounded-lg transition-colors ${
                  activeTab === 'available-groups'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Available Groups
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`px-4 py-2 font-medium rounded-lg transition-colors ${
                  activeTab === 'transactions'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Transactions
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search groups..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Create Group</span>
              </button>
            </div>
          </div>
        </div>

        {/* My Groups Tab */}
        {activeTab === 'my-groups' && (
          <div className="space-y-6">
            {filteredMyGroups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMyGroups.map((group) => (
                  <div key={group.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary-100 p-2 rounded-lg">
                            <Users className="h-5 w-5 text-primary-600" />
                          </div>
                          <h3 className="font-semibold text-gray-900">{group.name}</h3>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(group.status)}`}>
                          {group.status}
                        </span>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Type:</span>
                          <span className="text-sm font-medium">{group.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Members:</span>
                          <span className="text-sm font-medium">{group.members}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Contribution:</span>
                          <span className="text-sm font-medium">{formatCurrency(group.contribution)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Frequency:</span>
                          <span className="text-sm font-medium">{group.frequency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Next Contribution:</span>
                          <span className="text-sm font-medium">{formatDate(group.nextContribution)}</span>
                        </div>
                      </div>

                      {group.type === "Rotational" && (
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">My Turn:</span>
                            <span className={`text-sm font-medium ${group.myTurn ? 'text-green-600' : 'text-gray-600'}`}>
                              {group.myTurn ? 'Yes - ' + formatDate(group.nextTurn) : 'No - ' + formatDate(group.nextTurn)}
                            </span>
                          </div>
                        </div>
                      )}

                      {group.type === "Goal-based" && (
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Progress:</span>
                            <span className="text-sm font-medium">
                              {formatCurrency(group.totalSaved)} of {formatCurrency(group.targetAmount || 0)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary-500 h-2 rounded-full"
                              style={{ width: `${group.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewGroup(group)}
                          className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          View Details
                        </button>
                        <button className="p-2 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <img src="/image.png" alt="No Groups" className="w-8 h-8 opacity-50" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No groups found</h3>
                <p className="text-gray-500 mb-6">You haven't joined any savings groups yet or no groups match your search criteria.</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create a New Group</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Available Groups Tab */}
        {activeTab === 'available-groups' && (
          <div className="space-y-6">
            {filteredAvailableGroups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAvailableGroups.map((group) => (
                  <div key={group.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <h3 className="font-semibold text-gray-900">{group.name}</h3>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(group.status)}`}>
                          {group.status}
                        </span>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Type:</span>
                          <span className="text-sm font-medium">{group.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Members:</span>
                          <span className="text-sm font-medium">{group.members}/{group.maxMembers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Contribution:</span>
                          <span className="text-sm font-medium">{formatCurrency(group.contribution)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Frequency:</span>
                          <span className="text-sm font-medium">{group.frequency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Admin:</span>
                          <span className="text-sm font-medium">{group.admin}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{group.description}</p>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedGroup(group);
                            setShowJoinModal(true);
                          }}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Join Group
                        </button>
                        <button
                          onClick={() => handleViewGroup(group)}
                          className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <img src="/image.png" alt="No Groups" className="w-8 h-8 opacity-50" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No available groups found</h3>
                <p className="text-gray-500 mb-6">There are no open groups available at the moment or no groups match your search criteria.</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create a New Group</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <img src="/image.png" alt="Transactions Mascot" className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Transactions
                </h3>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {recentTransactions.map((transaction) => {
                const { date, time } = formatDateTime(transaction.date);
                
                return (
                  <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${
                          transaction.type === 'contribution' ? 'bg-green-100' : 'bg-blue-100'
                        }`}>
                          {transaction.type === 'contribution' ? (
                            <ArrowDownRight className="h-6 w-6 text-green-600" />
                          ) : (
                            <ArrowUpRight className="h-6 w-6 text-blue-600" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="font-semibold text-gray-900">
                              {transaction.type === 'contribution' ? 'Contribution to' : 'Payout from'} {transaction.group}
                            </h3>
                            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700`}>
                              <CheckCircle className="h-3 w-3" />
                              <span>Completed</span>
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{date} at {time}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className={`text-lg font-bold ${
                          transaction.type === 'contribution' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {transaction.type === 'contribution' ? '-' : '+'}{formatCurrency(transaction.amount)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {recentTransactions.length === 0 && (
              <div className="p-12 text-center">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <img src="/image.png" alt="No Transactions" className="w-8 h-8 opacity-50" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                <p className="text-gray-500">You haven't made any group savings transactions yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Create Group Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="Create Group Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">Create New Savings Group</h3>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Group Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter group name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Group Type</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="rotational">Rotational (Esusu/Ajo)</option>
                    <option value="goal-based">Goal-based</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contribution Amount</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="₦0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contribution Frequency</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="bi-weekly">Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Members</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="goal-based-fields">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Amount (for Goal-based)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="₦0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Group Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Describe the purpose of this savings group..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Group Rules</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Set rules for the group members..."
                  ></textarea>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="private-group"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="private-group" className="text-sm text-gray-700">
                    Make this group private (invitation only)
                  </label>
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
                  onClick={handleCreateGroup}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Create Group
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Join Group Modal */}
        {showJoinModal && selectedGroup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="Join Group Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">Join Group</h3>
                </div>
                <button
                  onClick={() => setShowJoinModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">{selectedGroup.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{selectedGroup.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contribution:</span>
                      <span className="font-medium">{formatCurrency(selectedGroup.contribution)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frequency:</span>
                      <span className="font-medium">{selectedGroup.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Members:</span>
                      <span className="font-medium">{selectedGroup.members}/{selectedGroup.maxMembers}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="wallet">SureSavings Wallet</option>
                    <option value="card">Debit Card</option>
                    <option value="bank">Bank Transfer</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="agree-terms"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="agree-terms" className="text-sm text-gray-700">
                    I agree to the group rules and contribution schedule
                  </label>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowJoinModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleJoinGroup(selectedGroup.id)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Join Group
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Group Details Modal */}
        {showGroupDetailsModal && selectedGroup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="Group Details Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">{selectedGroup.name}</h3>
                </div>
                <button
                  onClick={() => setShowGroupDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Group Overview */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Group Overview</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{selectedGroup.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Members:</span>
                        <span className="font-medium">{selectedGroup.members}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contribution:</span>
                        <span className="font-medium">{formatCurrency(selectedGroup.contribution)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Frequency:</span>
                        <span className="font-medium">{selectedGroup.frequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Next Contribution:</span>
                        <span className="font-medium">{formatDate(selectedGroup.nextContribution)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedGroup.status)}`}>
                          {selectedGroup.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Created:</span>
                        <span className="font-medium">{formatDate(selectedGroup.createdDate)}</span>
                      </div>
                    </div>
                  </div>

                  {selectedGroup.type === "Rotational" && (
                    <div className="bg-gray-50 p-6 rounded-lg mt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Rotation Schedule</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">My Turn:</span>
                          <span className={`font-medium ${selectedGroup.myTurn ? 'text-green-600' : 'text-gray-900'}`}>
                            {selectedGroup.myTurn ? 'Current' : formatDate(selectedGroup.nextTurn)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Saved:</span>
                          <span className="font-medium">{formatCurrency(selectedGroup.totalSaved)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">My Balance:</span>
                          <span className="font-medium">{formatCurrency(selectedGroup.balance)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedGroup.type === "Goal-based" && (
                    <div className="bg-gray-50 p-6 rounded-lg mt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Goal Progress</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Target Amount:</span>
                          <span className="font-medium">{formatCurrency(selectedGroup.targetAmount || 0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Saved:</span>
                          <span className="font-medium">{formatCurrency(selectedGroup.totalSaved)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">My Balance:</span>
                          <span className="font-medium">{formatCurrency(selectedGroup.balance)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Progress:</span>
                          <span className="font-medium">{selectedGroup.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-500 h-2 rounded-full"
                            style={{ width: `${selectedGroup.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Group Details */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Group Description</h4>
                    <p className="text-gray-700">{selectedGroup.description}</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Members</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary-100 p-2 rounded-full">
                            <Users className="h-4 w-4 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{selectedGroup.admin}</p>
                            <p className="text-xs text-gray-500">Group Admin</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gray-100 p-2 rounded-full">
                            <Users className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">You</p>
                            <p className="text-xs text-gray-500">Member</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gray-100 p-2 rounded-full">
                            <Users className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">+ {selectedGroup.members - 2} more members</p>
                            <p className="text-xs text-gray-500">Click to view all</p>
                          </div>
                        </div>
                        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                          View All
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Recent Activity</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-100 p-2 rounded-lg mt-1">
                          <ArrowDownRight className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">You made a contribution</p>
                          <p className="text-sm text-gray-600">{formatCurrency(selectedGroup.contribution)} • {formatDate(new Date().toISOString())}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg mt-1">
                          <UserPlus className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">New member joined</p>
                          <p className="text-sm text-gray-600">Jane Smith • 2 days ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-purple-100 p-2 rounded-lg mt-1">
                          <RefreshCw className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Rotation completed</p>
                          <p className="text-sm text-gray-600">Michael received {formatCurrency(selectedGroup.contribution * selectedGroup.members)} • 1 week ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Make Contribution
                </button>
                <button
                  className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                >
                  View Transactions
                </button>
                <button
                  className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
                >
                  Group Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupSavings;