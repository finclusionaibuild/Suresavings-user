// Utility functions to generate chart data for dashboards

export const generateRevenueData = (months: number = 12) => {
  const labels = [];
  const data = [];
  const currentDate = new Date();
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    labels.push(date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
    
    // Generate realistic revenue data with growth trend
    const baseRevenue = 1000000000; // 1B base
    const growth = Math.random() * 0.3 + 0.85; // 85-115% of base
    const seasonal = Math.sin((date.getMonth() / 12) * Math.PI * 2) * 0.1 + 1; // Seasonal variation
    data.push(Math.round(baseRevenue * growth * seasonal));
  }
  
  return { labels, data };
};

export const generateUserGrowthData = (months: number = 12) => {
  const labels = [];
  const data = [];
  const currentDate = new Date();
  let cumulativeUsers = 800000; // Starting user base
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    labels.push(date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
    
    // Generate realistic user growth
    const monthlyGrowth = Math.random() * 50000 + 20000; // 20k-70k new users per month
    cumulativeUsers += monthlyGrowth;
    data.push(Math.round(cumulativeUsers));
  }
  
  return { labels, data };
};

export const generateTransactionData = (days: number = 30) => {
  const labels = [];
  const data = [];
  const currentDate = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i);
    labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    
    // Generate realistic transaction volume
    const baseVolume = 150000; // Base daily transactions
    const weekdayMultiplier = date.getDay() === 0 || date.getDay() === 6 ? 0.7 : 1; // Lower on weekends
    const randomVariation = Math.random() * 0.4 + 0.8; // 80-120% variation
    data.push(Math.round(baseVolume * weekdayMultiplier * randomVariation));
  }
  
  return { labels, data };
};

export const generateRegionalData = () => {
  const regions = ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Others'];
  const data = [35.8, 24.2, 16.5, 13.9, 12.2, 7.4]; // Market share percentages
  const colors = [
    '#10B981', // Primary green
    '#3B82F6', // Blue
    '#8B5CF6', // Purple
    '#F59E0B', // Orange
    '#EF4444', // Red
    '#6B7280', // Gray
  ];
  
  return {
    labels: regions,
    data,
    colors,
  };
};

export const generateSavingsPlansData = () => {
  const plans = ['Flex Save', 'Fixed Save', 'Target Save', 'Premium Save'];
  const users = [452300, 284500, 521000, 87500];
  const amounts = [15200000000, 18700000000, 11300000000, 8500000000];
  
  return {
    labels: plans,
    users,
    amounts,
  };
};

export const generatePerformanceMetrics = () => {
  const metrics = ['API Response', 'Database', 'Error Rate', 'Memory Usage', 'CPU Usage', 'Storage'];
  const values = [45, 12, 0.02, 68, 45, 72];
  const targets = [100, 50, 0.1, 80, 70, 85];
  const statuses = ['excellent', 'excellent', 'excellent', 'good', 'excellent', 'good'];
  
  return {
    labels: metrics,
    values,
    targets,
    statuses,
  };
};

export const generateInvestmentPerformance = () => {
  const investments = ['Fixed Income', 'Mutual Funds', 'Stocks', 'Real Estate'];
  const returns = [15.2, 22.8, 28.5, 24.2];
  const amounts = [8500000000, 4200000000, 2800000000, 1500000000];
  const colors = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B'];
  
  return {
    labels: investments,
    returns,
    amounts,
    colors,
  };
};

export const generateComplianceData = () => {
  const categories = ['CBN Guidelines', 'NDIC Requirements', 'Data Protection', 'AML Guidelines', 'KYC Requirements'];
  const statuses = ['compliant', 'compliant', 'under_review', 'compliant', 'action_required'];
  const scores = [98, 96, 85, 94, 78];
  
  return {
    labels: categories,
    statuses,
    scores,
  };
};

export const generateTicketData = (days: number = 30) => {
  const labels = [];
  const openTickets = [];
  const resolvedTickets = [];
  const currentDate = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i);
    labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    
    // Generate realistic ticket data
    const baseOpen = 25;
    const baseResolved = 30;
    const variation = Math.random() * 0.4 + 0.8;
    
    openTickets.push(Math.round(baseOpen * variation));
    resolvedTickets.push(Math.round(baseResolved * variation));
  }
  
  return { labels, openTickets, resolvedTickets };
};

export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000000) {
    return `₦${(amount / 1000000000).toFixed(1)}B`;
  } else if (amount >= 1000000) {
    return `₦${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `₦${(amount / 1000).toFixed(1)}K`;
  }
  return `₦${amount.toLocaleString()}`;
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toLocaleString();
};