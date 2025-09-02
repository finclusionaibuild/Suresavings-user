import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Play, CheckCircle, Sparkles, Target, Eye } from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  action?: string;
}

interface UserTourGuideProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: () => void;
  currentPage: string;
}

const UserTourGuide: React.FC<UserTourGuideProps> = ({ 
  isVisible, 
  onClose, 
  onComplete, 
  currentPage 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const tourSteps: Record<string, TourStep[]> = {
    dashboard: [
      {
        id: 'welcome',
        title: '🎉 Welcome to SureSavings!',
        description: 'Let\'s take a quick tour to help you get started with your savings journey. This dashboard is your financial command center.',
        target: '.dashboard-header',
        position: 'bottom'
      },
      {
        id: 'balance-cards',
        title: '💰 Your Financial Overview',
        description: 'These cards show your total savings, investments, and reward points. Click the eye icon to hide/show your balances for privacy.',
        target: '.balance-cards',
        position: 'bottom'
      },
      {
        id: 'quick-actions',
        title: '⚡ Quick Actions',
        description: 'Use these buttons for common tasks like saving money, investing, setting goals, and referring friends. They\'re designed for speed and convenience.',
        target: '.quick-actions',
        position: 'top'
      },
      {
        id: 'savings-goals',
        title: '🎯 Savings Goals',
        description: 'Track your progress toward specific financial goals. Set targets, monitor progress, and celebrate milestones as you build wealth.',
        target: '.savings-goals',
        position: 'right'
      },
      {
        id: 'transactions',
        title: '📊 Recent Transactions',
        description: 'Keep track of all your financial activities. Every deposit, withdrawal, and interest payment is recorded here for transparency.',
        target: '.recent-transactions',
        position: 'left'
      }
    ],
    savings: [
      {
        id: 'savings-intro',
        title: '🏦 Savings Plans Overview',
        description: 'Choose from our carefully designed savings plans. Each plan offers different benefits, interest rates, and flexibility levels.',
        target: '.savings-header',
        position: 'bottom'
      },
      {
        id: 'plan-options',
        title: '📋 Available Plans',
        description: 'Compare our savings plans: Flex Save for flexibility, Fixed Save for higher returns, and Target Save for goal-oriented saving.',
        target: '.plan-options',
        position: 'top'
      },
      {
        id: 'active-plans',
        title: '✅ Your Active Plans',
        description: 'Monitor your current savings plans, track progress, and manage your money. Add funds or check details anytime.',
        target: '.active-plans',
        position: 'top'
      }
    ],
    investments: [
      {
        id: 'investment-intro',
        title: '📈 Investment Opportunities',
        description: 'Grow your wealth with our professionally managed investment options. Choose based on your risk tolerance and return expectations.',
        target: '.investment-header',
        position: 'bottom'
      },
      {
        id: 'investment-options',
        title: '💼 Investment Categories',
        description: 'Fixed Income for stability, Mutual Funds for balanced growth, and Stocks for higher potential returns. Each has different risk levels.',
        target: '.investment-options',
        position: 'top'
      }
    ],
    profile: [
      {
        id: 'profile-intro',
        title: '👤 Your Profile Center',
        description: 'Manage your personal information, security settings, and account preferences. Keep your details updated for the best experience.',
        target: '.profile-header',
        position: 'bottom'
      },
      {
        id: 'kyc-status',
        title: '🔐 KYC Verification',
        description: 'Complete your KYC verification to unlock higher transaction limits and access premium features. It\'s secure and takes just a few minutes.',
        target: '.kyc-section',
        position: 'right'
      }
    ]
  };

  const currentTourSteps = tourSteps[currentPage] || [];

  useEffect(() => {
    if (isVisible && currentTourSteps.length > 0) {
      setCurrentStep(0);
    }
  }, [isVisible, currentPage]);

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      if (currentStep < currentTourSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        onComplete();
      }
      setIsAnimating(false);
    }, 300);
  };

  const handlePrevious = () => {
    setIsAnimating(true);
    setTimeout(() => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
      setIsAnimating(false);
    }, 300);
  };

  const handleSkip = () => {
    onComplete();
  };

  if (!isVisible || currentTourSteps.length === 0) return null;

  const currentStepData = currentTourSteps[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 pointer-events-auto">
        {/* Tour Modal */}
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-60">
          <div className={`bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 transition-all duration-300 ${
            isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src="/image.png" 
                    alt="Tour Guide Mascot" 
                    className="w-10 h-10 animate-bounce"
                    style={{ filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))' }}
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{currentStepData.title}</h3>
                  <p className="text-sm text-gray-500">
                    Step {currentStep + 1} of {currentTourSteps.length}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Progress</span>
                <span>{Math.round(((currentStep + 1) / currentTourSteps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((currentStep + 1) / currentTourSteps.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Content */}
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed text-base">
                {currentStepData.description}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>
                
                <button
                  onClick={handleSkip}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Skip Tour
                </button>
              </div>

              <button
                onClick={handleNext}
                className="flex items-center space-x-2 px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
              >
                <span>{currentStep === currentTourSteps.length - 1 ? 'Finish' : 'Next'}</span>
                {currentStep === currentTourSteps.length - 1 ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Spotlight Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full">
            {/* This would highlight the target element */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-30"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTourGuide;