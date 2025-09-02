import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  DollarSign, 
  TrendingUp, 
  User, 
  Calendar, 
  Clock, 
  Shield, 
  Settings, 
  Trash2, 
  CheckSquare, 
  Filter, 
  Search, 
  Download,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Notifications: React.FC = () => {
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: 'transaction',
      title: 'Successful Deposit',
      message: 'Your deposit of ₦50,000 has been successfully processed.',
      date: '2025-01-15T14:30:00Z',
      isRead: false,
      priority: 'normal'
    },
    {
      id: 2,
      type: 'investment',
      title: 'Investment Matured',
      message: 'Your Fixed Income investment has matured with a return of ₦15,200.',
      date: '2025-01-14T10:15:00Z',
      isRead: false,
      priority: 'high'
    },
    {
      id: 3,
      type: 'security',
      title: 'New Device Login',
      message: 'A new device was used to access your account. If this wasn\'t you, please secure your account immediately.',
      date: '2025-01-13T08:45:00Z',
      isRead: true,
      priority: 'critical'
    },
    {
      id: 4,
      type: 'account',
      title: 'KYC Verification Approved',
      message: 'Your KYC verification has been approved. You now have access to all platform features.',
      date: '2025-01-12T16:20:00Z',
      isRead: true,
      priority: 'high'
    },
    {
      id: 5,
      type: 'savings',
      title: 'Savings Goal Reached',
      message: 'Congratulations! You\'ve reached your "Vacation Fund" savings goal of ₦500,000.',
      date: '2025-01-11T11:30:00Z',
      isRead: true,
      priority: 'normal'
    },
    {
      id: 6,
      type: 'system',
      title: 'Scheduled Maintenance',
      message: 'SureSavings will undergo scheduled maintenance on January 20, 2025, from 2:00 AM to 4:00 AM WAT.',
      date: '2025-01-10T09:00:00Z',
      isRead: true,
      priority: 'normal'
    },
    {
      id: 7,
      type: 'reward',
      title: 'Reward Points Earned',
      message: 'You\'ve earned 250 reward points for completing your profile information.',
      date: '2025-01-09T15:45:00Z',
      isRead: true,
      priority: 'normal'
    },
    {
      id: 8,
      type: 'referral',
      title: 'Referral Bonus',
      message: 'Your friend Sarah Johnson has joined SureSavings using your referral code. You\'ve earned ₦2,500!',
      date: '2025-01-08T13:20:00Z',
      isRead: true,
      priority: 'high'
    },
    {
      id: 9,
      type: 'group',
      title: 'Group Savings Invitation',
      message: 'You\'ve been invited to join "Office Colleagues Savings" group by John Doe.',
      date: '2025-01-07T10:10:00Z',
      isRead: false,
      priority: 'normal'
    },
    {
      id: 10,
      type: 'transaction',
      title: 'Automatic Savings Deduction',
      message: 'Your scheduled automatic savings of ₦25,000 has been processed successfully.',
      date: '2025-01-06T08:00:00Z',
      isRead: true,
      priority: 'normal'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Notifications' },
    { value: 'unread', label: 'Unread' },
    { value: 'transaction', label: 'Transactions' },
    { value: 'investment', label: 'Investments' },
    { value: 'savings', label: 'Savings' },
    { value: 'security', label: 'Security' },
    { value: 'account', label: 'Account' },
    { value: 'system', label: 'System' },
    { value: 'reward', label: 'Rewards' },
    { value: 'referral', label: 'Referrals' },
    { value: 'group', label: 'Group Savings' }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Today, ' + date.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' });
    } else if (diffInDays === 1) {
      return 'Yesterday, ' + date.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' });
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return date.toLocaleDateString('en-NG', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'transaction':
        return <DollarSign className="h-5 w-5 text-blue-500" />;
      case 'investment':
        return <TrendingUp className="h-5 w-5 text-purple-500" />;
      case 'security':
        return <Shield className="h-5 w-5 text-red-500" />;
      case 'account':
        return <User className="h-5 w-5 text-green-500" />;
      case 'savings':
        return <img src="/image.png" alt="Savings" className="h-5 w-5" />;
      case 'system':
        return <Settings className="h-5 w-5 text-gray-500" />;
      case 'reward':
        return <CheckSquare className="h-5 w-5 text-yellow-500" />;
      case 'referral':
        return <User className="h-5 w-5 text-orange-500" />;
      case 'group':
        return <User className="h-5 w-5 text-indigo-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'high':
        return <Info className="h-4 w-4 text-orange-500" />;
      case 'normal':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'unread' && !notification.isRead) ||
                         notification.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  const handleMarkAsRead = (id: number) => {
    // In a real app, this would update the notification status in the backend
    console.log(`Marking notification ${id} as read`);
  };

  const handleMarkAllAsRead = () => {
    // In a real app, this would update all notifications status in the backend
    console.log('Marking all notifications as read');
  };

  const handleDeleteNotification = (id: number) => {
    // In a real app, this would delete the notification in the backend
    console.log(`Deleting notification ${id}`);
  };

  const handleBulkAction = (action: 'read' | 'delete') => {
    if (action === 'read') {
      console.log(`Marking ${selectedNotifications.length} notifications as read`);
    } else {
      console.log(`Deleting ${selectedNotifications.length} notifications`);
    }
    setSelectedNotifications([]);
  };

  const toggleSelectNotification = (id: number) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(selectedNotifications.filter(notificationId => notificationId !== id));
    } else {
      setSelectedNotifications([...selectedNotifications, id]);
    }
  };

  const selectAllNotifications = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(notification => notification.id));
    }
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
                alt="Notifications Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full animate-pulse flex items-center justify-center">
                <span className="text-white text-xs font-bold">{unreadCount}</span>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600">Stay updated with important alerts and information about your account</p>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
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
                onClick={handleMarkAllAsRead}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors"
              >
                <CheckSquare className="h-4 w-4" />
                <span>Mark All as Read</span>
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img src="/image.png" alt="Notifications List Mascot" className="w-5 h-5" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Your Notifications ({filteredNotifications.length})
                </h2>
              </div>
              
              {selectedNotifications.length > 0 && (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{selectedNotifications.length} selected</span>
                  <button
                    onClick={() => handleBulkAction('read')}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Mark as Read
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {filteredNotifications.length > 0 ? (
            <div>
              <div className="px-6 py-2 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedNotifications.length === filteredNotifications.length && filteredNotifications.length > 0}
                    onChange={selectAllNotifications}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-500">Select All</span>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {filteredNotifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-6 hover:bg-gray-50 transition-colors ${!notification.isRead ? 'bg-primary-50' : ''}`}
                  >
                    <div className="flex items-start">
                      <div className="mr-4">
                        <input
                          type="checkbox"
                          checked={selectedNotifications.includes(notification.id)}
                          onChange={() => toggleSelectNotification(notification.id)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                      </div>
                      
                      <div className="flex-shrink-0 mr-4">
                        <div className={`p-2 rounded-full ${!notification.isRead ? 'bg-primary-100' : 'bg-gray-100'}`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center mb-1">
                          <h3 className={`text-base font-semibold ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                              New
                            </span>
                          )}
                          <div className="ml-2">
                            {getPriorityIcon(notification.priority)}
                          </div>
                        </div>
                        <p className={`text-sm ${!notification.isRead ? 'text-gray-800' : 'text-gray-600'}`}>
                          {notification.message}
                        </p>
                        <div className="mt-1 flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{formatDate(notification.date)}</span>
                        </div>
                      </div>
                      
                      <div className="ml-4 flex-shrink-0 flex space-x-2">
                        {!notification.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-primary-600 hover:text-primary-700"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteNotification(notification.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
              <p className="text-gray-500">You're all caught up! Check back later for new notifications.</p>
            </div>
          )}
        </div>

        {/* Notification Preferences */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-2 mb-6">
            <img src="/image.png" alt="Preferences Mascot" className="w-5 h-5" />
            <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Email Notifications</h3>
                <p className="text-sm text-gray-600">Receive notifications via email</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-500">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                <p className="text-sm text-gray-600">Receive notifications via SMS</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-500">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Push Notifications</h3>
                <p className="text-sm text-gray-600">Receive push notifications on your device</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-500">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Transaction Alerts</h3>
                <p className="text-sm text-gray-600">Get notified about deposits, withdrawals, and transfers</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-500">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Security Alerts</h3>
                <p className="text-sm text-gray-600">Get notified about security-related events</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-500">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Marketing Communications</h3>
                <p className="text-sm text-gray-600">Receive promotional offers and updates</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
              </button>
            </div>
          </div>

          <button className="mt-6 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;