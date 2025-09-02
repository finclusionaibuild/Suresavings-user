import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isAgent: boolean;
  kycTier: number;
  totalSavings: number;
  totalInvestments: number;
  rewardPoints: number;
  profilePicture?: string;
  accountType: 'basic' | 'premium' | 'admin' | 'super_admin' | 'agent';
  joinDate: string;
  lastLogin: string;
  status: 'active' | 'suspended' | 'pending';
  referralCode?: string;
  referrals?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Demo accounts for different user types
const demoAccounts = {
  // Regular User - Basic KYC
  'user@suresavings.com': {
    id: '1',
    email: 'user@suresavings.com',
    firstName: 'John',
    lastName: 'Doe',
    isAdmin: false,
    isSuperAdmin: false,
    isAgent: false,
    kycTier: 1,
    totalSavings: 125000,
    totalInvestments: 50000,
    rewardPoints: 850,
    profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    accountType: 'basic' as const,
    joinDate: '2024-06-15',
    lastLogin: '2025-01-15T10:30:00Z',
    status: 'active' as const,
    referralCode: 'JOHNDOE123',
    referrals: 3
  },
  
  // Premium User - Full KYC
  'premium@suresavings.com': {
    id: '2',
    email: 'premium@suresavings.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    isAdmin: false,
    isSuperAdmin: false,
    isAgent: false,
    kycTier: 3,
    totalSavings: 750000,
    totalInvestments: 450000,
    rewardPoints: 2850,
    profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    accountType: 'premium' as const,
    joinDate: '2024-03-10',
    lastLogin: '2025-01-15T14:20:00Z',
    status: 'active' as const,
    referralCode: 'SARAHJ456',
    referrals: 8
  },

  // New User - Pending KYC
  'newuser@suresavings.com': {
    id: '3',
    email: 'newuser@suresavings.com',
    firstName: 'Michael',
    lastName: 'Chen',
    isAdmin: false,
    isSuperAdmin: false,
    isAgent: false,
    kycTier: 0,
    totalSavings: 15000,
    totalInvestments: 0,
    rewardPoints: 100,
    profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    accountType: 'basic' as const,
    joinDate: '2025-01-10',
    lastLogin: '2025-01-15T09:15:00Z',
    status: 'pending' as const,
    referralCode: 'MIKEC789',
    referrals: 0
  },

  // High Net Worth User
  'investor@suresavings.com': {
    id: '4',
    email: 'investor@suresavings.com',
    firstName: 'Amina',
    lastName: 'Bello',
    isAdmin: false,
    isSuperAdmin: false,
    isAgent: false,
    kycTier: 3,
    totalSavings: 2500000,
    totalInvestments: 1800000,
    rewardPoints: 8750,
    profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    accountType: 'premium' as const,
    joinDate: '2023-11-20',
    lastLogin: '2025-01-15T16:45:00Z',
    status: 'active' as const,
    referralCode: 'AMINAB234',
    referrals: 12
  },

  // Customer Support Admin
  'support@suresavings.com': {
    id: '5',
    email: 'support@suresavings.com',
    firstName: 'David',
    lastName: 'Support',
    isAdmin: true,
    isSuperAdmin: false,
    isAgent: false,
    kycTier: 3,
    totalSavings: 0,
    totalInvestments: 0,
    rewardPoints: 0,
    profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    accountType: 'admin' as const,
    joinDate: '2024-01-15',
    lastLogin: '2025-01-15T11:30:00Z',
    status: 'active' as const,
    referralCode: 'DAVIDS567',
    referrals: 0
  },

  // Regional Admin
  'admin@suresavings.com': {
    id: '6',
    email: 'admin@suresavings.com',
    firstName: 'Admin',
    lastName: 'User',
    isAdmin: true,
    isSuperAdmin: false,
    isAgent: false,
    kycTier: 3,
    totalSavings: 0,
    totalInvestments: 0,
    rewardPoints: 0,
    profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    accountType: 'admin' as const,
    joinDate: '2023-12-01',
    lastLogin: '2025-01-15T08:00:00Z',
    status: 'active' as const,
    referralCode: 'ADMIN890',
    referrals: 0
  },

  // Platform Super Admin
  'superadmin@suresavings.com': {
    id: '7',
    email: 'superadmin@suresavings.com',
    firstName: 'Super',
    lastName: 'Admin',
    isAdmin: true,
    isSuperAdmin: true,
    isAgent: false,
    kycTier: 3,
    totalSavings: 0,
    totalInvestments: 0,
    rewardPoints: 0,
    profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    accountType: 'super_admin' as const,
    joinDate: '2023-01-01',
    lastLogin: '2025-01-15T07:30:00Z',
    status: 'active' as const,
    referralCode: 'SUPER123',
    referrals: 0
  },
  
  // Agent Account
  'agent@suresavings.com': {
    id: '8',
    email: 'agent@suresavings.com',
    firstName: 'Agent',
    lastName: 'Manager',
    isAdmin: false,
    isSuperAdmin: false,
    isAgent: true,
    kycTier: 3,
    totalSavings: 350000,
    totalInvestments: 150000,
    rewardPoints: 1500,
    profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    accountType: 'agent' as const,
    joinDate: '2024-05-15',
    lastLogin: '2025-01-15T09:45:00Z',
    status: 'active' as const,
    referralCode: 'AGENT456',
    referrals: 25
  },
  
  // Field Agent Account
  'fieldagent@suresavings.com': {
    id: '9',
    email: 'fieldagent@suresavings.com',
    firstName: 'Field',
    lastName: 'Agent',
    isAdmin: false,
    isSuperAdmin: false,
    isAgent: true,
    kycTier: 2,
    totalSavings: 180000,
    totalInvestments: 75000,
    rewardPoints: 800,
    profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    accountType: 'agent' as const,
    joinDate: '2024-07-20',
    lastLogin: '2025-01-15T08:30:00Z',
    status: 'active' as const,
    referralCode: 'FIELD789',
    referrals: 15
  },
  
  // Group Savings Admin
  'groupadmin@suresavings.com': {
    id: '10',
    email: 'groupadmin@suresavings.com',
    firstName: 'Group',
    lastName: 'Admin',
    isAdmin: true,
    isSuperAdmin: false,
    isAgent: false,
    kycTier: 3,
    totalSavings: 0,
    totalInvestments: 0,
    rewardPoints: 0,
    profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    accountType: 'admin' as const,
    joinDate: '2024-04-01',
    lastLogin: '2025-01-15T11:20:00Z',
    status: 'active' as const,
    referralCode: 'GROUP123',
    referrals: 0
  },
  
  // Developer Account
  'developer@suresavings.com': {
    id: '11',
    email: 'developer@suresavings.com',
    firstName: 'Developer',
    lastName: 'User',
    isAdmin: false,
    isSuperAdmin: false,
    isAgent: false,
    kycTier: 3,
    totalSavings: 100000,
    totalInvestments: 200000,
    rewardPoints: 500,
    profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    accountType: 'basic' as const,
    joinDate: '2024-02-01',
    lastLogin: '2025-01-15T16:00:00Z',
    status: 'active' as const,
    referralCode: 'DEV456',
    referrals: 5
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('suresavings_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check demo accounts
      const demoUser = demoAccounts[email as keyof typeof demoAccounts];
      
      if (demoUser && password === 'demo123') {
        setUser(demoUser);
        localStorage.setItem('suresavings_user', JSON.stringify(demoUser));
        return true;
      }
      
      // Fallback for any other email with demo123 password
      if (password === 'demo123') {
        const mockUser: User = {
          id: Date.now().toString(),
          email,
          firstName: 'Demo',
          lastName: 'User',
          isAdmin: email.includes('admin'),
          isSuperAdmin: email.includes('superadmin'),
          isAgent: email.includes('agent'),
          kycTier: 2,
          totalSavings: 250000,
          totalInvestments: 150000,
          rewardPoints: 1250,
          profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          accountType: email.includes('admin') ? 'admin' : email.includes('agent') ? 'agent' : 'basic',
          joinDate: '2024-08-15',
          lastLogin: new Date().toISOString(),
          status: 'active',
          referralCode: 'DEMO' + Math.floor(1000 + Math.random() * 9000),
          referrals: Math.floor(Math.random() * 10)
        };

        setUser(mockUser);
        localStorage.setItem('suresavings_user', JSON.stringify(mockUser));
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        isAdmin: false,
        isSuperAdmin: false,
        isAgent: false,
        kycTier: 1,
        totalSavings: 0,
        totalInvestments: 0,
        rewardPoints: 100, // Welcome bonus
        accountType: 'basic',
        joinDate: new Date().toISOString().split('T')[0],
        lastLogin: new Date().toISOString(),
        status: 'active',
        referralCode: userData.firstName.substring(0, 4).toUpperCase() + Math.floor(1000 + Math.random() * 9000),
        referrals: 0
      };

      setUser(newUser);
      localStorage.setItem('suresavings_user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('suresavings_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};