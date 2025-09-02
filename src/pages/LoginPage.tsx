import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, AlertCircle, Users, Shield, Crown, Star, Copy, Check, UserCheck, Code } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Agent Users
  const agentAccounts = {
    category: 'Agent Users',
    icon: UserCheck,
    color: 'bg-green-500',
    accounts: [
      {
        email: 'agent@suresavings.com',
        password: 'demo123',
        name: 'Agent Manager',
        description: 'Field agent managing group savings and collections',
        features: ['₦350,000 savings', '₦150,000 investments', '25 referrals managed']
      },
      {
        email: 'fieldagent@suresavings.com',
        password: 'demo123',
        name: 'Field Agent',
        description: 'Community agent handling local collections',
        features: ['₦180,000 savings', '₦75,000 investments', '15 groups managed']
      }
    ]
  };

  // Group Savings Admin
  const groupAdminAccounts = {
    category: 'Group Savings Admin',
    icon: Users,
    color: 'bg-indigo-500',
    accounts: [
      {
        email: 'groupadmin@suresavings.com',
        password: 'demo123',
        name: 'Group Savings Admin',
        description: 'Specialized admin for Esusu/Ajo group management',
        features: ['45 active groups', '₦125M total collections', 'Regional oversight']
      }
    ]
  };

  // Developer Account
  const developerAccounts = {
    category: 'Developer Account',
    icon: Code,
    color: 'bg-gray-800',
    accounts: [
      {
        email: 'developer@suresavings.com',
        password: 'demo123',
        name: 'Developer User',
        description: 'Developer account with API access and technical tools',
        features: ['API documentation', 'Integration tools', 'Technical support']
      }
    ]
  };

  const demoAccounts = [
    {
      category: 'Regular Users',
      icon: Users,
      color: 'bg-blue-500',
      accounts: [
        {
          email: 'user@suresavings.com',
          password: 'demo123',
          name: 'John Doe',
          description: 'Basic user with KYC Tier 1',
          features: ['₦125,000 savings', '₦50,000 investments', '850 reward points']
        },
        {
          email: 'premium@suresavings.com',
          password: 'demo123',
          name: 'Sarah Johnson',
          description: 'Premium user with full KYC verification',
          features: ['₦750,000 savings', '₦450,000 investments', '2,850 reward points']
        },
        {
          email: 'newuser@suresavings.com',
          password: 'demo123',
          name: 'Michael Chen',
          description: 'New user with pending KYC',
          features: ['₦15,000 savings', 'No investments yet', '100 welcome points']
        },
        {
          email: 'investor@suresavings.com',
          password: 'demo123',
          name: 'Amina Bello',
          description: 'High net worth investor',
          features: ['₦2.5M savings', '₦1.8M investments', '8,750 reward points']
        }
      ]
    },
    {
      category: 'Admin Users',
      icon: Shield,
      color: 'bg-purple-500',
      accounts: [
        {
          email: 'support@suresavings.com',
          password: 'demo123',
          name: 'David Support',
          description: 'Customer support admin',
          features: ['User management', 'Transaction support', 'KYC verification']
        },
        {
          email: 'admin@suresavings.com',
          password: 'demo123',
          name: 'Admin User',
          description: 'Regional admin with full access',
          features: ['Full admin dashboard', 'User management', 'Analytics & reports']
        }
      ]
    },
    agentAccounts,
    groupAdminAccounts,
    developerAccounts,
    {
      category: 'Super Admin',
      icon: Crown,
      color: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      accounts: [
        {
          email: 'superadmin@suresavings.com',
          password: 'demo123',
          name: 'Super Admin',
          description: 'Platform-wide super administrator',
          features: ['Complete platform control', 'System configuration', 'Global analytics']
        }
      ]
    }
  ];
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Use demo accounts below or password "demo123"');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (accountEmail: string, accountPassword: string) => {
    setEmail(accountEmail);
    setPassword(accountPassword);
    
    // Automatically login after setting the credentials
    setIsLoading(true);
    setError('');

    try {
      const success = await login(accountEmail, accountPassword);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Failed to login with demo account. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAccount(`${type}-${text}`);
      setTimeout(() => setCopiedAccount(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-3 mb-8">
            <div className="bg-primary-500 p-3 rounded-xl shadow-glow-primary">
              <img 
                src="/image.png" 
                alt="SureSavings Mascot" 
                className="h-8 w-8"
              />
            </div>
            <div className="text-left">
              <span className="text-2xl font-bold text-gray-900">SureSavings</span>
              <div className="text-sm text-gray-500 font-medium">Smart Savings Platform</div>
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
          <p className="text-gray-600">Sign in to your account or try our demo accounts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Login Form */}
          <div className="bg-white rounded-xl shadow-xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Sign In</h3>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="text-red-700">{error}</span>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-primary-600 hover:text-primary-500">
                  Forgot your password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>

          {/* Demo Accounts */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Star className="h-5 w-5 text-yellow-500" />
                <h3 className="text-xl font-semibold text-gray-900">Demo Accounts</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Try different user types and features with our pre-configured demo accounts.
              </p>

              <div className="space-y-6">
                {demoAccounts.map((category, categoryIndex) => {
                  const Icon = category.icon;
                  return (
                    <div key={categoryIndex} className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className={`${category.color} p-2 rounded-lg`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <h4 className="font-semibold text-gray-900">{category.category}</h4>
                      </div>
                      
                      <div className="space-y-3 ml-6">
                        {category.accounts.map((account, accountIndex) => (
                          <div key={accountIndex} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h5 className="font-medium text-gray-900">{account.name}</h5>
                                <p className="text-sm text-gray-600">{account.description}</p>
                              </div>
                              <button
                                onClick={() => handleQuickLogin(account.email, account.password)}
                                className="px-3 py-1 bg-primary-500 hover:bg-primary-600 text-white text-xs rounded-lg transition-colors"
                              >
                                Quick Login
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 mb-3">
                              <div className="flex items-center space-x-1">
                                <span className="text-xs text-gray-500">Email:</span>
                                <code className="text-xs bg-gray-100 px-1 rounded">{account.email}</code>
                                <button
                                  onClick={() => copyToClipboard(account.email, 'email')}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  {copiedAccount === `email-${account.email}` ? (
                                    <Check className="h-3 w-3 text-green-500" />
                                  ) : (
                                    <Copy className="h-3 w-3" />
                                  )}
                                </button>
                              </div>
                              <div className="flex items-center space-x-1">
                                <span className="text-xs text-gray-500">Password:</span>
                                <code className="text-xs bg-gray-100 px-1 rounded">{account.password}</code>
                                <button
                                  onClick={() => copyToClipboard(account.password, 'password')}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  {copiedAccount === `password-${account.password}` ? (
                                    <Check className="h-3 w-3 text-green-500" />
                                  ) : (
                                    <Copy className="h-3 w-3" />
                                  )}
                                </button>
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              {account.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center space-x-2">
                                  <div className="w-1 h-1 bg-primary-500 rounded-full"></div>
                                  <span className="text-xs text-gray-600">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white">
              <h4 className="font-semibold mb-2">Universal Password</h4>
              <p className="text-sm text-primary-100 mb-3">
                All demo accounts use the same password for easy testing:
              </p>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-lg p-3">
                <code className="text-lg font-mono">demo123</code>
                <button
                  onClick={() => copyToClipboard('demo123', 'universal')}
                  className="text-white hover:text-primary-100"
                >
                  {copiedAccount === 'universal-demo123' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;