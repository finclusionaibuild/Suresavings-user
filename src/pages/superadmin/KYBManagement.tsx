import React, { useState } from 'react';
import {
  Building,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  User,
  CreditCard,
  Home,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Flag,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Upload,
  Paperclip
} from 'lucide-react';

const KYBManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const kybApplications = [
    {
      id: 1,
      businessName: 'TechCorp Solutions Ltd',
      businessEmail: 'admin@techcorp.com',
      status: 'pending',
      submittedDate: '2025-01-15T10:30:00Z',
      requestedTier: 2,
      businessType: 'Technology'
    },
    {
      id: 2,
      businessName: 'Green Energy Ltd',
      businessEmail: 'info@greenenergy.com',
      status: 'under_review',
      submittedDate: '2025-01-14T14:20:00Z',
      requestedTier: 3,
      businessType: 'Energy'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">KYB Management</h1>
          <p className="text-gray-600">Manage business verification applications</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">KYB Applications</h3>
          <div className="space-y-4">
            {kybApplications.map((application) => (
              <div key={application.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900">{application.businessName}</h4>
                <p className="text-gray-600">{application.businessEmail}</p>
                <p className="text-gray-600">Status: {application.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYBManagement;