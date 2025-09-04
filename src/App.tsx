import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import DashboardRouter from './components/DashboardRouter';
import SavingsPlans from './pages/SavingsPlans';
import InvestmentPage from './pages/InvestmentPage';
import TransactionHistory from './pages/TransactionHistory';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import GroupSavings from './pages/GroupSavings';
import AgentDashboard from './pages/AgentDashboard';
import { Suspense, lazy } from 'react';

const SuperAdminLanding = lazy(() => import('./components/user-types/SuperAdmin'));
const AdminLanding = lazy(() => import('./components/user-types/Admin'));
const AgentLanding = lazy(() => import('./components/user-types/Agent'));
const UserLanding = lazy(() => import('./components/user-types/User'));

// Import complete admin pages
import UserManagement from './pages/admin/UserManagement';
import TransactionMonitor from './pages/admin/TransactionMonitor';
import SavingsManagement from './pages/admin/SavingsManagement';
import InvestmentOversight from './pages/admin/InvestmentOversight';
import KYCVerification from './pages/admin/KYCVerification';
import Analytics from './pages/admin/Analytics';
import Compliance from './pages/admin/Compliance';
import SupportTickets from './pages/admin/SupportTickets';
import AdminSettings from './pages/admin/AdminSettings';
import EsusuManagement from './pages/admin/EsusuManagement';

// Import new admin pages
import PlanConfigurationEngine from './pages/admin/PlanConfigurationEngine';
import CommunicationManagement from './pages/admin/CommunicationManagement';
import FAQManagement from './pages/admin/FAQManagement';
import AccountSettingsManagement from './pages/admin/AccountSettingsManagement';
import RoleBasedAccessControl from './pages/admin/RoleBasedAccessControl';
import KYCManagement from './pages/admin/KYCManagement';
import KYBManagement from './pages/admin/KYBManagement';
import AdminUserManagement from './pages/admin/AdminManagement';

// Import complete super admin pages
import PlatformOverview from './pages/superadmin/PlatformOverview';
import RegionalManagement from './pages/superadmin/RegionalManagement';
import SuperAdminManagement from './pages/superadmin/AdminManagement';
import SystemHealth from './pages/superadmin/SystemHealth';
import SecurityCenter from './pages/superadmin/SecurityCenter';
import DatabaseManagement from './pages/superadmin/DatabaseManagement';
import PerformanceMonitor from './pages/superadmin/PerformanceMonitor';
import PlatformIntegrations from './pages/superadmin/PlatformIntegrations';
import BackupRecovery from './pages/superadmin/BackupRecovery';
import GlobalConfiguration from './pages/superadmin/GlobalConfiguration';
import SuperAdminRoleBasedAccessControl from './pages/superadmin/RoleBasedAccessControl';
import SuperAdminKYBManagement from './pages/superadmin/KYBManagement';
import WebhooksAPIConsole from './pages/superadmin/WebhooksAPIConsole';
import WalletManagement from './pages/superadmin/WalletManagement';
import NotificationsManagement from './pages/superadmin/NotificationsManagement';
import ProfileManagement from './pages/superadmin/ProfileManagement';

// Import complete user pages
import HelpCenter from './pages/user/HelpCenter';

// Import the previously placeholder pages that are now implemented
import Notifications from './pages/Notifications';
import ReferFriends from './pages/ReferFriends';
import VirtualCards from './pages/VirtualCards';
import RewardsPoints from './pages/RewardsPoints';
import ContactSupport from './pages/ContactSupport';
import FAQ from './pages/FAQ';
import SendFeedback from './pages/SendFeedback';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Suspense fallback={<div className="p-6">Loading...</div>}><UserLanding /></Suspense>} />
            <Route 
              path="/role/super-admin" 
              element={
                <Suspense fallback={<div className="p-6">Loading...</div>}>
                  <SuperAdminLanding />
                </Suspense>
              } 
            />
            <Route 
              path="/role/admin" 
              element={
                <Suspense fallback={<div className="p-6">Loading...</div>}>
                  <AdminLanding />
                </Suspense>
              } 
            />
            <Route 
              path="/role/agent" 
              element={
                <Suspense fallback={<div className="p-6">Loading...</div>}>
                  <AgentLanding />
                </Suspense>
              } 
            />
            <Route 
              path="/role/user" 
              element={
                <Suspense fallback={<div className="p-6">Loading...</div>}>
                  <UserLanding />
                </Suspense>
              } 
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <DashboardRouter />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/savings"
              element={
                <ProtectedRoute>
                  <Layout>
                    <SavingsPlans />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/investments"
              element={
                <ProtectedRoute>
                  <Layout>
                    <InvestmentPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <Layout>
                    <TransactionHistory />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ProfilePage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/group-savings"
              element={
                <ProtectedRoute>
                  <Layout>
                    <GroupSavings />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/agent-dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AgentDashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <Layout>
                    <AdminDashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requireAdmin>
                  <Layout>
                    <UserManagement />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/transactions"
              element={
                <ProtectedRoute requireAdmin>
                  <Layout>
                    <TransactionMonitor />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/savings"
              element={
                <ProtectedRoute requireAdmin>
                  <Layout>
                    <SavingsManagement />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/investments"
              element={
                <ProtectedRoute requireAdmin>
                  <Layout>
                    <InvestmentOversight />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/kyc"
              element={
                <ProtectedRoute requireAdmin>
                  <Layout>
                    <KYCVerification />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute requireAdmin>
                  <Layout>
                    <Analytics />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/compliance"
              element={
                <ProtectedRoute requireAdmin>
                  <Layout>
                    <Compliance />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/support"
              element={
                <ProtectedRoute requireAdmin>
                  <Layout>
                    <SupportTickets />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute requireAdmin>
                  <Layout>
                    <AdminSettings />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/plan-config"
              element={
                <ProtectedRoute requireAdmin>
                  <Layout>
                    <PlanConfigurationEngine />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/communication"
              element={
                <ProtectedRoute requireAdmin>
                  <Layout>
                    <CommunicationManagement />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/faq"
              element={
                <ProtectedRoute requireAdmin>
                  <Layout>
                    <FAQManagement />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/account-settings"
              element={
                <ProtectedRoute requireAdmin>
                  <Layout>
                    <AccountSettingsManagement />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/esusu"
              element={
                <ProtectedRoute requireAdmin>
                  <Layout>
                    <EsusuManagement />
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            {/* Super Admin Routes */}
            <Route
              path="/super-admin"
              element={
                <ProtectedRoute requireSuperAdmin>
                  <Layout>
                    <SuperAdminDashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/super-admin/platform"
              element={
                <ProtectedRoute requireSuperAdmin>
                  <Layout>
                    <PlatformOverview />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/super-admin/regions"
              element={
                <ProtectedRoute requireSuperAdmin>
                  <Layout>
                    <RegionalManagement />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/super-admin/admins"
              element={
                <ProtectedRoute requireSuperAdmin>
                  <Layout>
                    <SuperAdminManagement />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/super-admin/system"
              element={
                <ProtectedRoute requireSuperAdmin>
                  <Layout>
                    <SystemHealth />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/super-admin/security"
              element={
                <ProtectedRoute requireSuperAdmin>
                  <Layout>
                    <SecurityCenter />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/super-admin/database"
              element={
                <ProtectedRoute requireSuperAdmin>
                  <Layout>
                    <DatabaseManagement />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/super-admin/performance"
              element={
                <ProtectedRoute requireSuperAdmin>
                  <Layout>
                    <PerformanceMonitor />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/super-admin/integrations"
              element={
                <ProtectedRoute requireSuperAdmin>
                  <Layout>
                    <PlatformIntegrations />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/super-admin/backup"
              element={
                <ProtectedRoute requireSuperAdmin>
                  <Layout>
                    <BackupRecovery />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/super-admin/config"
              element={
                <ProtectedRoute requireSuperAdmin>
                  <Layout>
                    <RoleBasedAccessControl />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/super-admin/rbac"
              element={
                <ProtectedRoute requireSuperAdmin>
                  <Layout>
                    <SuperAdminRoleBasedAccessControl />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/super-admin/kyb"
              element={
                <ProtectedRoute requireSuperAdmin>
                  <Layout>
                    <KYBManagement />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/super-admin/webhooks"
              element={
                <ProtectedRoute requireSuperAdmin>
                  <Layout>
                    <WebhooksAPIConsole />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/super-admin/wallets"
              element={
                <ProtectedRoute requireSuperAdmin>
                  <Layout>
                    <WalletManagement />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/super-admin/notifications"
              element={
                <ProtectedRoute requireSuperAdmin>
                  <Layout>
                    <NotificationsManagement />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/super-admin/profiles"
              element={
                <ProtectedRoute requireSuperAdmin>
                  <Layout>
                    <ProfileManagement />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* User Routes - Now using the implemented pages instead of placeholders */}
            <Route
              path="/help"
              element={
                <ProtectedRoute>
                  <Layout>
                    <HelpCenter />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ContactSupport />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/faq"
              element={
                <ProtectedRoute>
                  <Layout>
                    <FAQ />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/feedback"
              element={
                <ProtectedRoute>
                  <Layout>
                    <SendFeedback />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ProfilePage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Notifications />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/rewards"
              element={
                <ProtectedRoute>
                  <Layout>
                    <RewardsPoints />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/referrals"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ReferFriends />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/cards"
              element={
                <ProtectedRoute>
                  <Layout>
                    <VirtualCards />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;