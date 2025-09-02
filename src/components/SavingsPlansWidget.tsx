import React, { useState } from 'react';
import { Target, Home, Zap, Shield, FileText as Flex, DollarSign, Plus, Eye, TrendingUp, Clock, CheckCircle, ArrowRight } from 'lucide-react';

interface SavingsPlansWidgetProps {
  onPlanSelect?: (planId: string) => void;
}

const SavingsPlansWidget: React.FC<SavingsPlansWidgetProps> = ({ onPlanSelect }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const savingsPlans = [
    {
      id: 'sure-kolo',
      name: 'Sure Kolo',
      description: 'Traditional rotating savings (Esusu/Ajo)',
      icon: Target,
      rate: '12%',
      minAmount: 5000,
      features: ['Group savings', 'Rotating payouts', 'Community support'],
      color: 'bg-gradient-to-br from-green-400 to-green-600',
      popular: false
    },
    {
      id: 'sure-housing',
      name: 'Sure Housing',
      description: 'Save towards your dream home',
      icon: Home,
      rate: '14%',
      minAmount: 50000,
      features: ['Real estate focused', 'Higher returns', 'Property advisory'],
      color: 'bg-gradient-to-br from-blue-400 to-blue-600',
      popular: true
    },
    {
      id: 'sure-goal',
      name: 'Sure Goal',
      description: 'Goal-oriented savings with milestones',
      icon: Target,
      rate: '13%',
      minAmount: 10000,
      features: ['Goal tracking', 'Milestone rewards', 'Auto-save'],
      color: 'bg-gradient-to-br from-purple-400 to-purple-600',
      popular: false
    },
    {
      id: 'sure-safe',
      name: 'Sure Safe',
      description: 'Ultra-secure emergency fund',
      icon: Shield,
      rate: '11%',
      minAmount: 1000,
      features: ['Emergency access', 'High security', 'Instant withdrawal'],
      color: 'bg-gradient-to-br from-red-400 to-red-600',
      popular: false
    },
    {
      id: 'sure-flex',
      name: 'Sure Flex',
      description: 'Maximum flexibility savings',
      icon: Zap,
      rate: '10%',
      minAmount: 1000,
      features: ['No lock period', 'Anytime withdrawal', 'Daily interest'],
      color: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
      popular: false
    },
    {
      id: 'sure-usd',
      name: 'Sure USD',
      description: 'Save in US Dollars',
      icon: DollarSign,
      rate: '8%',
      minAmount: 100, // USD
      features: ['USD denominated', 'Forex protection', 'International access'],
      color: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
      popular: true
    }
  ];

  const formatCurrency = (amount: number, currency: string = 'NGN') => {
    if (currency === 'USD') {
      return `$${amount.toLocaleString()}`;
    }
    return `₦${amount.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <img src="/image.png" alt="Savings Plans Mascot" className="w-6 h-6" />
          <h2 className="text-xl font-semibold text-gray-900">Savings Plans</h2>
        </div>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          View All Plans
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savingsPlans.map((plan) => {
          const Icon = plan.icon;
          return (
            <div
              key={plan.id}
              className="relative border border-gray-200 rounded-xl p-4 hover:border-primary-300 hover:shadow-md transition-all duration-300 cursor-pointer group"
              onClick={() => {
                setSelectedPlan(plan.id);
                onPlanSelect?.(plan.id);
              }}
            >
              {plan.popular && (
                <div className="absolute -top-2 right-4 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Popular
                </div>
              )}
              
              <div className="flex items-center space-x-3 mb-3">
                <div className={`${plan.color} p-2 rounded-lg text-white`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                  <p className="text-lg font-bold text-primary-600">{plan.rate} p.a.</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
              
              <div className="space-y-2 mb-4">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Min: {formatCurrency(plan.minAmount, plan.id === 'sure-usd' ? 'USD' : 'NGN')}
                </span>
                <ArrowRight className="w-4 h-4 text-primary-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavingsPlansWidget;