import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  TrendingUp, 
  Users, 
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Award,
  Target,
  Zap,
  Sparkles,
  Heart,
  Gift
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Your money is protected with 256-bit SSL encryption and stored in NDIC-insured banks.',
      color: 'primary'
    },
    {
      icon: TrendingUp,
      title: 'High Returns',
      description: 'Earn up to 15% per annum on your savings with our flexible and fixed savings plans.',
      color: 'secondary'
    },
    {
      icon: Target,
      title: 'Goal-Based Saving',
      description: 'Set specific savings goals and watch your money grow with automated contributions.',
      color: 'accent'
    },
    {
      icon: Zap,
      title: 'Instant Access',
      description: 'Quick and easy withdrawals to your bank account whenever you need your money.',
      color: 'warm'
    }
  ];

  const savingsPlans = [
    {
      name: 'Flex Save',
      rate: '10%',
      description: 'Save with flexibility. Withdraw anytime.',
      features: ['No minimum balance', 'Withdraw anytime', '10% per annum', 'No penalties'],
      color: 'primary',
      popular: false
    },
    {
      name: 'Fixed Save',
      rate: '15%',
      description: 'Lock your money away for higher returns.',
      features: ['Higher interest rates', '6-12 month terms', 'Up to 15% per annum', 'Penalty for early withdrawal'],
      color: 'secondary',
      popular: true
    },
    {
      name: 'Target Save',
      rate: '13%',
      description: 'Save towards a specific goal.',
      features: ['Goal-oriented', 'Automated savings', '13% per annum', 'Milestone rewards'],
      color: 'accent',
      popular: false
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Teacher',
      content: 'SureSavings helped me save for my dream vacation. The automated savings feature is amazing!',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Entrepreneur',
      content: 'The investment options are great. I\'ve grown my portfolio significantly in just one year.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5
    },
    {
      name: 'Amina Bello',
      role: 'Software Developer',
      content: 'Best savings platform in Nigeria. User-friendly interface and excellent customer support.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return 'from-primary-400 to-primary-600';
      case 'secondary':
        return 'from-secondary-400 to-secondary-600';
      case 'accent':
        return 'from-purple-400 to-purple-600';
      case 'warm':
        return 'from-orange-400 to-orange-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* Modern Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-glow-primary">
                  <img 
                    src="/image.png" 
                    alt="SureSavings Mascot" 
                    className="w-8 h-8 animate-float"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold text-gradient-primary">SureSavings</span>
                <div className="text-xs text-gray-500 font-medium">Smart Savings Platform</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-primary-600 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/50"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="btn-modern gradient-primary text-white px-6 py-3 rounded-xl text-sm font-medium shadow-glow-primary"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Mascot */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50"></div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="flex items-center space-x-2 mb-6">
                <Sparkles className="h-6 w-6 text-yellow-500" />
                <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Nigeria's #1 Savings Platform</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Smart Savings,
                <span className="text-gradient-primary block"> Secure Future</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Build your wealth with Nigeria's leading digital savings and investment platform. 
                Earn up to <span className="font-bold text-primary-600">15% annually</span> with bank-level security.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link 
                  to="/register" 
                  className="btn-modern gradient-primary text-white px-8 py-4 rounded-xl text-lg font-medium shadow-glow-primary flex items-center justify-center space-x-2 group"
                >
                  <span>Start Saving Today</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="btn-modern border-2 border-primary-500 text-primary-600 hover:bg-primary-50 px-8 py-4 rounded-xl text-lg font-medium flex items-center justify-center space-x-2 group">
                  <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span>Watch Demo</span>
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center animate-bounce-in" style={{ animationDelay: '0.2s' }}>
                  <p className="text-3xl font-bold text-gray-900">500K+</p>
                  <p className="text-gray-600 text-sm">Happy Savers</p>
                </div>
                <div className="text-center animate-bounce-in" style={{ animationDelay: '0.4s' }}>
                  <p className="text-3xl font-bold text-gray-900">₦50B+</p>
                  <p className="text-gray-600 text-sm">Total Savings</p>
                </div>
                <div className="text-center animate-bounce-in" style={{ animationDelay: '0.6s' }}>
                  <p className="text-3xl font-bold text-gray-900">4.9/5</p>
                  <p className="text-gray-600 text-sm">App Rating</p>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-in-right">
              {/* Floating Mascot */}
              <div className="absolute top-10 right-10 z-20">
                <div className="relative">
                  <img 
                    src="/image.png" 
                    alt="SureSavings Hero Mascot" 
                    className="w-24 h-24 animate-float drop-shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Modern Dashboard Preview */}
              <div className="card-modern-glass p-8 relative">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Your Savings Dashboard</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">Premium</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="gradient-primary rounded-xl p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                    <div className="relative">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm opacity-90">Total Balance</span>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">+12.5%</span>
                      </div>
                      <p className="text-3xl font-bold">₦2,750,000</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-4">
                      <p className="text-xs text-secondary-600 mb-1">This Month</p>
                      <p className="text-lg font-semibold text-secondary-800">₦185,000</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                      <p className="text-xs text-green-600 mb-1">Interest Earned</p>
                      <p className="text-lg font-semibold text-green-800">₦45,200</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                        <Gift className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Savings Streak</p>
                        <p className="text-xs text-gray-600">45 days strong! 🔥</p>
                      </div>
                    </div>
                    <Heart className="w-5 h-5 text-pink-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <img src="/image.png" alt="Features Mascot" className="w-8 h-8 animate-float" />
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Why Choose Us</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Built for Your <span className="text-gradient-primary">Financial Success</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge technology with financial expertise to help you achieve your savings goals faster and safer.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="card-modern p-8 text-center group hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${getColorClasses(feature.color)} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse-glow transition-all duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Savings Plans Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50 relative">
        <div className="absolute top-10 right-10 opacity-10">
          <img src="/image.png" alt="Background Mascot" className="w-32 h-32 animate-float" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Choose Your <span className="text-gradient-secondary">Savings Plan</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible options designed to match your financial goals and lifestyle. Start with as little as ₦1,000.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {savingsPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`card-modern p-8 relative overflow-hidden group hover:scale-105 transition-all duration-300 ${plan.popular ? 'ring-2 ring-primary-400 shadow-glow-primary' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg animate-bounce-in">
                      ⭐ Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className={`w-20 h-20 bg-gradient-to-br ${getColorClasses(plan.color)} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse-glow`}>
                    <img src="/image.png" alt="Plan Mascot" className="w-10 h-10 animate-float" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-5xl font-bold text-gray-900 mb-2">{plan.rate}</div>
                  <p className="text-gray-600">per annum</p>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  to="/register" 
                  className={`btn-modern w-full bg-gradient-to-r ${getColorClasses(plan.color)} text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-center block`}
                >
                  Choose {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What Our <span className="text-gradient-accent">Happy Savers</span> Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied savers who trust SureSavings with their financial future.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="card-modern p-8 hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-primary-100"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-10 left-10 opacity-20">
          <img src="/image.png" alt="CTA Mascot" className="w-24 h-24 animate-float" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-20">
          <img src="/image.png" alt="CTA Mascot" className="w-32 h-32 animate-float" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Ready to Start Your <br />
            <span className="text-yellow-300">Savings Journey?</span>
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join over 500,000 Nigerians who are building wealth with SureSavings. 
            Start with as little as ₦1,000 today and watch your money grow!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/register" 
              className="btn-modern bg-white text-primary-600 hover:bg-gray-50 px-10 py-4 rounded-xl text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Create Free Account</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              to="/login" 
              className="btn-modern border-2 border-white text-white hover:bg-white hover:text-primary-600 px-10 py-4 rounded-xl text-lg font-medium transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-8 text-primary-100">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">NDIC Insured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span className="text-sm">CBN Licensed</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">500K+ Users</span>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                  <img src="/image.png" alt="Footer Mascot" className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-2xl font-bold">SureSavings</span>
                  <div className="text-sm text-gray-400">Smart Savings Platform</div>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                Building wealth through smart savings and secure investments. Your trusted partner for financial growth in Nigeria.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                  <span className="text-sm">in</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Product</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-primary-400 transition-colors">Savings Plans</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Investments</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Mobile App</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-primary-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>© 2025 SureSavings. All rights reserved. Licensed by the CBN | NDIC Insured</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;