import React, { useState, useRef, useEffect } from 'react';
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
  X,
  Loader,
  Navigation,
  Users,
  Mail,
  Phone
} from 'lucide-react';

interface EnhancedKYCFlowProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: number;
  targetTier: number;
  onComplete: (tier: number) => void;
}

interface GeolocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  address?: string;
}

interface OCRResult {
  extractedText: string;
  confidence: number;
  addressLines: string[];
  suggestedAddress: string;
}

interface SocialAttester {
  name: string;
  email: string;
  phone: string;
  relationship: string;
  status: 'pending' | 'verified' | 'declined';
}

const EnhancedKYCFlow: React.FC<EnhancedKYCFlowProps> = ({
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
  const [geolocation, setGeolocation] = useState<GeolocationData | null>(null);
  const [ocrResult, setOCRResult] = useState<OCRResult | null>(null);
  const [socialAttesters, setSocialAttesters] = useState<SocialAttester[]>([
    { name: '', email: '', phone: '', relationship: '', status: 'pending' },
    { name: '', email: '', phone: '', relationship: '', status: 'pending' }
  ]);

  const [formData, setFormData] = useState({
    bvn: '',
    nin: '',
    documentType: 'utility_bill',
    documentImage: null as File | null,
    livenessPhoto: null as File | null,
    address: '',
    selectedAddress: '',
    verificationMethod: 'document' // 'document' or 'social'
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
      { id: 'verification-method', title: 'Verification Method', component: 'verification-method' },
      { id: 'document-type', title: 'Document Type', component: 'document-type' },
      { id: 'document-upload', title: 'Upload Document', component: 'document-upload' },
      { id: 'geolocation-check', title: 'Location Verification', component: 'geolocation-check' },
      { id: 'address-selection', title: 'Select Address', component: 'address-selection' },
      { id: 'social-attestation', title: 'Social Attestation', component: 'social-attestation' },
      { id: 'address-processing', title: 'Verification', component: 'processing' }
    ]
  };

  const currentTierSteps = tierSteps[targetTier as keyof typeof tierSteps] || [];

  useEffect(() => {
    if (targetTier === 3 && currentStep >= 4) {
      requestGeolocation();
    }
  }, [currentStep, targetTier]);

  const requestGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeolocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          setErrorMessage('Unable to access your location. Please enable location services.');
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    }
  };

  const performOCR = async (file: File): Promise<OCRResult> => {
    // Simulate OCR processing
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          extractedText: 'Sample extracted text from utility bill...',
          confidence: 94,
          addressLines: ['123 Sample Street', 'Victoria Island', 'Lagos State'],
          suggestedAddress: '123 Sample Street, Victoria Island, Lagos State, Nigeria'
        });
      }, 2000);
    });
  };

  const verifyAddressProximity = (extractedAddress: string, currentLocation: GeolocationData): boolean => {
    // Simulate address proximity verification
    // In production, this would use Google Maps Geocoding API
    return Math.random() > 0.2; // 80% success rate for demo
  };

  const sendSocialAttestationRequests = async (attesters: SocialAttester[]) => {
    // Simulate sending email requests to social attesters
    console.log('Sending attestation requests to:', attesters);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  };

  const handleNext = async () => {
    if (currentStep < currentTierSteps.length - 1) {
      // Handle special processing for document upload
      if (currentTierSteps[currentStep].component === 'document-upload' && formData.documentImage) {
        setIsProcessing(true);
        try {
          const result = await performOCR(formData.documentImage);
          setOCRResult(result);
        } catch (error) {
          setErrorMessage('Failed to process document. Please try again.');
        } finally {
          setIsProcessing(false);
        }
      }
      
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
    
    try {
      // Simulate ID Certify API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // For Tier 3, handle different verification methods
      if (targetTier === 3) {
        if (formData.verificationMethod === 'social') {
          await sendSocialAttestationRequests(socialAttesters);
          setVerificationComplete(true);
          setTimeout(() => {
            onComplete(targetTier);
          }, 3000);
        } else {
          // Document verification with geolocation
          if (geolocation && ocrResult) {
            const proximityMatch = verifyAddressProximity(ocrResult.suggestedAddress, geolocation);
            if (proximityMatch) {
              setVerificationComplete(true);
              setTimeout(() => {
                onComplete(targetTier);
              }, 3000);
            } else {
              setVerificationFailed(true);
              setErrorMessage('Address verification failed. The document address does not match your current location.');
            }
          }
        }
      } else {
        // Tier 1 and 2 verification
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
      bvn: [
        { name: 'SureSavings', icon: '/image.png', color: 'bg-primary-500' },
        { name: 'ID Certify', icon: Shield, color: 'bg-blue-500' },
        { name: 'BVN Database', icon: FileText, color: 'bg-green-500' }
      ],
      nin: [
        { name: 'SureSavings', icon: '/image.png', color: 'bg-primary-500' },
        { name: 'ID Certify', icon: Shield, color: 'bg-blue-500' },
        { name: 'NIN Database', icon: CreditCard, color: 'bg-purple-500' }
      ],
      address: [
        { name: 'SureSavings', icon: '/image.png', color: 'bg-primary-500' },
        { name: 'ID Certify', icon: Shield, color: 'bg-blue-500' },
        { name: 'Address DB', icon: MapPin, color: 'bg-orange-500' }
      ]
    };

    const currentFlow = flows[step as keyof typeof flows] || flows.bvn;

    return (
      <div className="flex items-center justify-center space-x-4 my-8">
        {currentFlow.map((item, index) => (
          <React.Fragment key={item.name}>
            <div className="flex flex-col items-center">
              <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mb-2 animate-pulse`}>
                {typeof item.icon === 'string' ? (
                  <img src={item.icon} alt={item.name} className="w-8 h-8" />
                ) : (
                  <item.icon className="w-8 h-8 text-white" />
                )}
              </div>
              <span className="text-xs font-medium text-gray-700">{item.name}</span>
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
              <ul className="text-sm text-blue-800 space-y-1 text-left">
                <li>• Enter your 11-digit BVN</li>
                <li>• Take a clear selfie for verification</li>
                <li>• Verification usually takes 30 seconds</li>
                <li>• Your data is encrypted and secure</li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-green-900 mb-2">Data Safety:</h4>
              <ul className="text-sm text-green-800 space-y-1 text-left">
                <li>• We use bank-level encryption</li>
                <li>• BVN is never stored permanently</li>
                <li>• Only used for verification through ID Certify</li>
                <li>• Compliant with CBN regulations</li>
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
                onChange={(e) => setFormData(prev => ({ ...prev, bvn: e.target.value.replace(/\D/g, '') }))}
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
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, livenessPhoto: null }))}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Retake Photo
                  </button>
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
                  <p className="text-sm text-gray-500">
                    Please smile and look directly at the camera
                  </p>
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
                <li>• Make sure your face fills the frame</li>
              </ul>
            </div>
          </div>
        );

      case 'verification-method':
        return (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Verification Method</h3>
            <p className="text-gray-600 mb-6">
              Select how you'd like to verify your address. Both methods are secure and reliable.
            </p>
            
            <div className="space-y-4">
              <label className={`flex items-start p-6 border rounded-lg cursor-pointer transition-colors ${
                formData.verificationMethod === 'document' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-primary-300'
              }`}>
                <input
                  type="radio"
                  name="verificationMethod"
                  value="document"
                  checked={formData.verificationMethod === 'document'}
                  onChange={(e) => setFormData(prev => ({ ...prev, verificationMethod: e.target.value }))}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 mt-1"
                />
                <div className="ml-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <FileText className="h-6 w-6 text-primary-600" />
                    <span className="font-semibold text-gray-900">Document Verification</span>
                  </div>
                  <p className="text-gray-600 mb-3">
                    Upload an official document like utility bill, driver's license, or passport. 
                    We'll use OCR technology to extract and verify your address.
                  </p>
                  <div className="bg-white rounded-lg p-3">
                    <h5 className="font-medium text-gray-900 mb-2">Process:</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Upload document photo</li>
                      <li>• OCR extracts address automatically</li>
                      <li>• Verify location matches current GPS</li>
                      <li>• Instant verification (2-3 minutes)</li>
                    </ul>
                  </div>
                </div>
              </label>

              <label className={`flex items-start p-6 border rounded-lg cursor-pointer transition-colors ${
                formData.verificationMethod === 'social' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-primary-300'
              }`}>
                <input
                  type="radio"
                  name="verificationMethod"
                  value="social"
                  checked={formData.verificationMethod === 'social'}
                  onChange={(e) => setFormData(prev => ({ ...prev, verificationMethod: e.target.value }))}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 mt-1"
                />
                <div className="ml-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Users className="h-6 w-6 text-blue-600" />
                    <span className="font-semibold text-gray-900">Social Attestation</span>
                  </div>
                  <p className="text-gray-600 mb-3">
                    Have two trusted contacts verify your address. They'll receive email requests 
                    and can confirm your address details.
                  </p>
                  <div className="bg-white rounded-lg p-3">
                    <h5 className="font-medium text-gray-900 mb-2">Process:</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Provide two trusted contacts</li>
                      <li>• They receive verification emails</li>
                      <li>• Both must confirm your address</li>
                      <li>• Verification takes 24-48 hours</li>
                    </ul>
                  </div>
                </div>
              </label>
            </div>
          </div>
        );

      case 'geolocation-check':
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Navigation className="w-10 h-10 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Location Verification</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We need to verify that your current location matches the address on your document. 
              This adds an extra layer of security to your verification.
            </p>
            
            {geolocation ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold text-green-900 mb-2">Location Captured Successfully!</h4>
                <p className="text-green-800">
                  We've captured your current location with {geolocation.accuracy.toFixed(0)}m accuracy.
                  This will be compared with your document address.
                </p>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <Loader className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
                <h4 className="font-semibold text-blue-900 mb-2">Accessing Your Location...</h4>
                <p className="text-blue-800">
                  Please allow location access when prompted. This helps us verify your address 
                  matches your document for enhanced security.
                </p>
              </div>
            )}

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900">Privacy Notice</h4>
                  <p className="text-sm text-yellow-800">
                    Your location data is only used for address verification and is not stored permanently. 
                    We comply with all data protection regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'social-attestation':
        return (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Social Address Attestation</h3>
            <p className="text-gray-600 mb-6">
              Provide two trusted contacts who can verify your address. They'll receive email requests 
              to confirm your address details.
            </p>

            <div className="space-y-6">
              {socialAttesters.map((attester, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Attester {index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={attester.name}
                        onChange={(e) => {
                          const newAttesters = [...socialAttesters];
                          newAttesters[index].name = e.target.value;
                          setSocialAttesters(newAttesters);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Attester's full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Relationship *</label>
                      <select
                        value={attester.relationship}
                        onChange={(e) => {
                          const newAttesters = [...socialAttesters];
                          newAttesters[index].relationship = e.target.value;
                          setSocialAttesters(newAttesters);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Select relationship</option>
                        <option value="family">Family Member</option>
                        <option value="friend">Friend</option>
                        <option value="colleague">Colleague</option>
                        <option value="neighbor">Neighbor</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        value={attester.email}
                        onChange={(e) => {
                          const newAttesters = [...socialAttesters];
                          newAttesters[index].email = e.target.value;
                          setSocialAttesters(newAttesters);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="attester@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        value={attester.phone}
                        onChange={(e) => {
                          const newAttesters = [...socialAttesters];
                          newAttesters[index].phone = e.target.value;
                          setSocialAttesters(newAttesters);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="+234 800 000 0000"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">What happens next?</h4>
                  <p className="text-sm text-blue-800">
                    Your attesters will receive an email with a secure link to verify your address. 
                    Once both attesters confirm, your verification will be complete. This usually takes 24-48 hours.
                  </p>
                </div>
              </div>
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
                <h3 className="text-2xl font-bold text-green-900">Verification Complete! ✨</h3>
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
                        <li>• Customer support access</li>
                      </>
                    )}
                    {targetTier === 2 && (
                      <>
                        <li>• ₦500,000 daily transaction limit</li>
                        <li>• Investment opportunities</li>
                        <li>• Premium customer support</li>
                        <li>• Group savings access</li>
                      </>
                    )}
                    {targetTier === 3 && (
                      <>
                        <li>• ₦10,000,000 daily transaction limit</li>
                        <li>• All investment products</li>
                        <li>• VIP customer support</li>
                        <li>• Exclusive savings rates</li>
                        <li>• Virtual cards</li>
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
                    <li>• Make sure your location services are enabled</li>
                    <li>• Contact support if issues persist</li>
                    <li>• Try again in a few minutes</li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    setVerificationFailed(false);
                    setCurrentStep(0);
                    setErrorMessage('');
                  }}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : null}
          </div>
        );

      // Add other step components here...
      default:
        return (
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Step in Progress</h3>
            <p className="text-gray-600">This step is being processed...</p>
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-100 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Enhanced KYC Verification</h2>
              <p className="text-sm text-gray-500">Tier {targetTier} Verification powered by ID Certify</p>
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
                (currentTierSteps[currentStep]?.component === 'document-upload' && !formData.documentImage) ||
                (currentTierSteps[currentStep]?.component === 'social-attestation' && 
                 socialAttesters.some(a => !a.name || !a.email || !a.relationship))
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

export default EnhancedKYCFlow;