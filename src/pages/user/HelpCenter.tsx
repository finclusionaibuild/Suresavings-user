import React, { useState } from 'react';
import {
  Search,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Video,
  Download,
  ExternalLink,
  Star,
  ThumbsUp,
  ThumbsDown,
  Send,
  Headphones,
  Shield,
  CreditCard,
  TrendingUp,
  Settings,
  Users,
  AlertCircle,
  CheckCircle,
  FileText,
  PlayCircle
} from 'lucide-react';

const HelpCenter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const categories = [
    { id: 'all', name: 'All Topics', icon: BookOpen, count: 45 },
    { id: 'account', name: 'Account & Profile', icon: Users, count: 12 },
    { id: 'savings', name: 'Savings & Plans', icon: TrendingUp, count: 15 },
    { id: 'investments', name: 'Investments', icon: TrendingUp, count: 8 },
    { id: 'transactions', name: 'Transactions', icon: CreditCard, count: 10 },
    { id: 'security', name: 'Security & Privacy', icon: Shield, count: 7 },
    { id: 'technical', name: 'Technical Issues', icon: Settings, count: 6 }
  ];

  const faqs = [
    {
      id: '1',
      category: 'account',
      question: 'How do I create a SureSavings account?',
      answer: 'Creating a SureSavings account is simple! Click on "Get Started" on our homepage, fill in your basic information including your name, email, and phone number. You\'ll need to verify your email and phone number, then complete your KYC verification to start saving.',
      helpful: 45,
      notHelpful: 2,
      tags: ['registration', 'account creation', 'getting started']
    },
    {
      id: '2',
      category: 'savings',
      question: 'What are the different savings plans available?',
      answer: 'We offer three main savings plans: Flex Save (10% p.a.) for flexible savings with anytime withdrawal, Fixed Save (up to 15% p.a.) for locked savings with higher returns, and Target Save (13% p.a.) for goal-oriented savings with automated contributions.',
      helpful: 38,
      notHelpful: 1,
      tags: ['savings plans', 'interest rates', 'flex save', 'fixed save', 'target save']
    },
    {
      id: '3',
      category: 'transactions',
      question: 'How long do withdrawals take to process?',
      answer: 'Withdrawals are typically processed within 24 hours on business days. For Flex Save accounts, withdrawals are instant. Fixed Save accounts may have penalties for early withdrawal. You\'ll receive an email notification once your withdrawal is processed.',
      helpful: 52,
      notHelpful: 3,
      tags: ['withdrawals', 'processing time', 'business days']
    },
    {
      id: '4',
      category: 'security',
      question: 'How secure is my money with SureSavings?',
      answer: 'Your money is completely secure with us. We use bank-level 256-bit SSL encryption, are licensed by the CBN, and all funds are NDIC insured up to ₦500,000 per depositor. We also employ multi-factor authentication and advanced fraud detection systems.',
      helpful: 67,
      notHelpful: 0,
      tags: ['security', 'encryption', 'NDIC', 'CBN', 'insurance']
    },
    {
      id: '5',
      category: 'investments',
      question: 'What investment options are available?',
      answer: 'We offer three investment categories: Fixed Income (12-18% returns, low risk), Mutual Funds (15-25% returns, medium risk), and Stock Portfolio (20-35% returns, higher risk). All investments are professionally managed and you can start with as little as ₦50,000.',
      helpful: 29,
      notHelpful: 4,
      tags: ['investments', 'returns', 'risk levels', 'minimum investment']
    },
    {
      id: '6',
      category: 'account',
      question: 'How do I upgrade my KYC tier?',
      answer: 'To upgrade your KYC tier, go to your Profile settings and click on "KYC Verification". Upload the required documents for your desired tier: Tier 2 requires BVN and government ID, Tier 3 requires additional address verification and income proof.',
      helpful: 33,
      notHelpful: 2,
      tags: ['KYC', 'verification', 'tier upgrade', 'documents']
    }
  ];

  const quickLinks = [
    { title: 'Getting Started Guide', icon: BookOpen, description: 'Complete guide for new users', link: '#' },
    { title: 'Video Tutorials', icon: Video, description: 'Step-by-step video guides', link: '#' },
    { title: 'Download Mobile App', icon: Download, description: 'Get our mobile app for iOS and Android', link: '#' },
    { title: 'Security Best Practices', icon: Shield, description: 'Keep your account safe and secure', link: '#' }
  ];

  const contactOptions = [
    {
      title: 'Live Chat',
      description: 'Chat with our support team',
      icon: MessageCircle,
      availability: 'Available 24/7',
      action: 'Start Chat',
      color: 'bg-green-500'
    },
    {
      title: 'Phone Support',
      description: 'Call us for immediate assistance',
      icon: Phone,
      availability: 'Mon-Fri 8AM-6PM',
      action: 'Call Now',
      color: 'bg-blue-500'
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: Mail,
      availability: 'Response within 24 hours',
      action: 'Send Email',
      color: 'bg-purple-500'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleFAQToggle = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    setShowContactForm(false);
    setContactForm({ name: '', email: '', subject: '', message: '', priority: 'medium' });
  };

  const handleFeedback = (faqId: string, helpful: boolean) => {
    console.log(`FAQ ${faqId} marked as ${helpful ? 'helpful' : 'not helpful'}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <img 
                src="/image.png" 
                alt="Help Center Mascot" 
                className="w-16 h-16 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">?</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions, browse our guides, or get in touch with our support team
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles, guides, or FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-primary-100 p-3 rounded-lg group-hover:bg-primary-200 transition-colors">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{link.title}</h3>
                <p className="text-gray-600 text-sm">{link.description}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h3>
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

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* FAQs */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center space-x-2 mb-6">
                <img src="/image.png" alt="FAQ Mascot" className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Frequently Asked Questions ({filteredFAQs.length})
                </h2>
              </div>

              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => handleFAQToggle(faq.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                      {expandedFAQ === faq.id ? (
                        <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    
                    {expandedFAQ === faq.id && (
                      <div className="px-4 pb-4 border-t border-gray-100">
                        <div className="pt-4">
                          <p className="text-gray-700 leading-relaxed mb-4">{faq.answer}</p>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {faq.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          {/* Feedback */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <span className="text-sm text-gray-600">Was this helpful?</span>
                            <div className="flex items-center space-x-4">
                              <button
                                onClick={() => handleFeedback(faq.id, true)}
                                className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
                              >
                                <ThumbsUp className="h-4 w-4" />
                                <span className="text-sm">{faq.helpful}</span>
                              </button>
                              <button
                                onClick={() => handleFeedback(faq.id, false)}
                                className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                              >
                                <ThumbsDown className="h-4 w-4" />
                                <span className="text-sm">{faq.notHelpful}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredFAQs.length === 0 && (
                <div className="text-center py-12">
                  <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <img src="/image.png" alt="No Results" className="w-8 h-8 opacity-50" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-500">Try adjusting your search terms or browse by category</p>
                </div>
              )}
            </div>

            {/* Contact Support */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <img src="/image.png" alt="Contact Mascot" className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-gray-900">Still need help?</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contactOptions.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-primary-300 transition-colors">
                      <div className={`${option.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{option.description}</p>
                      <div className="flex items-center space-x-2 mb-4">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{option.availability}</span>
                      </div>
                      <button
                        onClick={() => {
                          if (option.title === 'Email Support') {
                            setShowContactForm(true);
                          }
                        }}
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                      >
                        {option.action}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <div className="flex items-center space-x-2 mb-6">
                <img src="/image.png" alt="Contact Form Mascot" className="w-6 h-6" />
                <h3 className="text-2xl font-bold text-gray-900">Contact Support</h3>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={contactForm.priority}
                    onChange={(e) => setContactForm({...contactForm, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Please describe your issue in detail..."
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpCenter;