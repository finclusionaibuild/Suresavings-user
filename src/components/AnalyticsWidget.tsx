import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Target, Award, Calendar } from 'lucide-react';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';

interface AnalyticsWidgetProps {
  timeframe?: 'week' | 'month' | 'quarter' | 'year';
}

const AnalyticsWidget: React.FC<AnalyticsWidgetProps> = ({ timeframe = 'month' }) => {
  const analyticsData = {
    totalSavings: 275000,
    totalInvestments: 150000,
    monthlyGrowth: 12.5,
    savingsGoalProgress: 68,
    interestEarned: 8750,
    transactionCount: 24
  };

  const savingsGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Savings Growth',
        data: [180000, 195000, 210000, 235000, 255000, 275000],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const categoryBreakdownData = {
    labels: ['Flex Save', 'Fixed Save', 'Target Save', 'Investments'],
    datasets: [
      {
        label: 'Amount (₦)',
        data: [125000, 85000, 65000, 150000],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(245, 158, 11, 0.7)'
        ],
        borderWidth: 0,
      }
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <img src="/image.png" alt="Analytics Mascot" className="w-6 h-6" />
        <h2 className="text-xl font-semibold text-gray-900">Financial Analytics</h2>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Growth Rate</span>
          </div>
          <p className="text-2xl font-bold text-green-900">+{analyticsData.monthlyGrowth}%</p>
          <p className="text-xs text-green-700">This month</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Goal Progress</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">{analyticsData.savingsGoalProgress}%</p>
          <p className="text-xs text-blue-700">Average completion</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Award className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Interest Earned</span>
          </div>
          <p className="text-2xl font-bold text-purple-900">{formatCurrency(analyticsData.interestEarned)}</p>
          <p className="text-xs text-purple-700">This year</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Savings Growth Trend</h3>
          <LineChart data={savingsGrowthData} height={200} />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Breakdown</h3>
          <BarChart data={categoryBreakdownData} height={200} />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Total Portfolio Value</p>
          <p className="text-xl font-bold text-gray-900">
            {formatCurrency(analyticsData.totalSavings + analyticsData.totalInvestments)}
          </p>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Monthly Transactions</p>
          <p className="text-xl font-bold text-gray-900">{analyticsData.transactionCount}</p>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Avg Monthly Growth</p>
          <p className="text-xl font-bold text-green-600">+{analyticsData.monthlyGrowth}%</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsWidget;