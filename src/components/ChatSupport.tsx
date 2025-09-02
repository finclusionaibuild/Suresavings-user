import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  User, 
  Bot,
  Paperclip,
  Smile,
  Phone,
  Video
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent' | 'bot';
  timestamp: Date;
  type: 'text' | 'image' | 'file';
}

interface ChatSupportProps {
  isOpen: boolean;
  onToggle: () => void;
  isMinimized: boolean;
  onMinimize: () => void;
}

const ChatSupport: React.FC<ChatSupportProps> = ({ 
  isOpen, 
  onToggle, 
  isMinimized, 
  onMinimize 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to SureSavings support. How can I help you today?',
      sender: 'agent',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [agentStatus, setAgentStatus] = useState<'online' | 'away' | 'busy'>('online');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAgentResponse(newMessage),
        sender: 'agent',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const getAgentResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('kyc') || message.includes('verification')) {
      return 'I can help you with KYC verification! You can complete your verification by going to your Profile page and clicking on "KYC Verification". Would you like me to guide you through the process?';
    } else if (message.includes('savings') || message.includes('save')) {
      return 'Great question about savings! We have several plans available: Sure Flex (10%), Sure Goal (13%), Sure Housing (14%), and more. Which type of savings plan interests you most?';
    } else if (message.includes('withdraw') || message.includes('withdrawal')) {
      return 'For withdrawals, you can use the Quick Actions on your dashboard or go to Transaction History. Withdrawals typically process within 24 hours. Is there a specific withdrawal you need help with?';
    } else if (message.includes('investment') || message.includes('invest')) {
      return 'Our investment options include Fixed Income (12-18% returns), Mutual Funds (15-25% returns), and Stock Portfolio (20-35% returns). Each has different risk levels. Would you like to know more about any specific option?';
    } else {
      return 'Thank you for your message! I\'m here to help with any questions about your SureSavings account. You can also check our FAQ section for quick answers to common questions.';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 bg-primary-500 hover:bg-primary-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 group"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 bg-white rounded-xl shadow-2xl border border-gray-200 z-40 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-primary-500 text-white rounded-t-xl">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img src="/image.png" alt="Support Agent" className="w-8 h-8 rounded-full" />
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
              agentStatus === 'online' ? 'bg-green-400' : 
              agentStatus === 'away' ? 'bg-yellow-400' : 'bg-red-400'
            }`}></div>
          </div>
          <div>
            <h3 className="font-semibold">SureSavings Support</h3>
            <p className="text-xs opacity-90 capitalize">{agentStatus}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onMinimize}
            className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onToggle}
            className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 h-80">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString('en-NG', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <Paperclip className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-primary-500 hover:bg-primary-600 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-2">
                <button className="text-gray-400 hover:text-gray-600 p-1">
                  <Smile className="w-4 h-4" />
                </button>
                <span className="text-xs text-gray-500">
                  Powered by SureSavings Support
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <button className="text-gray-400 hover:text-gray-600 p-1">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-gray-600 p-1">
                  <Video className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatSupport;