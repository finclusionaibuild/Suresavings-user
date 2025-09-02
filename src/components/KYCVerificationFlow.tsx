import React, { useState, useRef } from 'react';
import { 
  Shield, 
  Camera, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft,
  Eye,
  EyeOff,
  MapPin,
  FileText,
  CreditCard,
  User,
  Sparkles,
  RefreshCw,
  X
} from 'lucide-react';

interface KYCVerificationFlowProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: number;
  targetTier: number;
  onComplete: (tier: number) => void;
}

const KYCVerificationFlow: React.FC<KYCVerificationFlowProps> = ({
  isOpen,
  onClose,
  currentTier,
  targetTier,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [verificationFailed, setVerificationFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    bvn: '',
    nin: '',
    documentType: 'utility_bill',
    documentImage: null as File | null,
    livenessPhoto: null as File | null,
    address: '',
    selectedAddress: '',
    socialAttesters: ['', '']
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const tierSteps = {
    1: [
      { id: 'bvn-intro', title: 'BVN Verification', component: 'bvn-intro' },
      { id: 'bvn-input', title: 'Enter BVN', component: 'bvn-input' },
      { id: 'liveness-photo', title: 'Take Photo', component: 'liveness-photo' },
      { id: 'bvn-processing', title: 'Verification', component: 'processing' }
    ],
    2: [
      { id: 'nin-intro', title: 'NIN Verification', component: 'nin-intro' },
      { id: 'nin-input', title: 'Enter NIN', component: 'nin-input' },
      { id: 'nin-processing', title: 'Verification', component: 'processing' }
    ],
    3: [
      { id: 'address-intro', title: 'Address Verification', component: 'address-intro' },
      { id: 'document-type', title: 'Document Type', component: 'document-type' },
      { id: 'document-upload', title: 'Upload Document', component: 'document-upload' },
      { id: 'address-selection', title: 'Select Address', component: 'address-selection' },
      { id: 'social-attestation', title: 'Social Attestation', component: 'social-attestation' },
      { id: 'address-processing', title: 'Verification', component: 'processing' }
    ]
  };

  const currentTierSteps = tierSteps[targetTier as keyof typeof tierSteps] || [];

  const handleNext = () => {
    if (currentStep < currentTierSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    
    // Simulate API call to ID Certify
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate success/failure
      const success = Math.random() > 0.1; // 90% success rate for demo
      
      if (success) {
        setVerificationComplete(true);
        setTimeout(() => {
          onComplete(targetTier);
        }, 3000);
      } else {
        setVerificationFailed(true);
        setErrorMessage('Verification failed. Please check your information and try again.');
      }
    } catch (error) {
      setVerificationFailed(true);
      setErrorMessage('An error occurred during verification. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (file: File, type: 'document' | 'liveness') => {
    if (type === 'document') {
      setFormData(prev => ({ ...prev, documentImage: file }));
    } else {
      setFormData(prev => ({ ...prev, livenessPhoto: file }));
    }
  };

  const renderAnimatedFlow = (step: string) => {
    const flows = {
      bvn: ['SureSavings', 'ID Certify', 'BVN Database'],
      nin: ['SureSavings', 'ID Certify', 'NIN Database'],
      address: ['SureSavings', 'ID Certify', 'Address DB']
    };

    const currentFlow = flows[step as keyof typeof flows] || flows.bvn;

    return (
      <div className="flex items-center justify-center space-x-4 my-8">
        {currentFlow.map((item, index) => (
          <React.Fragment key={item}>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-2 animate-pulse">
                {index === 0 && <img src="/image.png" alt="SureSavings" className="w-8 h-8" />}
                {index === 1 && <Shield className="w-8 h-8 text-primary-600" />}
                {index === 2 && <FileText className="w-8 h-8 text-blue-600" />}
              </div>
              <span className="text-xs font-medium text-gray-700">{item}</span>
            </div>
            {index < currentFlow.length - 1 && (
              <div className="flex-1 h-0.5 bg-primary-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-500 animate-pulse"></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderStepContent = () => {
    const step = currentTierSteps[currentStep];
    if (!step) return null;

    switch (step.component) {
      case 'bvn-intro':
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">BVN Verification</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We'll verify your Bank Verification Number (BVN) to confirm your identity. 
              This is required by Nigerian banking regulations and helps keep your account secure.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">What to expect:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Enter your 11-digit BVN</li>
                <li>• Take a clear selfie for verification</li>
                <li>• Verification usually takes 30 seconds</li>
                <li>• Your data is encrypted and secure</li>
              </ul>
            </div>
            {renderAnimatedFlow('bvn')}
          </div>
        );

      case 'bvn-input':
        return (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Enter Your BVN</h3>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Verification Number (BVN)
              </label>
              <input
                type="text"
                value={formData.bvn}
                onChange={(e) => setFormData(prev => ({ ...prev, bvn: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your 11-digit BVN"
                maxLength={11}
              />
              <p className="text-xs text-gray-500 mt-2">
                Don't have your BVN? Dial *565*0# from your registered phone number
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">Your data is safe</h4>
                  <p className="text-sm text-green-800">
                    We use bank-level encryption and never store your BVN permanently. 
                    It's only used for verification through ID Certify.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'liveness-photo':
        return (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Take a Selfie</h3>
            <p className="text-gray-600 mb-6">
              Take a clear photo of yourself to verify your identity. Make sure your face is clearly visible.
            </p>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
              {formData.livenessPhoto ? (
                <div className="space-y-4">
                  <img 
                    src={URL.createObjectURL(formData.livenessPhoto)} 
                    alt="Selfie" 
                    className="w-32 h-32 rounded-full object-cover mx-auto"
                  />
                  <p className="text-green-600 font-medium">Photo captured successfully!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto" />
                  <div>
                    <button
                      onClick={() => cameraRef.current?.click()}
                      className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Take Photo
                    </button>
                    <input
                      ref={cameraRef}
                      type="file"
                      accept="image/*"
                      capture="user"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'liveness')}
                      className="hidden"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">Photo Guidelines:</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Look directly at the camera</li>
                <li>• Ensure good lighting</li>
                <li>• Remove glasses or hats if possible</li>
                <li>• Keep a neutral expression</li>
              </ul>
            </div>
          </div>
        );

      case 'nin-intro':
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">NIN Verification</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We'll verify your National Identification Number (NIN) for enhanced security and 
              to unlock higher transaction limits on your account.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">What to expect:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Enter your 11-digit NIN</li>
                <li>• Instant verification with NIMC database</li>
                <li>• Unlock Tier 2 benefits</li>
                <li>• Higher transaction limits</li>
              </ul>
            </div>
            {renderAnimatedFlow('nin')}
          </div>
        );

      case 'nin-input':
        return (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Enter Your NIN</h3>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                National Identification Number (NIN)
              </label>
              <input
                type="text"
                value={formData.nin}
                onChange={(e) => setFormData(prev => ({ ...prev, nin: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your 11-digit NIN"
                maxLength={11}
              />
              <p className="text-xs text-gray-500 mt-2">
                Don't have your NIN? Visit any NIMC enrollment center or check your NIN slip
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">Secure Verification</h4>
                  <p className="text-sm text-green-800">
                    Your NIN is verified through ID Certify's secure connection to NIMC. 
                    We don't store your NIN after verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'address-intro':
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Address Verification</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Complete your address verification to unlock Tier 3 benefits including higher limits 
              and premium investment options.
            </p>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-purple-900 mb-2">Verification options:</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Upload utility bill or official document</li>
                <li>• OCR technology extracts address automatically</li>
                <li>• Geolocation verification for accuracy</li>
                <li>• Social attestation from trusted contacts</li>
              </ul>
            </div>
            {renderAnimatedFlow('address')}
          </div>
        );

      case 'document-type':
        return (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Select Document Type</h3>
            <p className="text-gray-600 mb-6">
              Choose the type of document you'll upload for address verification.
            </p>
            
            <div className="space-y-3">
              {[
                { value: 'utility_bill', label: 'Utility Bill', desc: 'Electricity, water, or gas bill' },
                { value: 'drivers_license', label: 'Driver\'s License', desc: 'Valid Nigerian driver\'s license' },
                { value: 'passport', label: 'International Passport', desc: 'Nigerian international passport' },
                { value: 'others', label: 'Other Documents', desc: 'Bank statement, tenancy agreement, etc.' }
              ].map((option) => (
                <label key={option.value} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                  formData.documentType === option.value 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 hover:border-primary-300'
                }`}>
                  <input
                    type="radio"
                    name="documentType"
                    value={option.value}
                    checked={formData.documentType === option.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, documentType: e.target.value }))}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <div className="ml-3">
                    <span className="block font-medium text-gray-900">{option.label}</span>
                    <span className="block text-sm text-gray-500">{option.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );

      case 'document-upload':
        return (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Upload Document</h3>
            <p className="text-gray-600 mb-6">
              Upload a clear photo of your {formData.documentType.replace('_', ' ')}. 
              Our OCR technology will automatically extract your address.
            </p>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
              {formData.documentImage ? (
                <div className="space-y-4">
                  <img 
                    src={URL.createObjectURL(formData.documentImage)} 
                    alt="Document" 
                    className="max-w-full h-48 object-contain mx-auto rounded-lg"
                  />
                  <p className="text-green-600 font-medium">Document uploaded successfully!</p>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, documentImage: null }))}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove and upload different document
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-16 h-16 text-gray-400 mx-auto" />
                  <div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Upload Document
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'document')}
                      className="hidden"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Supported formats: JPG, PNG, PDF (Max 5MB)
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">Document Guidelines:</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Ensure all text is clearly readable</li>
                <li>• Document should be recent (within 3 months)</li>
                <li>• Address must match your current location</li>
                <li>• Avoid shadows or glare on the document</li>
              </ul>
            </div>
          </div>
        );

      case 'processing':
        return (
          <div className="text-center">
            {isProcessing ? (
              <div className="space-y-6">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                  <RefreshCw className="w-10 h-10 text-primary-600 animate-spin" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Verifying...</h3>
                <p className="text-gray-600">
                  Please wait while we verify your information with ID Certify. 
                  This usually takes 30-60 seconds.
                </p>
                {renderAnimatedFlow(targetTier === 1 ? 'bvn' : targetTier === 2 ? 'nin' : 'address')}
              </div>
            ) : verificationComplete ? (
              <div className="space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-yellow-400 animate-ping" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-green-900">Good Job!</h3>
                <h4 className="text-xl font-semibold text-gray-900">Verification Complete ✨</h4>
                <p className="text-gray-600">
                  Congratulations! You've successfully completed Tier {targetTier} verification. 
                  You now have access to enhanced features and higher limits.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">What's unlocked:</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    {targetTier === 1 && (
                      <>
                        <li>• ₦50,000 daily transaction limit</li>
                        <li>• Basic savings plans access</li>
                        <li>• Mobile app features</li>
                      </>
                    )}
                    {targetTier === 2 && (
                      <>
                        <li>• ₦500,000 daily transaction limit</li>
                        <li>• Investment opportunities</li>
                        <li>• Premium customer support</li>
                      </>
                    )}
                    {targetTier === 3 && (
                      <>
                        <li>• ₦10,000,000 daily transaction limit</li>
                        <li>• All investment products</li>
                        <li>• VIP customer support</li>
                        <li>• Exclusive savings rates</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            ) : verificationFailed ? (
              <div className="space-y-6">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-red-900">Verification Failed</h3>
                <p className="text-gray-600">{errorMessage}</p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">Next Steps:</h4>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Double-check your information</li>
                    <li>• Ensure documents are clear and readable</li>
                    <li>• Contact support if issues persist</li>
                    <li>• Try again in a few minutes</li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    setVerificationFailed(false);
                    setCurrentStep(0);
                  }}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : null}
          </div>
        );

      default:
        return (
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Step in Progress</h3>
            <p className="text-gray-600">This step is being implemented...</p>
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-100 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">KYC Verification</h2>
              <p className="text-sm text-gray-500">Tier {targetTier} Verification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep + 1} of {currentTierSteps.length}</span>
            <span>{Math.round(((currentStep + 1) / currentTierSteps.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / currentTierSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        {!verificationComplete && !isProcessing && (
          <div className="flex items-center justify-between p-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={
                (currentTierSteps[currentStep]?.component === 'bvn-input' && formData.bvn.length !== 11) ||
                (currentTierSteps[currentStep]?.component === 'nin-input' && formData.nin.length !== 11) ||
                (currentTierSteps[currentStep]?.component === 'liveness-photo' && !formData.livenessPhoto) ||
                (currentTierSteps[currentStep]?.component === 'document-upload' && !formData.documentImage)
              }
              className="flex items-center space-x-2 px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span>{currentStep === currentTierSteps.length - 1 ? 'Verify' : 'Next'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default KYCVerificationFlow;