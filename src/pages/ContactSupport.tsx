import React, { useState } from 'react';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  HelpCircle, 
  ChevronRight, 
  ChevronDown, 
  Search, 
  ArrowRight, 
  User, 
  FileText, 
  Image, 
  Paperclip, 
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ContactSupport: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('contact');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    name: user ? `${user.firstName} ${user.lastName}` : '',
    email: user?.email || '',
    subject: '',
    message: '',
    category: 'general',
    priority: 'medium',
    attachments: [] as File[]
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Sample FAQs for quick answers
  const popularFAQs = [
    {
      id: '1',
      question: 'How do I reset my password?',
      answer: 'To reset your password, click on "Forgot Password" on the login page. You\'ll receive an email with instructions to create a new password. For security reasons, password reset links expire after 30 minutes.'
    },
    {
      id: '2',
      question: 'How long do withdrawals take to process?',
      answer: 'Withdrawals are typically processed within 24 hours on business days. For Flex Save accounts, withdrawals are instant. Fixed Save accounts may have penalties for early withdrawal. You\'ll receive an email notification once your withdrawal is processed.'
    },
    {
      id: '3',
      question: 'What are the different savings plans available?',
      answer: 'We offer three main savings plans: Flex Save (10% p.a.) for flexible savings with anytime withdrawal, Fixed Save (up to 15% p.a.) for locked savings with higher returns, and Target Save (13% p.a.) for goal-oriented savings with automated contributions.'
    }
  ];

  // Sample support ticket categories
  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'account', label: 'Account Issues' },
    { value: 'savings', label: 'Savings Plans' },
    { value: 'investment', label: 'Investments' },
    { value: 'transaction', label: 'Transaction Issues' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'feedback', label: 'Feedback & Suggestions' }
  ];

  // Sample priority levels
  const priorities = [
    { value: 'low', label: 'Low - General questions' },
    { value: 'medium', label: 'Medium - Account issues' },
    { value: 'high', label: 'High - Transaction problems' },
    { value: 'urgent', label: 'Urgent - Security concerns' }
  ];

  // Contact options
  const contactOptions = [
    {
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      icon: MessageSquare,
      availability: 'Available 24/7',
      action: 'Start Chat',
      color: 'bg-green-500'
    },
    {
      title: 'Phone Support',
      description: 'Call us for immediate assistance',
      icon: Phone,
      availability: 'Mon-Fri 8AM-6PM',
      action: '+234 800 SURE SAVE',
      color: 'bg-blue-500'
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: Mail,
      availability: 'Response within 24 hours',
      action: 'support@suresavings.com',
      color: 'bg-purple-500'
    }
  ];

  const handleFAQToggle = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setContactForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setContactForm(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles]
      }));
    }
  };

  const removeAttachment = (index: number) => {
    setContactForm(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting support ticket:', contactForm);
    // In a real app, this would submit the form to the backend
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      setContactForm({
        name: user ? `${user.firstName} ${user.lastName}` : '',
        email: user?.email || '',
        subject: '',
        message: '',
        category: 'general',
        priority: 'medium',
        attachments: []
      });
    }, 5000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-700';
      case 'high':
        return 'bg-orange-100 text-orange-700';
      case 'medium':
        return 'bg-blue-100 text-blue-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <img 
                src="/image.png" 
                alt="Contact Support Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contact Support</h1>
              <p className="text-gray-600">Get in touch with our support team for assistance with your account</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-4 py-3 font-medium border-b-2 ${
                activeTab === 'contact'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Contact Us
            </button>
            <button
              onClick={() => setActiveTab('quick-answers')}
              className={`px-4 py-3 font-medium border-b-2 ${
                activeTab === 'quick-answers'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Quick Answers
            </button>
          </div>
        </div>

        {/* Contact Us Tab */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Options */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex items-center space-x-2 mb-6">
                  <img src="/image.png" alt="Contact Options Mascot" className="w-5 h-5" />
                  <h2 className="text-xl font-semibold text-gray-900">Contact Options</h2>
                </div>
                
                <div className="space-y-4">
                  {contactOptions.map((option, index) => {
                    const Icon = option.icon;
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`${option.color} p-3 rounded-lg`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <h3 className="font-semibold text-gray-900">{option.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                        <div className="flex items-center space-x-2 mb-4">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">{option.availability}</span>
                        </div>
                        {option.title === 'Live Chat' ? (
                          <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                            {option.action}
                          </button>
                        ) : (
                          <div className="text-sm font-medium text-primary-600">
                            {option.action}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <img src="/image.png" alt="Support Hours Mascot" className="w-5 h-5" />
                  <h2 className="text-xl font-semibold text-gray-900">Support Hours</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Live Chat:</span>
                    <span className="font-medium text-gray-900">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone Support:</span>
                    <span className="font-medium text-gray-900">Mon-Fri, 8AM-6PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email Response:</span>
                    <span className="font-medium text-gray-900">Within 24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Office Address:</span>
                    <span className="font-medium text-gray-900">Lagos, Nigeria</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <img src="/image.png" alt="Contact Form Mascot" className="w-5 h-5" />
                  <h2 className="text-xl font-semibold text-gray-900">Send a Message</h2>
                </div>
                
                {showSuccessMessage ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Message Sent Successfully!</h3>
                    <p className="text-green-700 mb-4">
                      Thank you for contacting us. Our support team will get back to you within 24 hours.
                    </p>
                    <p className="text-sm text-green-600">
                      Your ticket reference: <span className="font-mono font-medium">TKT-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={contactForm.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={contactForm.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter subject"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category
                        </label>
                        <select
                          name="category"
                          value={contactForm.category}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          {categories.map(category => (
                            <option key={category.value} value={category.value}>{category.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Priority
                        </label>
                        <select
                          name="priority"
                          value={contactForm.priority}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          {priorities.map(priority => (
                            <option key={priority.value} value={priority.value}>{priority.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={contactForm.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Please describe your issue in detail..."
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Attachments (optional)
                      </label>
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors">
                          <Paperclip className="h-4 w-4" />
                          <span>Add Files</span>
                          <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                        <span className="text-sm text-gray-500">Max 3 files (5MB each)</span>
                      </div>
                      
                      {contactForm.attachments.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {contactForm.attachments.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-2">
                                {file.type.startsWith('image/') ? (
                                  <Image className="h-4 w-4 text-gray-500" />
                                ) : (
                                  <FileText className="h-4 w-4 text-gray-500" />
                                )}
                                <span className="text-sm text-gray-700 truncate max-w-xs">{file.name}</span>
                                <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeAttachment(index)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                    >
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Quick Answers Tab */}
        {activeTab === 'quick-answers' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <img src="/image.png" alt="Quick Answers Mascot" className="w-5 h-5" />
                <h2 className="text-xl font-semibold text-gray-900">Quick Answers</h2>
              </div>
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              {popularFAQs.map((faq) => (
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
                      <p className="pt-4 text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-3 rounded-full">
                  <HelpCircle className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Need more help?</h3>
                  <p className="text-gray-700 mb-4">
                    If you couldn't find the answer you were looking for, our support team is here to help.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <button
                      onClick={() => setActiveTab('contact')}
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Contact Support</span>
                    </button>
                    <a
                      href="/help"
                      className="flex items-center justify-center space-x-2 px-4 py-2 border border-primary-500 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      <HelpCircle className="h-4 w-4" />
                      <span>Visit Help Center</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactSupport;