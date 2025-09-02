import React, { useState } from 'react';
import {
  HardDrive,
  Database,
  RefreshCw,
  Download,
  Upload,
  Calendar,
  Clock,
  Search,
  Filter,
  Plus,
  Eye,
  Play,
  Trash2,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Server,
  Archive,
  RotateCcw
} from 'lucide-react';

const BackupRecovery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const backups = [
    {
      id: 1,
      name: 'Daily Full Backup',
      type: 'Full',
      status: 'completed',
      size: '850GB',
      createdDate: '2025-01-15T12:30:00Z',
      retention: '30 days',
      location: 'Cloud Storage'
    },
    {
      id: 2,
      name: 'Weekly Full Backup',
      type: 'Full',
      status: 'completed',
      size: '1.2TB',
      createdDate: '2025-01-14T01:00:00Z',
      retention: '90 days',
      location: 'Cloud Storage'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Backup & Recovery</h1>
          <p className="text-gray-600">Manage system backups and recovery procedures</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup History</h3>
          <div className="space-y-4">
            {backups.map((backup) => (
              <div key={backup.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900">{backup.name}</h4>
                <p className="text-gray-600">{backup.type} - {backup.size}</p>
                <p className="text-gray-600">Status: {backup.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupRecovery;