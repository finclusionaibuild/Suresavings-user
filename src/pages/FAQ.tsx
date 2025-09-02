import React, { useState } from 'react';
import { 
  Search, 
  ChevronRight, 
  ChevronDown, 
  HelpCircle, 
  MessageSquare, 
  Mail, 
  Phone, 
  Shield, 
  DollarSign, 
  TrendingUp, 
  User, 
  CreditCard, 
  Settings, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight
} from 'lucide-react';

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  // FAQ categories
  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle, count: 25 },
    { id: 'account', name: 'Account & Profile', icon: User, count: 5 },
    { id: 'savings', name: 'Savings & Plans', icon: DollarSign, count: 7 },
    { id: 'investments', name: 'Investments', icon: TrendingUp, count: 4 },
    { id: 'security', name: 'Security & Privacy', icon: Shield, count: 5 },
    { id: 'payments', name: 'Payments & Withdrawals', icon: CreditCard, count: 4 }
  ];

  // FAQ data
  const faqs = [
    {
      id: '1',
      category: 'account',
      question: 'How do I create a SureSavings account?',
      answer: 'Creating a SureSavings account is simple! Click on "Get Started" on our homepage, fill in your basic information including your name, email, and phone number. You\'ll need to verify your email and phone number, then complete your KYC verification to start saving.'
    },
    {
      id: '2',
      category: 'account',
      question: 'How do I upgrade my KYC tier?',
      answer: 'To upgrade your KYC tier, go to your Profile settings and click on "KYC Verification". Upload the required documents for your desired tier: Tier 2 requires BVN and government ID, Tier 3 requires additional address verification and income proof.'
    },
    {
      id: '3',
      category: 'savings',
      question: 'What are the different savings plans available?',
      answer: 'We offer three main savings plans: Flex Save (10% p.a.) for flexible savings with anytime withdrawal, Fixed Save (up to 15% p.a.) for locked savings with higher returns, and Target Save (13% p.a.) for goal-oriented savings with automated contributions.'
    },
    {
      id: '4',
      category: 'savings',
      question: 'How is interest calculated on my savings?',
      answer: 'Interest is calculated daily based on your balance and paid monthly. For Flex Save, interest is calculated on your daily balance. For Fixed Save, interest is calculated on the locked amount for the entire period. For Target Save, interest is calculated on your accumulated balance.'
    },
    {
      id: '5',
      category: 'savings',
      question: 'Can I withdraw from my Fixed Save before maturity?',
      answer: 'Yes, you can withdraw from your Fixed Save before maturity, but a penalty of 40% of the accrued interest will be applied. The principal amount remains intact, but you\'ll receive only 60% of the interest earned up to that point.'
    },
    {
      id: '6',
      category: 'investments',
      question: 'What investment options are available?',
      answer: 'We offer three investment categories: Fixed Income (12-18% returns, low risk), Mutual Funds (15-25% returns, medium risk), and Stock Portfolio (20-35% returns, higher risk). All investments are professionally managed and you can start with as little as ₦50,000.'
    },
    {
      id: '7',
      category: 'investments',
      question: 'How long does it take for investments to mature?',
      answer: 'Investment maturity periods vary by type: Fixed Income investments typically mature in 6-24 months, Mutual Funds in 12-36 months, and Stock Portfolios are recommended for 12+ months. You can view the specific maturity period for each investment option before investing.'
    },
    {
      id: '8',
      category: 'security',
      question: 'How secure is my money with SureSavings?',
      answer: 'Your money is completely secure with us. We use bank-level 256-bit SSL encryption, are licensed by the CBN, and all funds are NDIC insured up to ₦500,000 per depositor. We also employ multi-factor authentication and advanced fraud detection systems.'
    },
    {
      id: '9',
      category: 'security',
      question: 'How do I enable two-factor authentication?',
      answer: 'To enable two-factor authentication, go to your Profile settings, select "Security", and click on "Enable 2FA". You can choose between SMS verification or an authenticator app. We recommend using an authenticator app for enhanced security.'
    },
    {
      id: '10',
      category: 'payments',
      question: 'How long do withdrawals take to process?',
      answer: 'Withdrawals are typically processed within 24 hours on business days. For Flex Save accounts, withdrawals are instant. Fixed Save accounts may have penalties for early withdrawal. You\'ll receive an email notification once your withdrawal is processed.'
    },
    {
      id: '11',
      category: 'payments',
      question: 'What payment methods are accepted for deposits?',
      answer: 'We accept various payment methods including bank transfers, debit cards, USSD, and mobile money. You can also set up automatic deposits from your bank account on a schedule that works for you (daily, weekly, or monthly).'
    }
  ];

  const handleFAQToggle = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : HelpCircle;
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <img 
                src="/image.png" 
                alt="FAQ Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
              <p className="text-gray-600">Find answers to common questions about SureSavings</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary-50 text-primary-700 border border-primary-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <img src="/image.png" alt="FAQ List Mascot" className="w-5 h-5" />
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedCategory === 'all' ? 'All Questions' : 
                   categories.find(c => c.id === selectedCategory)?.name || 'All Questions'}
                  {searchTerm && ` matching "${searchTerm}"`}
                </h2>
              </div>

              <div className="space-y-4">
                {filteredFAQs.map((faq) => {
                  const CategoryIcon = getCategoryIcon(faq.category);
                  return (
                    <div key={faq.id} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => handleFAQToggle(faq.id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3 pr-4">
                          <div className="bg-gray-100 p-2 rounded-lg">
                            <CategoryIcon className="h-5 w-5 text-gray-600" />
                          </div>
                          <span className="font-medium text-gray-900">{faq.question}</span>
                        </div>
                        {expandedFAQ === faq.id ? (
                          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      
                      {expandedFAQ === faq.id && (
                        <div className="px-4 pb-4 border-t border-gray-100">
                          <p className="pt-4 text-gray-700 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {filteredFAQs.length === 0 && (
                <div className="p-12 text-center">
                  <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <img src="/image.png" alt="No Results" className="w-8 h-8 opacity-50" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No matching questions found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search terms or browse by category</p>
                  <a
                    href="/contact"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Contact Support</span>
                  </a>
                </div>
              )}
            </div>

            {/* Still Need Help */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-lg p-8 mt-8 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-6 md:mb-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <HelpCircle className="h-6 w-6" />
                    <h2 className="text-xl font-bold">Still Need Help?</h2>
                  </div>
                  <p className="text-primary-100 max-w-xl">
                    Can't find the answer you're looking for? Our support team is here to help you with any questions or concerns.
                  </p>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <a
                    href="/contact"
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-white text-primary-600 rounded-xl font-medium transition-colors hover:bg-primary-50"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>Contact Support</span>
                  </a>
                  
                  <a
                    href="/help"
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-xl font-medium transition-colors"
                  >
                    <HelpCircle className="h-5 w-5" />
                    <span>Visit Help Center</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;