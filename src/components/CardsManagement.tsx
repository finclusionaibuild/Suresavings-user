import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  Settings, 
  Trash2,
  Copy,
  Check,
  DollarSign
} from 'lucide-react';

interface Card {
  id: string;
  name: string;
  type: 'virtual' | 'physical';
  number: string;
  expiry: string;
  cvv: string;
  balance: number;
  currency: string;
  status: 'active' | 'locked' | 'expired';
  color: string;
}

interface CardsManagementProps {
  onCardAction?: (action: string, cardId: string) => void;
}

const CardsManagement: React.FC<CardsManagementProps> = ({ onCardAction }) => {
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const cards: Card[] = [
    {
      id: '1',
      name: 'Primary Card',
      type: 'virtual',
      number: '4111 2222 3333 4444',
      expiry: '12/26',
      cvv: '123',
      balance: 25000,
      currency: 'NGN',
      status: 'active',
      color: 'bg-gradient-to-br from-primary-500 to-primary-600'
    },
    {
      id: '2',
      name: 'USD Card',
      type: 'virtual',
      number: '5111 2222 3333 4444',
      expiry: '10/25',
      cvv: '456',
      balance: 150,
      currency: 'USD',
      status: 'active',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600'
    }
  ];

  const formatCurrency = (amount: number, currency: string) => {
    const symbol = currency === 'USD' ? '$' : '₦';
    return `${symbol}${amount.toLocaleString()}`;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'locked':
        return 'bg-yellow-100 text-yellow-700';
      case 'expired':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <img src="/image.png" alt="Cards Mascot" className="w-6 h-6" />
          <h2 className="text-xl font-semibold text-gray-900">My Cards</h2>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Card</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div key={card.id} className={`${card.color} rounded-xl p-6 text-white relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm opacity-80">{card.type === 'virtual' ? 'Virtual Card' : 'Physical Card'}</p>
                  <h3 className="text-lg font-bold">{card.name}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-white ${
                    card.status === 'active' ? 'text-green-600' : 
                    card.status === 'locked' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {card.status}
                  </span>
                </div>
              </div>

              <div className="mb-4">
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
                  {showCardDetails && (
                    <button
                      onClick={() => copyToClipboard(card.number, `number-${card.id}`)}
                      className="text-white opacity-80 hover:opacity-100"
                    >
                      {copiedField === `number-${card.id}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
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
          </div>
        ))}

        {/* Add New Card */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary-300 hover:bg-primary-50 transition-colors cursor-pointer">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <Plus className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Create New Card</h3>
          <p className="text-sm text-gray-600">
            Create a virtual card for online shopping and subscriptions
          </p>
        </div>
      </div>

      {/* Card Actions */}
      <div className="mt-6 flex items-center justify-center space-x-4">
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
          <DollarSign className="w-4 h-4" />
          <span>Fund Card</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
          <Settings className="w-4 h-4" />
          <span>Card Settings</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
          <Lock className="w-4 h-4" />
          <span>Lock/Unlock</span>
        </button>
      </div>
    </div>
  );
};

export default CardsManagement;