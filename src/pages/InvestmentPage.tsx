import React, { useState } from 'react';
import { useTour } from '../hooks/useTour';
import UserTourGuide from '../components/UserTourGuide';
import { 
  TrendingUp, 
  PieChart, 
  DollarSign, 
  Shield, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Eye,
  Calendar,
  Target,
  Award
} from 'lucide-react';

const InvestmentPage: React.FC = () => {
  const [selectedInvestment, setSelectedInvestment] = useState<string | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { tourState, startTour, completeTour, closeTour, shouldShowTour } = useTour();

  // Start tour for first-time users
  React.useEffect(() => {
    if (shouldShowTour('investments')) {
      setTimeout(() => startTour('investments'), 500);
    }
  }, []);

  const investmentOptions = [
    {
      id: 'fixed-income',
      name: 'Fixed Income',
      icon: Shield,
      minReturn: 12,
      maxReturn: 18,
      risk: 'Low',
      duration: '6-24 months',
      description: 'Secure investments with guaranteed returns backed by government bonds.',
      features: ['Guaranteed returns', 'Government backed', 'Low risk', 'Flexible terms'],
      color: 'green'
    },
    {
      id: 'mutual-funds',
      name: 'Mutual Funds',
      icon: PieChart,
      minReturn: 15,
      maxReturn: 25,
      risk: 'Medium',
      duration: '12-36 months',
      description: 'Diversified portfolio managed by professional fund managers.',
      features: ['Professional management', 'Diversified portfolio', 'Medium risk', 'Higher returns'],
      color: 'blue'
    },
    {
      id: 'stocks',
      name: 'Stock Portfolio',
      icon: TrendingUp,
      minReturn: 20,
      maxReturn: 35,
      risk: 'High',
      duration: '12+ months',
      description: 'Invest in carefully selected Nigerian and international stocks.',
      features: ['High growth potential', 'Curated selection', 'Higher risk', 'Long-term growth'],
      color: 'purple'
    }
  ];

  const myInvestments = [
    {
      id: 1,
      name: 'Fixed Income Bond',
      type: 'fixed-income',
      amount: 100000,
      currentValue: 108500,
      returns: 8.5,
      startDate: '2024-08-01',
      maturityDate: '2025-08-01',
      status: 'active'
    },
    {
      id: 2,
      name: 'Growth Mutual Fund',
      type: 'mutual-funds',
      amount: 50000,
      currentValue: 58200,
      returns: 16.4,
      startDate: '2024-09-15',
      maturityDate: '2026-09-15',
      status: 'active'
    }
  ];

  const marketTrends = [
    { name: 'NSE All-Share Index', value: 52847.23, change: +2.45, percentage: +0.47 },
    { name: 'Government Bonds', value: 15.75, change: -0.25, percentage: -1.56 },
    { name: 'Treasury Bills', value: 12.50, change: +0.15, percentage: +1.22 },
    { name: 'USD/NGN', value: 815.25, change: +5.75, percentage: +0.71 }
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

  const getTotalInvestmentValue = () => {
    return myInvestments.reduce((total, investment) => total + investment.currentValue, 0);
  };

  const getTotalReturns = () => {
    return myInvestments.reduce((total, investment) => total + (investment.currentValue - investment.amount), 0);
  };

  const getReturnPercentage = () => {
    const totalInvested = myInvestments.reduce((total, investment) => total + investment.amount, 0);
    const totalReturns = getTotalReturns();
    return totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0;
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return { bg: 'bg-green-500', border: 'border-green-500', text: 'text-green-600', lightBg: 'bg-green-50' };
      case 'blue':
        return { bg: 'bg-blue-500', border: 'border-blue-500', text: 'text-blue-600', lightBg: 'bg-blue-50' };
      case 'purple':
        return { bg: 'bg-purple-500', border: 'border-purple-500', text: 'text-purple-600', lightBg: 'bg-purple-50' };
      default:
        return { bg: 'bg-gray-500', border: 'border-gray-500', text: 'text-gray-600', lightBg: 'bg-gray-50' };
    }
  };

  const handleInvest = (investmentId: string) => {
    setSelectedInvestment(investmentId);
    setShowModal(true);
  };

  const handleSubmitInvestment = () => {
    console.log('Creating investment:', { selectedInvestment, investmentAmount });
    setShowModal(false);
    setInvestmentAmount('');
    setSelectedInvestment(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Header with Mascot */}
        <div className="mb-8 investment-header">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <img 
                src="/image.png" 
                alt="Investment Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Investments</h1>
              <p className="text-gray-600">Grow your wealth with our carefully curated investment options</p>
            </div>
          </div>
        </div>

        {/* Investment Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-primary-100 p-2 rounded-lg">
                <DollarSign className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Portfolio</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(getTotalInvestmentValue())}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Returns</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(getTotalReturns())}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Return Rate</p>
                <p className="text-2xl font-bold text-blue-600">{getReturnPercentage().toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Plans</p>
                <p className="text-2xl font-bold text-purple-600">{myInvestments.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Options */}
        <div className="mb-12 investment-options">
          <div className="flex items-center space-x-2 mb-6">
            <img src="/image.png" alt="Options Mascot" className="w-6 h-6" />
            <h2 className="text-2xl font-semibold text-gray-900">Investment Options</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {investmentOptions.map((option) => {
              const Icon = option.icon;
              const colors = getColorClasses(option.color);
              
              return (
                <div key={option.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="text-center mb-6">
                    <div className={`${colors.lightBg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative`}>
                      <Icon className={`h-8 w-8 ${colors.text}`} />
                      <div className="absolute -bottom-1 -right-1">
                        <img src="/image.png" alt="Investment Mascot" className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{option.name}</h3>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-2xl font-bold text-gray-900">{option.minReturn}%</span>
                      <span className="text-gray-500">-</span>
                      <span className="text-2xl font-bold text-gray-900">{option.maxReturn}%</span>
                    </div>
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      <span className={`px-2 py-1 rounded-full ${getRiskColor(option.risk)}`}>
                        {option.risk} Risk
                      </span>
                      <span className="text-gray-500">{option.duration}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-center mb-6">{option.description}</p>

                  <ul className="space-y-2 mb-6">
                    {option.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleInvest(option.id)}
                    className={`w-full ${colors.bg} hover:opacity-90 text-white py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105`}
                  >
                    <Plus className="h-5 w-5" />
                    <span>Invest Now</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Investments */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <img src="/image.png" alt="My Investments Mascot" className="w-6 h-6" />
                <h2 className="text-xl font-semibold text-gray-900">My Investments</h2>
              </div>
              <span className="text-sm text-gray-500">{myInvestments.length} active</span>
            </div>
            
            <div className="space-y-4">
              {myInvestments.map((investment) => (
                <div key={investment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{investment.name}</h3>
                      <p className="text-sm text-gray-500">Started {formatDate(investment.startDate)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Current Value</p>
                      <p className="font-semibold text-gray-900">{formatCurrency(investment.currentValue)}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Invested</p>
                      <p className="font-medium">{formatCurrency(investment.amount)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Returns</p>
                      <p className="font-medium text-green-600">+{investment.returns}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Maturity</p>
                      <p className="font-medium">{formatDate(investment.maturityDate)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                      Add More
                    </button>
                    <button className="px-4 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Trends */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <img src="/image.png" alt="Market Trends Mascot" className="w-6 h-6" />
                <h2 className="text-xl font-semibold text-gray-900">Market Trends</h2>
              </div>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {marketTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-gray-900">{trend.name}</p>
                    <div className="flex items-center space-x-2 text-sm">
                      {trend.change >= 0 ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                      )}
                      <span className={trend.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {trend.change >= 0 ? '+' : ''}{trend.change} ({trend.percentage >= 0 ? '+' : ''}{trend.percentage}%)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{trend.value.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Investment Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <div className="flex items-center space-x-2 mb-6">
                <img src="/image.png" alt="Invest Mascot" className="w-6 h-6" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Invest in {investmentOptions.find(option => option.id === selectedInvestment)?.name}
                </h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Amount
                  </label>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="₦0"
                  />
                  <p className="text-sm text-gray-500 mt-1">Minimum investment: ₦50,000</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Investment Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expected Return:</span>
                      <span className="font-medium">
                        {investmentOptions.find(option => option.id === selectedInvestment)?.minReturn}% - 
                        {investmentOptions.find(option => option.id === selectedInvestment)?.maxReturn}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Risk Level:</span>
                      <span className="font-medium">
                        {investmentOptions.find(option => option.id === selectedInvestment)?.risk}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">
                        {investmentOptions.find(option => option.id === selectedInvestment)?.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitInvestment}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Invest Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Tour Guide */}
      <UserTourGuide
        isVisible={tourState.isActive}
        onClose={closeTour}
        onComplete={completeTour}
        currentPage="investments"
      />
    </div>
  );
};

export default InvestmentPage;