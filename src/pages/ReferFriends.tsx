import React, { useState } from 'react';
import { 
  Users, 
  Copy, 
  Check, 
  Mail, 
  Share2, 
  Award, 
  Gift, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  Search, 
  Filter, 
  Download,
  Facebook,
  Twitter,
  Linkedin,
  MessageSquare,
  Link
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ReferFriends: React.FC = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [emailInvite, setEmailInvite] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Sample referrals data
  const referrals = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      date: '2025-01-10T14:20:00Z',
      status: 'registered',
      reward: 500,
      rewardStatus: 'paid'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      date: '2025-01-05T09:15:00Z',
      status: 'registered',
      reward: 500,
      rewardStatus: 'paid'
    },
    {
      id: 3,
      name: 'Amina Bello',
      email: 'amina.bello@example.com',
      date: '2024-12-28T16:45:00Z',
      status: 'registered',
      reward: 500,
      rewardStatus: 'paid'
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      date: '2024-12-20T11:30:00Z',
      status: 'invited',
      reward: 0,
      rewardStatus: 'pending'
    },
    {
      id: 5,
      name: 'Olumide Adeyemi',
      email: 'olumide.adeyemi@example.com',
      date: '2024-12-15T08:00:00Z',
      status: 'invited',
      reward: 0,
      rewardStatus: 'pending'
    }
  ];

  const referralBenefits = [
    {
      title: 'Earn 500 Points',
      description: 'Get 500 reward points for each friend who signs up using your referral code',
      icon: Award
    },
    {
      title: '₦2,500 Bonus',
      description: 'Receive ₦2,500 cash bonus when your friend makes their first deposit',
      icon: Gift
    },
    {
      title: 'Tier Upgrades',
      description: 'Unlock higher reward tiers with more referrals and earn exclusive benefits',
      icon: TrendingUp
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Referrals' },
    { value: 'registered', label: 'Registered' },
    { value: 'invited', label: 'Invited' }
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
      case 'registered':
        return 'bg-green-100 text-green-700';
      case 'invited':
        return 'bg-yellow-100 text-yellow-700';
      case 'paid':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const copyReferralCode = async () => {
    if (user?.referralCode) {
      try {
        await navigator.clipboard.writeText(user.referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const handleEmailInvite = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Sending invite to: ${emailInvite}`);
    setEmailInvite('');
    // In a real app, this would send an invitation email
  };

  const handleShareVia = (platform: string) => {
    console.log(`Sharing via ${platform}`);
    // In a real app, this would open the sharing dialog for the selected platform
  };

  const filteredReferrals = referrals.filter(referral => {
    const matchesSearch = referral.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referral.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || referral.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const totalReferrals = referrals.length;
  const successfulReferrals = referrals.filter(r => r.status === 'registered').length;
  const totalRewards = referrals.reduce((sum, r) => sum + r.reward, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <img 
                src="/image.png" 
                alt="Refer Friends Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Refer Friends</h1>
              <p className="text-gray-600">Invite friends to join SureSavings and earn rewards for successful referrals</p>
            </div>
          </div>
        </div>

        {/* Referral Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Referrals</p>
                <p className="text-2xl font-bold text-gray-900">{totalReferrals}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Successful Referrals</p>
                <p className="text-2xl font-bold text-green-600">{successfulReferrals}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Rewards Earned</p>
                <p className="text-2xl font-bold text-yellow-600">{totalRewards} points</p>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Code Card */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-lg p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-3 mb-2">
                <Link className="h-6 w-6" />
                <h2 className="text-xl font-bold">Your Referral Code</h2>
              </div>
              <div className="text-3xl font-bold font-mono mb-2">{user?.referralCode || 'YOURCODE123'}</div>
              <p className="text-primary-100">Share this code with friends to earn rewards!</p>
            </div>
            
            <div className="flex flex-col space-y-3">
              <button
                onClick={copyReferralCode}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-white text-primary-600 rounded-xl font-medium transition-colors hover:bg-primary-50"
              >
                {copied ? (
                  <>
                    <Check className="h-5 w-5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-5 w-5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
              
              <div className="flex items-center justify-center space-x-3">
                <button
                  onClick={() => handleShareVia('facebook')}
                  className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleShareVia('twitter')}
                  className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleShareVia('linkedin')}
                  className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleShareVia('whatsapp')}
                  className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
                >
                  <MessageSquare className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Invite by Email */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <img src="/image.png" alt="Invite Mascot" className="w-5 h-5" />
                <h2 className="text-xl font-semibold text-gray-900">Invite by Email</h2>
              </div>
              
              <form onSubmit={handleEmailInvite} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Friend's Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={emailInvite}
                      onChange={(e) => setEmailInvite(e.target.value)}
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                >
                  Send Invitation
                </button>
              </form>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Share via Link</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={`https://suresavings.com/ref/${user?.referralCode || 'YOURCODE123'}`}
                    readOnly
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                  />
                  <button
                    onClick={copyReferralCode}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {copied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5 text-gray-600" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Referral Benefits */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <img src="/image.png" alt="Benefits Mascot" className="w-5 h-5" />
                <h2 className="text-xl font-semibold text-gray-900">Referral Benefits</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {referralBenefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="bg-gray-50 p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-primary-100 p-3 rounded-lg">
                          <Icon className="h-6 w-6 text-primary-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                      </div>
                      <p className="text-sm text-gray-700">{benefit.description}</p>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-100 p-2 rounded-lg mt-1">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-yellow-800 mb-1">Limited Time Offer</h3>
                    <p className="text-sm text-yellow-700">
                      For a limited time, earn <span className="font-semibold">DOUBLE POINTS</span> for each successful referral! 
                      Offer valid until February 28, 2025.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Referrals Table */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
            <div className="flex items-center space-x-2">
              <img src="/image.png" alt="Referrals Mascot" className="w-5 h-5" />
              <h2 className="text-xl font-semibold text-gray-900">Your Referrals</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search referrals..."
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
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reward
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReferrals.map((referral) => (
                  <tr key={referral.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{referral.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {referral.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(referral.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(referral.status)}`}>
                        {referral.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {referral.reward > 0 ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">{referral.reward} points</span>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(referral.rewardStatus)}`}>
                            {referral.rewardStatus}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredReferrals.length === 0 && (
            <div className="p-12 text-center">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <img src="/image.png" alt="No Referrals" className="w-8 h-8 opacity-50" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No referrals found</h3>
              <p className="text-gray-500">Start inviting friends to earn rewards</p>
            </div>
          )}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
          <div className="flex items-center space-x-2 mb-6">
            <img src="/image.png" alt="How It Works Mascot" className="w-5 h-5" />
            <h2 className="text-xl font-semibold text-gray-900">How It Works</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Share Your Code</h3>
              <p className="text-sm text-gray-600">
                Share your unique referral code with friends via email, social media, or direct link
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Friends Sign Up</h3>
              <p className="text-sm text-gray-600">
                Your friends create an account using your referral code and complete verification
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Earn Rewards</h3>
              <p className="text-sm text-gray-600">
                You earn points and bonuses when your friends sign up and make their first deposit
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferFriends;