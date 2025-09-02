import React, { useState } from 'react';
import { useTour } from '../hooks/useTour';
import UserTourGuide from '../components/UserTourGuide';
import { Target, Clock, Zap, Plus, CheckCircle } from 'lucide-react';

const SavingsPlans: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [goalName, setGoalName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { tourState, startTour, completeTour, closeTour, shouldShowTour } = useTour();

  // Start tour for first-time users
  React.useEffect(() => {
    if (shouldShowTour('savings')) {
      setTimeout(() => startTour('savings'), 500);
    }
  }, []);

  const savingsPlans = [
    {
      id: 'flex',
      name: 'Flex Save',
      icon: Zap,
      rate: '10%',
      description: 'Save with complete flexibility. Withdraw anytime without penalties.',
      features: [
        'No minimum balance required',
        'Withdraw anytime',
        '10% per annum interest',
        'No lock-in period',
        'Perfect for emergency funds'
      ],
      color: 'primary',
      popular: false
    },
    {
      id: 'fixed',
      name: 'Fixed Save',
      icon: Clock,
      rate: '15%',
      description: 'Lock your money for higher returns. Best for disciplined savers.',
      features: [
        'Up to 15% per annum',
        '6-12 month terms available',
        'Higher interest rates',
        'Automatic renewals',
        'Penalty for early withdrawal'
      ],
      color: 'secondary',
      popular: true
    },
    {
      id: 'target',
      name: 'Target Save',
      icon: Target,
      rate: '13%',
      description: 'Save towards specific goals with automated contributions.',
      features: [
        'Goal-oriented savings',
        'Automated contributions',
        '13% per annum interest',
        'Milestone rewards',
        'Progress tracking'
      ],
      color: 'accent',
      popular: false
    }
  ];

  const myActivePlans = [
    {
      id: 1,
      type: 'fixed',
      name: 'Fixed Save Plan',
      balance: 150000,
      rate: 15,
      startDate: '2024-10-01',
      maturityDate: '2025-04-01',
      status: 'active'
    },
    {
      id: 2,
      type: 'target',
      name: 'Vacation Fund',
      balance: 285000,
      target: 500000,
      rate: 13,
      deadline: '2025-06-30',
      status: 'active'
    },
    {
      id: 3,
      type: 'flex',
      name: 'Emergency Fund',
      balance: 75000,
      rate: 10,
      lastDeposit: '2025-01-10',
      status: 'active'
    }
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

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-primary-500',
          border: 'border-primary-500',
          text: 'text-primary-600',
          lightBg: 'bg-primary-50'
        };
      case 'secondary':
        return {
          bg: 'bg-secondary-500',
          border: 'border-secondary-500',
          text: 'text-secondary-600',
          lightBg: 'bg-secondary-50'
        };
      case 'accent':
        return {
          bg: 'bg-accent-500',
          border: 'border-accent-500',
          text: 'text-accent-600',
          lightBg: 'bg-accent-50'
        };
      default:
        return {
          bg: 'bg-gray-500',
          border: 'border-gray-500',
          text: 'text-gray-600',
          lightBg: 'bg-gray-50'
        };
    }
  };

  const handleStartPlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowModal(true);
  };

  const handleSubmitPlan = () => {
    console.log('Creating plan:', { selectedPlan, amount, duration, goalName });
    setShowModal(false);
    setAmount('');
    setDuration('');
    setGoalName('');
    setSelectedPlan(null);
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Header with Mascot */}
        <div className="mb-8 savings-header">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <img 
                src="/image.png" 
                alt="Savings Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Savings Plans</h1>
              <p className="text-gray-600">Choose the perfect savings plan to achieve your financial goals</p>
            </div>
          </div>
        </div>

        {/* Available Plans */}
        <div className="mb-12 plan-options">
          <div className="flex items-center space-x-2 mb-6">
            <img src="/image.png" alt="Plans Mascot" className="w-6 h-6" />
            <h2 className="text-2xl font-semibold text-gray-900">Available Plans</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savingsPlans.map((plan) => {
              const Icon = plan.icon;
              const colors = getColorClasses(plan.color);
              
              return (
                <div key={plan.id} className="relative bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <img src="/image.png" alt="Popular" className="w-3 h-3" />
                        <span>Most Popular</span>
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <div className={`${colors.lightBg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative`}>
                      <Icon className={`h-8 w-8 ${colors.text}`} />
                      <div className="absolute -bottom-1 -right-1">
                        <img src="/image.png" alt="Plan Mascot" className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-gray-900 mb-1">{plan.rate}</div>
                    <p className="text-gray-600 text-sm">per annum</p>
                  </div>

                  <p className="text-gray-600 text-center mb-6">{plan.description}</p>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleStartPlan(plan.id)}
                    className={`w-full ${colors.bg} hover:opacity-90 text-white py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105`}
                  >
                    <Plus className="h-5 w-5" />
                    <span>Start Plan</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Plans */}
        <div className="active-plans">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <img src="/image.png" alt="Active Plans Mascot" className="w-6 h-6" />
              <h2 className="text-2xl font-semibold text-gray-900">My Active Plans</h2>
            </div>
            <span className="text-sm text-gray-500">{myActivePlans.length} active plans</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myActivePlans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-900">{plan.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {plan.rate}% p.a.
                    </span>
                    <img src="/image.png" alt="Plan Status" className="w-3 h-3" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Current Balance</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(plan.balance)}</p>
                  </div>

                  {plan.type === 'target' && plan.target && (
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>{Math.round(getProgressPercentage(plan.balance, plan.target))}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getProgressPercentage(plan.balance, plan.target)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Target: {formatCurrency(plan.target)} by {formatDate(plan.deadline!)}
                      </p>
                    </div>
                  )}

                  {plan.type === 'fixed' && (
                    <div>
                      <p className="text-sm text-gray-600">Maturity Date</p>
                      <p className="text-sm font-medium text-gray-900">{formatDate(plan.maturityDate!)}</p>
                    </div>
                  )}

                  {plan.type === 'flex' && (
                    <div>
                      <p className="text-sm text-gray-600">Last Deposit</p>
                      <p className="text-sm font-medium text-gray-900">{formatDate(plan.lastDeposit!)}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex space-x-2">
                  <button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    Add Money
                  </button>
                  <button className="px-4 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for creating new plan */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <div className="flex items-center space-x-2 mb-6">
                <img src="/image.png" alt="Create Plan Mascot" className="w-6 h-6" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Start {savingsPlans.find(p => p.id === selectedPlan)?.name}
                </h3>
              </div>
              
              <div className="space-y-4">
                {selectedPlan === 'target' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Goal Name
                    </label>
                    <input
                      type="text"
                      value={goalName}
                      onChange={(e) => setGoalName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Vacation Fund"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {selectedPlan === 'target' ? 'Target Amount' : 'Initial Amount'}
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="₦0"
                  />
                </div>

                {selectedPlan !== 'flex' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {selectedPlan === 'fixed' ? 'Lock Period' : 'Target Date'}
                    </label>
                    {selectedPlan === 'fixed' ? (
                      <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Select duration</option>
                        <option value="6">6 months</option>
                        <option value="12">12 months</option>
                        <option value="24">24 months</option>
                      </select>
                    ) : (
                      <input
                        type="date"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    )}
                  </div>
                )}
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitPlan}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Create Plan
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
        currentPage="savings"
      />
    </div>
  );
};

export default SavingsPlans;