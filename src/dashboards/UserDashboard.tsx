import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Paper,
  useTheme,
} from '@mui/material';
import { TrendingUp, Target, Trophy as EmojiEvents, Plus as Add, Eye as Visibility, EyeOff as VisibilityOff, ArrowUp as ArrowUpward, ArrowDown as ArrowDownward, Building as AccountBalance, TrendingUp as Timeline, Sparkles, Gift, Heart } from 'lucide-react';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import { generateRevenueData, generateTransactionData } from '../utils/chartData';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [showBalances, setShowBalances] = useState(true);
  const theme = useTheme();

  const quickActions = [
    { icon: Add, label: 'Quick Save', action: 'save', color: 'primary', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
    { icon: TrendingUp, label: 'Invest', action: 'invest', color: 'secondary', gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' },
    { icon: Target, label: 'Set Goal', action: 'goal', color: 'info', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' },
    { icon: EmojiEvents, label: 'Refer & Earn', action: 'refer', color: 'success', gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
  ];

  const recentTransactions = [
    { id: 1, type: 'credit', description: 'Monthly Auto-Save', amount: 25000, date: '2025-01-15', status: 'completed' },
    { id: 2, type: 'debit', description: 'Investment Purchase', amount: 50000, date: '2025-01-12', status: 'completed' },
    { id: 3, type: 'credit', description: 'Interest Payment', amount: 5200, date: '2025-01-10', status: 'completed' },
    { id: 4, type: 'credit', description: 'Target Goal Save', amount: 15000, date: '2025-01-08', status: 'completed' },
  ];

  const savingsGoals = [
    { id: 1, name: 'Vacation Fund', target: 500000, current: 285000, deadline: '2025-06-30' },
    { id: 2, name: 'Emergency Fund', target: 1000000, current: 750000, deadline: '2025-12-31' },
    { id: 3, name: 'New Car', target: 2000000, current: 450000, deadline: '2026-03-15' },
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

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  // Generate chart data
  const savingsData = generateRevenueData(6);
  const transactionData = generateTransactionData(14);

  const savingsChartData = {
    labels: savingsData.labels,
    datasets: [
      {
        label: 'Savings Growth',
        data: savingsData.data.map(val => val / 10000000),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const transactionChartData = {
    labels: transactionData.labels,
    datasets: [
      {
        label: 'Transactions',
        data: transactionData.data,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 3 }}>
      <Container maxWidth="xl">
        {/* Welcome Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ position: 'relative' }}>
              <img 
                src="/image.png" 
                alt="Welcome Mascot" 
                style={{ 
                  width: 48, 
                  height: 48,
                  filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))'
                }}
                className="animate-float"
              />
              <Box sx={{
                position: 'absolute',
                top: -4,
                right: -4,
                width: 16,
                height: 16,
                bgcolor: 'warning.main',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={8} color="white" />
              </Box>
            </Box>
            <Box>
              <Typography variant="h3" fontWeight="bold" sx={{ 
                background: 'linear-gradient(135deg, #10b981, #059669)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Welcome back, {user?.firstName}! 👋
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Here's your financial overview for today
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Balance Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              borderRadius: 4,
              boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.3)',
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <img src="/image.png" alt="Savings Mascot" style={{ width: 20, height: 20 }} />
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Total Savings
                    </Typography>
                  </Box>
                  <IconButton 
                    onClick={() => setShowBalances(!showBalances)}
                    sx={{ color: 'white' }}
                    size="small"
                  >
                    {showBalances ? <VisibilityOff size={16} /> : <Visibility size={16} />}
                  </IconButton>
                </Box>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                  {showBalances ? formatCurrency(user?.totalSavings || 0) : '****'}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ArrowUpward size={16} />
                  <Typography variant="body2">+12.5% this month</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: 'white',
              borderRadius: 4,
              boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.3)',
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <TrendingUp size={20} />
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Investments
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                  {showBalances ? formatCurrency(user?.totalInvestments || 0) : '****'}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ArrowUpward size={16} />
                  <Typography variant="body2">+8.2% this month</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: 'white',
              borderRadius: 4,
              boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.3)',
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <EmojiEvents size={20} />
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Reward Points
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                  {user?.rewardPoints?.toLocaleString() || 0}
                </Typography>
                <Typography variant="body2">
                  Redeem for savings bonus
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Card sx={{ mb: 4, borderRadius: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <img src="/image.png" alt="Actions Mascot" style={{ width: 24, height: 24 }} />
              <Typography variant="h5" fontWeight="semibold">
                Quick Actions
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Grid item xs={6} md={3} key={index}>
                    <Paper
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        cursor: 'pointer',
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        border: '1px solid',
                        borderColor: 'grey.200',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                          borderColor: 'primary.main',
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          background: action.gradient,
                          width: 64,
                          height: 64,
                          mx: 'auto',
                          mb: 2,
                          boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.15)',
                        }}
                      >
                        <Icon size={28} />
                      </Avatar>
                      <Typography variant="body2" fontWeight="medium">
                        {action.label}
                      </Typography>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          {/* Savings Goals */}
          <Grid item xs={12} lg={6}>
            <Card sx={{ height: '100%', borderRadius: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img src="/image.png" alt="Goals Mascot" style={{ width: 24, height: 24 }} />
                    <Typography variant="h5" fontWeight="semibold">
                      Savings Goals
                    </Typography>
                  </Box>
                  <Button size="small" color="primary" sx={{ borderRadius: 2 }}>
                    View All
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {savingsGoals.map((goal) => (
                    <Paper key={goal.id} variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="body1" fontWeight="medium">
                          {goal.name}
                        </Typography>
                        <Chip 
                          label={formatDate(goal.deadline)}
                          size="small"
                          variant="outlined"
                          sx={{ borderRadius: 2 }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          {formatCurrency(goal.current)} of {formatCurrency(goal.target)}
                        </Typography>
                        <Typography variant="body2" fontWeight="medium" color="primary.main">
                          {Math.round(getProgressPercentage(goal.current, goal.target))}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={getProgressPercentage(goal.current, goal.target)}
                        sx={{ 
                          height: 10, 
                          borderRadius: 5,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 5,
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                          }
                        }}
                      />
                    </Paper>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Transactions */}
          <Grid item xs={12} lg={6}>
            <Card sx={{ height: '100%', borderRadius: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img src="/image.png" alt="Transactions Mascot" style={{ width: 24, height: 24 }} />
                    <Typography variant="h5" fontWeight="semibold">
                      Recent Transactions
                    </Typography>
                  </Box>
                  <Button size="small" color="primary" sx={{ borderRadius: 2 }}>
                    View All
                  </Button>
                </Box>
                <List sx={{ p: 0 }}>
                  {recentTransactions.map((transaction) => (
                    <ListItem key={transaction.id} sx={{ px: 0, py: 2, borderBottom: '1px solid', borderColor: 'grey.100' }}>
                      <ListItemIcon>
                        <Avatar
                          sx={{
                            bgcolor: transaction.type === 'credit' ? 'success.light' : 'error.light',
                            color: transaction.type === 'credit' ? 'success.dark' : 'error.dark',
                            width: 44,
                            height: 44,
                          }}
                        >
                          {transaction.type === 'credit' ? <ArrowDownward size={20} /> : <ArrowUpward size={20} />}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body1" fontWeight="medium">
                            {transaction.description}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            {formatDate(transaction.date)}
                          </Typography>
                        }
                      />
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography
                          variant="body1"
                          fontWeight="semibold"
                          color={transaction.type === 'credit' ? 'success.main' : 'error.main'}
                        >
                          {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </Typography>
                        <Chip
                          label={transaction.status}
                          size="small"
                          color="success"
                          variant="outlined"
                          sx={{ mt: 0.5, borderRadius: 2 }}
                        />
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Performance Chart */}
        <Card sx={{ mt: 4, borderRadius: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <img src="/image.png" alt="Performance Mascot" style={{ width: 24, height: 24 }} />
              <Typography variant="h5" fontWeight="semibold">
                Savings Performance
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ height: 300 }}>
                  <LineChart data={savingsChartData} height={300} />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ height: 300 }}>
                  <BarChart data={transactionChartData} height={300} />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default UserDashboard;