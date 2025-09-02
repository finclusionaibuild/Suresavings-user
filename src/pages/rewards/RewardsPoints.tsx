import React, { useState } from 'react';
import { 
  Award, 
  Gift, 
  Star, 
  TrendingUp, 
  Clock, 
  ChevronRight, 
  CheckCircle, 
  Calendar, 
  Search, 
  Filter, 
  Download,
  ShoppingBag,
  Coffee,
  Smartphone,
  Headphones,
  CreditCard,
  Zap,
  Heart
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const RewardsPoints: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Sample rewards history data
  const rewardsHistory = [
    {
      id: 1,
      action: 'Monthly Savings Bonus',
      points: 250,
      date: '2025-01-15T10:30:00Z',
      status: 'credited'
    },
    {
      id: 2,
      action: 'Referral Bonus - Sarah Johnson',
      points: 500,
      date: '2025-01-10T14:20:00Z',
      status: 'credited'
    },
    {
      id: 3,
      action: 'Profile Completion',
      points: 100,
      date: '2025-01-05T09:15:00Z',
      status: 'credited'
    },
    {
      id: 4,
      action: 'Investment Milestone Reached',
      points: 300,
      date: '2024-12-28T16:45:00Z',
      status: 'credited'
    },
    {
      id: 5,
      action: 'Redeemed for Savings Bonus',
      points: -500,
      date: '2024-12-20T11:30:00Z',
      status: 'redeemed'
    },
    {
      id: 6,
      action: 'Weekly Savings Streak',
      points: 150,
      date: '2024-12-15T08:00:00Z',
      status: 'credited'
    },
    {
      id: 7,
      action: 'App Review Bonus',
      points: 50,
      date: '2024-12-10T13:20:00Z',
      status: 'credited'
    }
  ];

  // Sample rewards catalog data
  const rewardsCatalog = [
    {
      id: 1,
      category: 'Savings Bonuses',
      items: [
        {
          id: 101,
          name: 'Savings Interest Boost',
          description: '0.5% additional interest on your savings for 3 months',
          points: 1000,
          image: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          popular: true
        },
        {
          id: 102,
          name: 'Savings Deposit Bonus',
          description: '₦1,000 bonus added to your savings account',
          points: 2000,
          image: 'https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          popular: false
        }
      ]
    },
    {
      id: 2,
      category: 'Gift Cards',
      items: [
        {
          id: 201,
          name: 'Coffee Shop Gift Card',
          description: '₦2,000 gift card for popular coffee shops',
          points: 3000,
          image: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          popular: true
        },
        {
          id: 202,
          name: 'Shopping Voucher',
          description: '₦5,000 shopping voucher for major retailers',
          points: 7500,
          image: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          popular: false
        }
      ]
    },
    {
      id: 3,
      category: 'Electronics',
      items: [
        {
          id: 301,
          name: 'Wireless Earbuds',
          description: 'Premium wireless earbuds with noise cancellation',
          points: 15000,
          image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          popular: true
        },
        {
          id: 302,
          name: 'Power Bank',
          description: '10,000mAh fast-charging power bank',
          points: 8000,
          image: 'https://images.pexels.com/photos/5702281/pexels-photo-5702281.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          popular: false
        }
      ]
    },
    {
      id: 4,
      category: 'Experiences',
      items: [
        {
          id: 401,
          name: 'Movie Tickets',
          description: 'Two premium movie tickets at select theaters',
          points: 5000,
          image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          popular: false
        },
        {
          id: 402,
          name: 'Spa Voucher',
          description: '₦10,000 voucher for spa treatments',
          points: 12000,
          image: 'https://images.pexels.com/photos/3188/love-romantic-bath-candlelight.jpg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          popular: true
        }
      ]
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Activities' },
    { value: 'credited', label: 'Points Earned' },
    { value: 'redeemed', label: 'Points Redeemed' }
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
      case 'credited':
        return 'bg-green-100 text-green-700';
      case 'redeemed':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Savings Bonuses':
        return TrendingUp;
      case 'Gift Cards':
        return Gift;
      case 'Electronics':
        return Smartphone;
      case 'Experiences':
        return Heart;
      default:
        return Gift;
    }
  };

  const getItemIcon = (name: string) => {
    if (name.includes('Coffee')) return Coffee;
    if (name.includes('Shopping')) return ShoppingBag;
    if (name.includes('Earbuds') || name.includes('Movie')) return Headphones;
    if (name.includes('Power')) return Zap;
    if (name.includes('Gift Card') || name.includes('Voucher')) return CreditCard;
    return Gift;
  };

  const filteredHistory = rewardsHistory.filter(item => {
    const matchesSearch = item.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || item.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const totalPointsEarned = rewardsHistory
    .filter(item => item.status === 'credited')
    .reduce((sum, item) => sum + item.points, 0);

  const totalPointsRedeemed = rewardsHistory
    .filter(item => item.status === 'redeemed')
    .reduce((sum, item) => sum + Math.abs(item.points), 0);

  const handleRedeemReward = (rewardId: number) => {
    console.log(`Redeeming reward with ID: ${rewardId}`);
    // In a real app, this would initiate the redemption process
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
                alt="Rewards Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(245, 158, 11, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Rewards & Points</h1>
              <p className="text-gray-600">Earn points for your activities and redeem them for exciting rewards</p>
            </div>
          </div>
        </div>

        {/* Points Summary */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-3 mb-2">
                <Award className="h-8 w-8" />
                <h2 className="text-2xl font-bold">Your Reward Points</h2>
              </div>
              <div className="text-5xl font-bold mb-2">{user?.rewardPoints || 0}</div>
              <p className="text-yellow-100">Keep saving and referring friends to earn more points!</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-20 p-4 rounded-xl">
                <div className="text-yellow-100 text-sm mb-1">Total Earned</div>
                <div className="text-2xl font-bold">{totalPointsEarned}</div>
                <div className="text-yellow-100 text-xs">points</div>
              </div>
              
              <div className="bg-white bg-opacity-20 p-4 rounded-xl">
                <div className="text-yellow-100 text-sm mb-1">Total Redeemed</div>
                <div className="text-2xl font-bold">{totalPointsRedeemed}</div>
                <div className="text-yellow-100 text-xs">points</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-3 font-medium border-b-2 ${
                activeTab === 'overview'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-3 font-medium border-b-2 ${
                activeTab === 'history'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Points History
            </button>
            <button
              onClick={() => setActiveTab('redeem')}
              className={`px-4 py-3 font-medium border-b-2 ${
                activeTab === 'redeem'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Redeem Rewards
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* How to Earn Points */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <img src="/image.png" alt="Earn Points Mascot" className="w-5 h-5" />
                <h2 className="text-xl font-semibold text-gray-900">How to Earn Points</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Save Regularly</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">250 points monthly for consistent savings</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">150 points for weekly savings streak</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">500 points for reaching savings goals</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Refer Friends</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">500 points for each successful referral</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">1,000 points when referred friend saves ₦100,000</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">250 bonus points for 5+ referrals</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Star className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Other Activities</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">100 points for completing your profile</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">50 points for app reviews</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">300 points for investment milestones</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <img src="/image.png" alt="Recent Activity Mascot" className="w-5 h-5" />
                  <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                </div>
                <button
                  onClick={() => setActiveTab('history')}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {rewardsHistory.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        item.status === 'credited' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {item.status === 'credited' ? (
                          <Star className="h-5 w-5 text-green-600" />
                        ) : (
                          <Gift className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.action}</p>
                        <p className="text-sm text-gray-500">{formatDate(item.date)}</p>
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      item.status === 'credited' ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {item.status === 'credited' ? '+' : '-'}{Math.abs(item.points)} points
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Featured Rewards */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <img src="/image.png" alt="Featured Rewards Mascot" className="w-5 h-5" />
                  <h2 className="text-xl font-semibold text-gray-900">Featured Rewards</h2>
                </div>
                <button
                  onClick={() => setActiveTab('redeem')}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View All
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {rewardsCatalog.flatMap(category => 
                  category.items.filter(item => item.popular)
                ).map((reward) => (
                  <div key={reward.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
                    <div className="h-32 bg-gray-200 relative">
                      <img 
                        src={reward.image} 
                        alt={reward.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Popular
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{reward.name}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{reward.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-semibold">{reward.points} points</span>
                        </div>
                        <button
                          onClick={() => handleRedeemReward(reward.id)}
                          className="px-3 py-1 bg-primary-500 hover:bg-primary-600 text-white text-sm rounded-lg transition-colors"
                        >
                          Redeem
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Points History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
              <div className="flex items-center space-x-2">
                <img src="/image.png" alt="Points History Mascot" className="w-5 h-5" />
                <h2 className="text-xl font-semibold text-gray-900">Points History</h2>
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
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {filterOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.action}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(item.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-semibold ${
                          item.status === 'credited' ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {item.status === 'credited' ? '+' : '-'}{Math.abs(item.points)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredHistory.length === 0 && (
              <div className="p-12 text-center">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <img src="/image.png" alt="No History" className="w-8 h-8 opacity-50" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No points history found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        )}

        {/* Redeem Rewards Tab */}
        {activeTab === 'redeem' && (
          <div className="space-y-8">
            {/* Points Balance Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-3 mb-4 md:mb-0">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Available Points</p>
                    <p className="text-3xl font-bold text-gray-900">{user?.rewardPoints || 0}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Points expire after 12 months of inactivity</span>
                </div>
              </div>
            </div>
            
            {/* Rewards Catalog */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <img src="/image.png" alt="Rewards Catalog Mascot" className="w-5 h-5" />
                <h2 className="text-xl font-semibold text-gray-900">Rewards Catalog</h2>
              </div>
              
              <div className="space-y-8">
                {rewardsCatalog.map((category) => {
                  const CategoryIcon = getCategoryIcon(category.category);
                  return (
                    <div key={category.id}>
                      <div className="flex items-center space-x-2 mb-4">
                        <CategoryIcon className="h-5 w-5 text-primary-600" />
                        <h3 className="text-lg font-semibold text-gray-900">{category.category}</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.items.map((item) => {
                          const ItemIcon = getItemIcon(item.name);
                          return (
                            <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
                              <div className="h-40 bg-gray-200 relative">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                />
                                {item.popular && (
                                  <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    Popular
                                  </div>
                                )}
                              </div>
                              <div className="p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                  <ItemIcon className="h-4 w-4 text-primary-600" />
                                  <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-4 w-4 text-yellow-500" />
                                    <span className="font-semibold">{item.points} points</span>
                                  </div>
                                  <button
                                    onClick={() => handleRedeemReward(item.id)}
                                    disabled={user?.rewardPoints ? user.rewardPoints < item.points : true}
                                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                                      user?.rewardPoints && user.rewardPoints >= item.points
                                        ? 'bg-primary-500 hover:bg-primary-600 text-white'
                                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    }`}
                                  >
                                    {user?.rewardPoints && user.rewardPoints >= item.points ? 'Redeem' : 'Not Enough Points'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RewardsPoints;