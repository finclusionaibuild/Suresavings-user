import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  Settings, 
  Lock, 
  Unlock, 
  RefreshCw, 
  Trash2, 
  DollarSign, 
  ShoppingCart, 
  Globe, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Filter, 
  Search, 
  Download,
  ChevronRight,
  ChevronDown,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const VirtualCards: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('cards');
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Sample virtual cards data
  const virtualCards = [
    {
      id: 1,
      name: 'Primary Card',
      type: 'Visa',
      currency: 'NGN',
      balance: 250000,
      number: '4111 2222 3333 4444',
      expiry: '12/26',
      cvv: '123',
      status: 'active',
      createdDate: '2024-12-15',
      transactions: 24,
      spendingLimit: {
        daily: 100000,
        monthly: 1000000
      },
      allowedCategories: ['shopping', 'travel', 'entertainment', 'subscriptions'],
      color: 'bg-gradient-to-r from-primary-500 to-primary-600'
    },
    {
      id: 2,
      name: 'Travel Card',
      type: 'Mastercard',
      currency: 'USD',
      balance: 500,
      number: '5111 2222 3333 4444',
      expiry: '10/25',
      cvv: '456',
      status: 'active',
      createdDate: '2025-01-05',
      transactions: 5,
      spendingLimit: {
        daily: 200,
        monthly: 2000
      },
      allowedCategories: ['travel', 'dining', 'hotels'],
      color: 'bg-gradient-to-r from-blue-500 to-blue-600'
    },
    {
      id: 3,
      name: 'Subscription Card',
      type: 'Visa',
      currency: 'NGN',
      balance: 50000,
      number: '4111 5555 6666 7777',
      expiry: '08/25',
      cvv: '789',
      status: 'locked',
      createdDate: '2024-11-20',
      transactions: 12,
      spendingLimit: {
        daily: 20000,
        monthly: 100000
      },
      allowedCategories: ['subscriptions', 'digital'],
      color: 'bg-gradient-to-r from-purple-500 to-purple-600'
    }
  ];

  // Sample transactions data
  const transactions = [
    {
      id: 1,
      cardId: 1,
      merchant: 'Amazon',
      amount: 25000,
      date: '2025-01-15T10:30:00Z',
      status: 'completed',
      category: 'shopping',
      cardName: 'Primary Card'
    },
    {
      id: 2,
      cardId: 1,
      merchant: 'Netflix',
      amount: 4500,
      date: '2025-01-14T14:20:00Z',
      status: 'completed',
      category: 'subscriptions',
      cardName: 'Primary Card'
    },
    {
      id: 3,
      cardId: 2,
      merchant: 'Uber',
      amount: 15,
      date: '2025-01-13T09:15:00Z',
      status: 'completed',
      category: 'travel',
      cardName: 'Travel Card'
    },
    {
      id: 4,
      cardId: 3,
      merchant: 'Spotify',
      amount: 1900,
      date: '2025-01-12T16:45:00Z',
      status: 'completed',
      category: 'subscriptions',
      cardName: 'Subscription Card'
    },
    {
      id: 5,
      cardId: 1,
      merchant: 'Jumia',
      amount: 35000,
      date: '2025-01-10T11:30:00Z',
      status: 'completed',
      category: 'shopping',
      cardName: 'Primary Card'
    },
    {
      id: 6,
      cardId: 2,
      merchant: 'Airbnb',
      amount: 120,
      date: '2025-01-08T13:20:00Z',
      status: 'declined',
      category: 'travel',
      cardName: 'Travel Card'
    }
  ];

  // Sample FAQs
  const faqs = [
    {
      id: '1',
      question: 'How do virtual cards work?',
      answer: 'Virtual cards work just like physical cards but exist only in digital form. They have a unique card number, expiry date, and CVV. You can use them for online purchases, subscriptions, and anywhere that accepts card payments online.'
    },
    {
      id: '2',
      question: 'Are there fees for creating or using virtual cards?',
      answer: 'There is no fee for creating your first virtual card. Additional cards cost ₦1,000 each to create. There are no monthly maintenance fees, but standard transaction fees may apply depending on your account type.'
    },
    {
      id: '3',
      question: 'How do I fund my virtual card?',
      answer: 'You can fund your virtual card directly from your SureSavings wallet. Simply select the card you want to fund, click on "Fund Card," enter the amount, and confirm the transaction.'
    },
    {
      id: '4',
      question: 'Can I use my virtual card internationally?',
      answer: 'Yes, our virtual cards can be used for international transactions. USD cards are specifically designed for international purchases, while NGN cards work for both local and some international merchants.'
    },
    {
      id: '5',
      question: 'What should I do if my virtual card is compromised?',
      answer: 'If you suspect your card has been compromised, immediately lock the card from your dashboard. Then, you can either delete the card and create a new one, or contact our support team for assistance.'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Transactions' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'declined', label: 'Declined' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'travel', label: 'Travel' },
    { value: 'subscriptions', label: 'Subscriptions' }
  ];

  const formatCurrency = (amount: number, currency: string = 'NGN') => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: currency === 'NGN' ? 0 : 2
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-NG', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-NG', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'locked':
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'inactive':
      case 'declined':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'shopping':
        return ShoppingCart;
      case 'travel':
        return Globe;
      case 'subscriptions':
        return RefreshCw;
      case 'entertainment':
        return Play;
      case 'dining':
        return Coffee;
      default:
        return DollarSign;
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleCreateCard = () => {
    console.log('Creating new virtual card');
    setShowCreateModal(false);
  };

  const handleViewCard = (card: any) => {
    setSelectedCard(card);
    setShowCardModal(true);
  };

  const handleToggleCardLock = (cardId: number) => {
    console.log(`Toggling lock for card ID: ${cardId}`);
    // In a real app, this would update the card status
  };

  const handleDeleteCard = (cardId: number) => {
    console.log(`Deleting card ID: ${cardId}`);
    // In a real app, this would delete the card
  };

  const handleFundCard = (cardId: number) => {
    console.log(`Funding card ID: ${cardId}`);
    // In a real app, this would open a funding modal
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.cardName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         transaction.status === selectedFilter ||
                         transaction.category === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleFAQToggle = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  // Placeholder components for icons not imported
  const Play = () => <div className="h-5 w-5 text-purple-500">▶</div>;
  const Coffee = () => <div className="h-5 w-5 text-yellow-500">☕</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <img 
                src="/image.png" 
                alt="Virtual Cards Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Virtual Cards</h1>
              <p className="text-gray-600">Create and manage virtual debit cards for online transactions and subscriptions</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('cards')}
              className={`px-4 py-3 font-medium border-b-2 ${
                activeTab === 'cards'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Cards
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-4 py-3 font-medium border-b-2 ${
                activeTab === 'transactions'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-4 py-3 font-medium border-b-2 ${
                activeTab === 'faq'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              FAQ
            </button>
          </div>
        </div>

        {/* My Cards Tab */}
        {activeTab === 'cards' && (
          <div className="space-y-8">
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {virtualCards.map((card) => (
                <div key={card.id} className={`rounded-xl shadow-lg overflow-hidden ${card.color}`}>
                  <div className="p-6 text-white">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-sm opacity-80">Virtual Card</p>
                        <h3 className="text-xl font-bold">{card.name}</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-white ${
                          card.status === 'active' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {card.status}
                        </span>
                        <img 
                          src={card.type === 'Visa' ? 
                            'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png' : 
                            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png'} 
                          alt={card.type}
                          className="h-8 w-auto"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-sm opacity-80 mb-1">Card Number</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-lg font-mono">
                          {showCardDetails ? card.number : '•••• •••• •••• ' + card.number.slice(-4)}
                        </p>
                        <button
                          onClick={() => setShowCardDetails(!showCardDetails)}
                          className="text-white opacity-80 hover:opacity-100"
                        >
                          {showCardDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-sm opacity-80 mb-1">Expiry</p>
                        <p className="font-mono">{showCardDetails ? card.expiry : '••/••'}</p>
                      </div>
                      <div>
                        <p className="text-sm opacity-80 mb-1">CVV</p>
                        <p className="font-mono">{showCardDetails ? card.cvv : '•••'}</p>
                      </div>
                      <div>
                        <p className="text-sm opacity-80 mb-1">Balance</p>
                        <p className="font-bold">{formatCurrency(card.balance, card.currency)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 flex justify-between">
                    <button
                      onClick={() => handleViewCard(card)}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      View Details
                    </button>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleCardLock(card.id)}
                        className={`p-1.5 rounded-full ${
                          card.status === 'locked' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'
                        } hover:bg-opacity-80`}
                      >
                        {card.status === 'locked' ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => handleFundCard(card.id)}
                        className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-opacity-80"
                      >
                        <DollarSign className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCard(card.id)}
                        className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-opacity-80"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Create New Card */}
              <div 
                onClick={() => setShowCreateModal(true)}
                className="rounded-xl border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center hover:border-primary-300 hover:bg-primary-50 transition-colors cursor-pointer"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Plus className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Create New Card</h3>
                <p className="text-sm text-gray-600 max-w-xs">
                  Create a new virtual card for online shopping, subscriptions, or travel
                </p>
              </div>
            </div>
            
            {/* Card Usage Tips */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <img src="/image.png" alt="Tips Mascot" className="w-5 h-5" />
                <h2 className="text-xl font-semibold text-gray-900">Card Usage Tips</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Globe className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Online Shopping</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Use different cards for different merchants</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Set spending limits for better control</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <RefreshCw className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Subscriptions</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Create dedicated cards for subscriptions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Lock cards when not in use</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Lock className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Security</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Delete cards after one-time purchases</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Regularly check transaction history</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
              <div className="flex items-center space-x-2">
                <img src="/image.png" alt="Transactions Mascot" className="w-5 h-5" />
                <h2 className="text-xl font-semibold text-gray-900">Card Transactions</h2>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {filterOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Merchant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Card
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransactions.map((transaction) => {
                    const { date, time } = formatDateTime(transaction.date);
                    const CategoryIcon = getCategoryIcon(transaction.category);
                    const card = virtualCards.find(c => c.id === transaction.cardId);
                    
                    return (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{transaction.merchant}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.cardName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {formatCurrency(transaction.amount, card?.currency || 'NGN')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{date}</div>
                          <div className="text-sm text-gray-500">{time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="p-1.5 rounded-lg bg-gray-100">
                              <CategoryIcon className="h-4 w-4 text-gray-600" />
                            </div>
                            <span className="text-sm text-gray-900 capitalize">{transaction.category}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {filteredTransactions.length === 0 && (
              <div className="p-12 text-center">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <img src="/image.png" alt="No Transactions" className="w-8 h-8 opacity-50" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-6">
              <img src="/image.png" alt="FAQ Mascot" className="w-5 h-5" />
              <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq) => (
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
            
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg mt-1">
                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-blue-800 mb-1">Need More Help?</h3>
                  <p className="text-sm text-blue-700">
                    If you have more questions about virtual cards, please contact our support team at 
                    <a href="mailto:support@suresavings.com" className="underline ml-1">support@suresavings.com</a> or 
                    visit our <a href="/help" className="underline">Help Center</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Card Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="Create Card Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">Create New Card</h3>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., Shopping Card"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Type
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="visa">Visa</option>
                    <option value="mastercard">Mastercard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="NGN">Nigerian Naira (NGN)</option>
                    <option value="USD">US Dollar (USD)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Initial Funding Amount
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="₦0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Spending Limits
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Daily Limit</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="₦0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Monthly Limit</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="₦0"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Allowed Categories
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="shopping"
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="shopping" className="text-sm text-gray-700">Shopping</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="travel"
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="travel" className="text-sm text-gray-700">Travel</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="subscriptions"
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="subscriptions" className="text-sm text-gray-700">Subscriptions</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="entertainment"
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="entertainment" className="text-sm text-gray-700">Entertainment</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCard}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Create Card
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Card Detail Modal */}
        {showCardModal && selectedCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/image.png" alt="Card Detail Mascot" className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">{selectedCard.name}</h3>
                </div>
                <button
                  onClick={() => setShowCardModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Card Preview */}
                <div className={`rounded-xl shadow-lg overflow-hidden ${selectedCard.color}`}>
                  <div className="p-6 text-white">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-sm opacity-80">Virtual Card</p>
                        <h3 className="text-xl font-bold">{selectedCard.name}</h3>
                      </div>
                      <img 
                        src={selectedCard.type === 'Visa' ? 
                          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png' : 
                          'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png'} 
                        alt={selectedCard.type}
                        className="h-8 w-auto"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-sm opacity-80 mb-1">Card Number</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-lg font-mono">
                          {showCardDetails ? selectedCard.number : '•••• •••• •••• ' + selectedCard.number.slice(-4)}
                        </p>
                        <button
                          onClick={() => setShowCardDetails(!showCardDetails)}
                          className="text-white opacity-80 hover:opacity-100"
                        >
                          {showCardDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => copyToClipboard(selectedCard.number, 'number')}
                          className="text-white opacity-80 hover:opacity-100"
                        >
                          {copiedField === 'number' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-sm opacity-80 mb-1">Expiry</p>
                        <div className="flex items-center space-x-2">
                          <p className="font-mono">{showCardDetails ? selectedCard.expiry : '••/••'}</p>
                          {showCardDetails && (
                            <button
                              onClick={() => copyToClipboard(selectedCard.expiry, 'expiry')}
                              className="text-white opacity-80 hover:opacity-100"
                            >
                              {copiedField === 'expiry' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </button>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm opacity-80 mb-1">CVV</p>
                        <div className="flex items-center space-x-2">
                          <p className="font-mono">{showCardDetails ? selectedCard.cvv : '•••'}</p>
                          {showCardDetails && (
                            <button
                              onClick={() => copyToClipboard(selectedCard.cvv, 'cvv')}
                              className="text-white opacity-80 hover:opacity-100"
                            >
                              {copiedField === 'cvv' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </button>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm opacity-80 mb-1">Balance</p>
                        <p className="font-bold">{formatCurrency(selectedCard.balance, selectedCard.currency)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Card Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedCard.status)}`}>
                          {selectedCard.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Created:</span>
                        <span className="text-sm font-medium">{formatDate(selectedCard.createdDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Transactions:</span>
                        <span className="text-sm font-medium">{selectedCard.transactions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Currency:</span>
                        <span className="text-sm font-medium">{selectedCard.currency}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Spending Limits</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Daily Limit:</span>
                        <span className="text-sm font-medium">{formatCurrency(selectedCard.spendingLimit.daily, selectedCard.currency)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Monthly Limit:</span>
                        <span className="text-sm font-medium">{formatCurrency(selectedCard.spendingLimit.monthly, selectedCard.currency)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Allowed Categories:</span>
                        <div className="flex flex-wrap justify-end gap-1">
                          {selectedCard.allowedCategories.map((category: string, index: number) => (
                            <span key={index} className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700 capitalize">
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Recent Transactions</h4>
                  <div className="space-y-3 max-h-40 overflow-y-auto">
                    {transactions
                      .filter(t => t.cardId === selectedCard.id)
                      .slice(0, 3)
                      .map((transaction) => {
                        const { date, time } = formatDateTime(transaction.date);
                        const CategoryIcon = getCategoryIcon(transaction.category);
                        
                        return (
                          <div key={transaction.id} className="flex items-center justify-between p-2 bg-white rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="p-1.5 rounded-lg bg-gray-100">
                                <CategoryIcon className="h-4 w-4 text-gray-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{transaction.merchant}</p>
                                <p className="text-xs text-gray-500">{date} at {time}</p>
                              </div>
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              {formatCurrency(transaction.amount, selectedCard.currency)}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  {transactions.filter(t => t.cardId === selectedCard.id).length > 3 && (
                    <button
                      onClick={() => {
                        setShowCardModal(false);
                        setActiveTab('transactions');
                        setSearchTerm(selectedCard.name);
                      }}
                      className="mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View all transactions
                    </button>
                  )}
                  {transactions.filter(t => t.cardId === selectedCard.id).length === 0 && (
                    <div className="text-center py-4 text-sm text-gray-500">
                      No transactions yet
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => handleFundCard(selectedCard.id)}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Fund Card
                </button>
                <button
                  onClick={() => handleToggleCardLock(selectedCard.id)}
                  className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                >
                  {selectedCard.status === 'locked' ? 'Unlock Card' : 'Lock Card'}
                </button>
                <button
                  onClick={() => {
                    handleDeleteCard(selectedCard.id);
                    setShowCardModal(false);
                  }}
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                >
                  Delete Card
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualCards;