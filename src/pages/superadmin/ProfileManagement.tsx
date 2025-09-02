import React, { useState } from 'react';
import {
  User,
  Users,
  Edit,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Crown,
  Building,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings
} from 'lucide-react';

const ProfileManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const profiles = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+234 801 234 5678',
      role: 'Individual User',
      status: 'active',
      kycTier: 2,
      joinDate: '2024-06-15',
      profileCompletion: 85
    },
    {
      id: 2,
      name: 'TechCorp Solutions Ltd',
      email: 'admin@techcorp.com',
      phone: '+234 802 345 6789',
      role: 'Business User',
      status: 'active',
      kycTier: 2,
      joinDate: '2024-01-20',
      profileCompletion: 95
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Management</h1>
          <p className="text-gray-600">Manage user profiles and personal information</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Profiles</h3>
          <div className="space-y-4">
            {profiles.map((profile) => (
              <div key={profile.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900">{profile.name}</h4>
                <p className="text-gray-600">{profile.email}</p>
                <p className="text-gray-600">{profile.role} | KYC Tier {profile.kycTier}</p>
                <p className="text-gray-600">Profile Completion: {profile.profileCompletion}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;