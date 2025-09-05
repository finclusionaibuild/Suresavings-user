import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  CheckCircle, 
  AlertTriangle, 
  Mail, 
  Phone, 
  CreditCard,
  ArrowRight,
  Eye,
  Settings,
  Users,
  TrendingUp,
  DollarSign,
  X
} from 'lucide-react';

interface AccessRestrictionGateProps {
  user: any;
  children: React.ReactNode;
  requiredVerifications?: string[];
  requiredKYCTier?: number;
  featureName?: string;
}

const AccessRestrictionGate: React.FC<AccessRestrictionGateProps> = ({
  user,
  children,
  requiredVerifications = ['email'],
  requiredKYCTier = 1,
  featureName = 'this feature'
}) => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Check if user meets requirements
  const hasEmailVerification = user?.emailVerified || false;
  const hasPhoneVerification = user?.phoneVerified || false;
  const currentKYCTier = user?.kycTier || 0;
  
  const meetsEmailRequirement = !requiredVerifications.includes('email') || hasEmailVerification;
  const meetsPhoneRequirement = !requiredVerifications.includes('phone') || hasPhoneVerification;
  const meetsKYCRequirement = currentKYCTier >= requiredKYCTier;
  
  const hasAccess = meetsEmailRequirement && meetsPhoneRequirement && meetsKYCRequirement;

  if (hasAccess) {
    return <>{children}</>;
  }

  const getVerificationStatus = (type: string) => {
    switch (type) {
      case 'email':
        return hasEmailVerification;
      case 'phone':
        return hasPhoneVerification;
      default:
        return false;
    }
  };

  const getVerificationIcon = (type: string) => {
    switch (type) {
      case 'email':
        return Mail;
      case 'phone':
        return Phone;
      case 'kyc':
        return Shield;
      default:
        return Lock;
    }
  };

  const getKYCTierBenefits = (tier: number) => {
    switch (tier) {
      case 1:
        return [
          'Basic savings plans',
          '₦50,000 daily limit',
          'Mobile app access',
          'Customer support'
        ];
      case 2:
        return [
          'Investment opportunities',
          '₦500,000 daily limit',
          'Premium support',
          'Group savings'
        ];
      case 3:
        return [
          'All investment products',
          '₦10,000,000 daily limit',
          'VIP support',
          'Virtual cards',
          'Exclusive rates'
        ];
      default:
        return [];
    }
  };

  const handleVerificationAction = (type: string) => {
    switch (type) {
      case 'email':
        console.log('Resending email verification');
        break;
      case 'phone':
        console.log('Starting phone verification');
        break;
      case 'kyc':
        setShowUpgradeModal(true);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Restriction Notice */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-yellow-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Verification Required</h2>
          <p className="text-gray-600 mb-8">
            To access {featureName}, please complete the required verifications below. 
            This helps us keep your account secure and comply with banking regulations.
          </p>

          {/* Verification Requirements */}
          <div className="space-y-4 mb-8">
            {requiredVerifications.includes('email') && (
              <div className={`flex items-center justify-between p-4 rounded-lg border ${
                hasEmailVerification 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-yellow-200 bg-yellow-50'
              }`}>
                <div className="flex items-center space-x-3">
                  <Mail className={`h-6 w-6 ${hasEmailVerification ? 'text-green-600' : 'text-yellow-600'}`} />
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Email Verification</h3>
                    <p className="text-sm text-gray-600">Verify your email address</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {hasEmailVerification ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <button
                      onClick={() => handleVerificationAction('email')}
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Verify Now
                    </button>
                  )}
                </div>
              </div>
            )}

            {requiredVerifications.includes('phone') && (
              <div className={`flex items-center justify-between p-4 rounded-lg border ${
                hasPhoneVerification 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-yellow-200 bg-yellow-50'
              }`}>
                <div className="flex items-center space-x-3">
                  <Phone className={`h-6 w-6 ${hasPhoneVerification ? 'text-green-600' : 'text-yellow-600'}`} />
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Phone Verification</h3>
                    <p className="text-sm text-gray-600">Verify your phone number</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {hasPhoneVerification ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <button
                      onClick={() => handleVerificationAction('phone')}
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Verify Now
                    </button>
                  )}
                </div>
              </div>
            )}

            {currentKYCTier < requiredKYCTier && (
              <div className="flex items-center justify-between p-4 rounded-lg border border-blue-200 bg-blue-50">
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-blue-600" />
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">KYC Tier {requiredKYCTier} Required</h3>
                    <p className="text-sm text-gray-600">
                      Current: Tier {currentKYCTier} | Required: Tier {requiredKYCTier}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleVerificationAction('kyc')}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Upgrade KYC
                </button>
              </div>
            )}
          </div>

          {/* Current Access Level */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Your Current Access Level</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">Tier {currentKYCTier}</div>
                <div className="text-sm text-gray-600">KYC Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {currentKYCTier === 0 ? '₦10K' : 
                   currentKYCTier === 1 ? '₦50K' : 
                   currentKYCTier === 2 ? '₦500K' : '₦10M'}
                </div>
                <div className="text-sm text-gray-600">Daily Limit</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.history.back()}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <span>Start Verification</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* KYC Upgrade Modal */}
        {showUpgradeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Upgrade Your KYC</h3>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-primary-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Upgrade to KYC Tier {requiredKYCTier}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Unlock higher limits and premium features
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-3">Benefits you'll unlock:</h5>
                  <ul className="space-y-2">
                    {getKYCTierBenefits(requiredKYCTier).map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-blue-900">Secure Process</h5>
                      <p className="text-sm text-blue-800">
                        Your verification is powered by ID Certify, ensuring your data is 
                        encrypted and processed securely according to banking standards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Maybe Later
                </button>
                <button
                  onClick={() => {
                    setShowUpgradeModal(false);
                    // Trigger KYC flow
                    console.log(`Starting KYC Tier ${requiredKYCTier} verification`);
                  }}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Start Verification
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessRestrictionGate;