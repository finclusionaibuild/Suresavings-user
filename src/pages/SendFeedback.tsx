import React, { useState } from 'react';
import { 
  MessageSquare, 
  Star, 
  Send, 
  CheckCircle, 
  ThumbsUp, 
  ThumbsDown, 
  Smile, 
  Frown, 
  Meh, 
  Heart, 
  AlertCircle, 
  HelpCircle, 
  Image, 
  FileText, 
  Paperclip, 
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SendFeedback: React.FC = () => {
  const { user } = useAuth();
  const [feedbackType, setFeedbackType] = useState('general');
  const [rating, setRating] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Feedback types
  const feedbackTypes = [
    { id: 'general', label: 'General Feedback', description: 'Share your overall experience with SureSavings' },
    { id: 'feature', label: 'Feature Request', description: 'Suggest a new feature or improvement' },
    { id: 'bug', label: 'Bug Report', description: 'Report an issue or error you encountered' },
    { id: 'usability', label: 'Usability Feedback', description: 'Tell us about your experience using the platform' },
    { id: 'other', label: 'Other', description: 'Any other feedback you\'d like to share' }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting feedback:', {
      type: feedbackType,
      rating,
      text: feedbackText,
      attachments: attachments.map(file => file.name),
      anonymous: isAnonymous
    });
    
    // In a real app, this would submit the feedback to the backend
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      setFeedbackType('general');
      setRating(null);
      setFeedbackText('');
      setAttachments([]);
      setIsAnonymous(false);
    }, 5000);
  };

  const renderRatingStars = () => {
    return (
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`p-1 rounded-full transition-colors ${
              rating && star <= rating ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'
            }`}
          >
            <Star className="h-8 w-8 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  const renderEmotionRating = () => {
    const emotions = [
      { value: 1, icon: Frown, label: 'Very Dissatisfied', color: 'text-red-500' },
      { value: 2, icon: Meh, label: 'Dissatisfied', color: 'text-orange-500' },
      { value: 3, icon: Meh, label: 'Neutral', color: 'text-yellow-500' },
      { value: 4, icon: Smile, label: 'Satisfied', color: 'text-green-500' },
      { value: 5, icon: Heart, label: 'Very Satisfied', color: 'text-pink-500' }
    ];

    return (
      <div className="flex flex-wrap justify-center gap-4">
        {emotions.map((emotion) => {
          const Icon = emotion.icon;
          return (
            <button
              key={emotion.value}
              type="button"
              onClick={() => setRating(emotion.value)}
              className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                rating === emotion.value 
                  ? `${emotion.color} bg-gray-100` 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon className="h-8 w-8" />
              <span className="text-xs mt-1">{emotion.label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <img 
                src="/image.png" 
                alt="Feedback Mascot" 
                className="w-12 h-12 animate-float"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))' }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Send Feedback</h1>
              <p className="text-gray-600">Share your thoughts and suggestions to help us improve the platform</p>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          {showSuccessMessage ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You for Your Feedback!</h2>
              <p className="text-gray-600 mb-6">
                Your feedback is valuable to us and helps us improve SureSavings for everyone.
              </p>
              <button
                onClick={() => setShowSuccessMessage(false)}
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
              >
                Send Another Feedback
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Feedback Type */}
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  What type of feedback would you like to share?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {feedbackTypes.map((type) => (
                    <div key={type.id}>
                      <label className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${
                        feedbackType === type.id 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-200 hover:border-primary-300'
                      }`}>
                        <input
                          type="radio"
                          name="feedbackType"
                          value={type.id}
                          checked={feedbackType === type.id}
                          onChange={() => setFeedbackType(type.id)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 mt-1"
                        />
                        <div className="ml-3">
                          <span className="block font-medium text-gray-900">{type.label}</span>
                          <span className="block text-sm text-gray-500">{type.description}</span>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  How would you rate your experience?
                </label>
                <div className="flex flex-col items-center space-y-6">
                  {renderRatingStars()}
                  <div className="text-sm text-gray-500">
                    {rating === 1 && 'Very Poor'}
                    {rating === 2 && 'Poor'}
                    {rating === 3 && 'Average'}
                    {rating === 4 && 'Good'}
                    {rating === 5 && 'Excellent'}
                    {!rating && 'Select a rating'}
                  </div>
                </div>
              </div>

              {/* Feedback Text */}
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  Please share your feedback in detail
                </label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Tell us what you like, what could be improved, or any ideas you have..."
                ></textarea>
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  Add screenshots or files (optional)
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
                
                {attachments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {attachments.map((file, index) => (
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

              {/* Anonymous Option */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={() => setIsAnonymous(!isAnonymous)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="anonymous" className="text-sm text-gray-700">
                  Submit feedback anonymously
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                <Send className="h-5 w-5" />
                <span>Submit Feedback</span>
              </button>

              <div className="text-center text-sm text-gray-500">
                Your feedback helps us improve SureSavings for everyone. Thank you for taking the time to share your thoughts!
              </div>
            </form>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-2 mb-6">
            <img src="/image.png" alt="Other Ways Mascot" className="w-5 h-5" />
            <h2 className="text-xl font-semibold text-gray-900">Other Ways to Reach Us</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Live Chat</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">Chat with our support team in real-time</p>
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">Available 24/7</span>
              </div>
              <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                Start Chat
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Email</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">Send us a detailed message</p>
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">Response within 24 hours</span>
              </div>
              <a 
                href="mailto:feedback@suresavings.com"
                className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Email Us
              </a>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <HelpCircle className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Help Center</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">Browse our knowledge base</p>
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">Self-service support</span>
              </div>
              <a 
                href="/help"
                className="block w-full text-center bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Visit Help Center
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendFeedback;