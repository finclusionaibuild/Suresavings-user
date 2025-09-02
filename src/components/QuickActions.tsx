import React, { useState } from 'react';
import { 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  Target, 
  Users, 
  TrendingUp, 
  Gift, 
  CreditCard,
  Zap,
  DollarSign,
  X
} from 'lucide-react';

interface QuickActionsProps {
  onActionComplete?: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionComplete }) => {
  const [showQuickSaveModal, setShowQuickSaveModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('flex');

  const quickActions = [
    {
      id: 'quick-save',
      label: 'Quick Save',
      description: 'Save money instantly',
      icon: Plus,
      color: 'bg-primary-500 hover:bg-primary-600',
      action: () => setShowQuickSaveModal(true)
    },
    {
      id: 'withdraw',
      label: 'Withdraw',
      description: 'Withdraw to bank account',
      icon: ArrowUpRight,
      color: 'bg-red-500 hover:bg-red-600',
      action: () => setShowWithdrawModal(true)
    },
    {
      id: 'deposit',
      label: 'Deposit',
      description: 'Add money to wallet',
      icon: ArrowDownRight,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => setShowDepositModal(true)
    },
    {
      id: 'set-goal',
      label: 'Set Goal',
      description: 'Create savings target',
      icon: Target,
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => console.log('Set Goal')
    },
    {
      id: 'refer-friend',
      label: 'Refer Friend',
      description: 'Earn referral bonus',
      icon: Users,
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => console.log('Refer Friend')
    },
    {
      id: 'invest',
      label: 'Invest',
      description: 'Start investing today',
      icon: TrendingUp,
      color: 'bg-orange-500 hover:bg-orange-600',
      action: () => console.log('Invest')
    }
  ];

  const handleQuickSave = () => {
    console.log('Quick Save:', { amount, plan: selectedPlan });
    setShowQuickSaveModal(false);
    setAmount('');
    onActionComplete?.('quick-save');
  };

  const handleWithdraw = () => {
    console.log('Withdraw:', { amount });
    setShowWithdrawModal(false);
    setAmount('');
    onActionComplete?.('withdraw');
  };

  const handleDeposit = () => {
    console.log('Deposit:', { amount });
    setShowDepositModal(false);
    setAmount('');
    onActionComplete?.('deposit');
  };

  return (
    <>
      <div className="quick-actions bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="relative">
            <img 
              src="/image.png" 
              alt="Quick Actions Mascot" 
              className="w-6 h-6 animate-bounce"
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={action.action}
                className={`${action.color} text-white p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group`}
              >
                <div className="text-center">
                  <Icon className="w-8 h-8 mx-auto mb-2 group-hover:animate-bounce" />
                  <p className="font-medium text-sm">{action.label}</p>
                  <p className="text-xs opacity-90">{action.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Save Modal */}
      {showQuickSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Plus className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Quick Save</h3>
              </div>
              <button
                onClick={() => setShowQuickSaveModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Savings Plan</label>
                <select
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="flex">Flex Save (10% p.a.)</option>
                  <option value="fixed">Fixed Save (15% p.a.)</option>
                  <option value="target">Target Save (13% p.a.)</option>
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowQuickSaveModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleQuickSave}
                  disabled={!amount}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium disabled:opacity-50 transition-colors"
                >
                  Save Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <ArrowUpRight className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Withdraw Funds</h3>
              </div>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="0"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Available balance: ₦125,000</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account</label>
                <select className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>GTBank - 0123456789</option>
                  <option>Access Bank - 9876543210</option>
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleWithdraw}
                  disabled={!amount}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium disabled:opacity-50 transition-colors"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <ArrowDownRight className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Deposit Funds</h3>
              </div>
              <button
                onClick={() => setShowDepositModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <select className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>Bank Transfer</option>
                  <option>Debit Card</option>
                  <option>USSD</option>
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowDepositModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeposit}
                  disabled={!amount}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium disabled:opacity-50 transition-colors"
                >
                  Deposit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActions;