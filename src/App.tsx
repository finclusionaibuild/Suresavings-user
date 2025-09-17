import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardRouter from './components/DashboardRouter';
import SavingsPlans from './pages/SavingsPlans';
import InvestmentPage from './pages/InvestmentPage';
import TransactionHistory from './pages/TransactionHistory';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import GroupSavings from './pages/GroupSavings';
import { Suspense, lazy } from 'react';

const UserLanding = lazy(() => import('./components/user-types/User'));

// User pages
import HelpCenter from './pages/user/HelpCenter';
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
                <ProtectedRoute requiredKYCTier={1} featureName="savings plans">
                  <Layout>
                    <SavingsPlans />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/investments"
              element={
                <ProtectedRoute requiredKYCTier={2} featureName="investment opportunities">
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
                <ProtectedRoute requiredKYCTier={3} featureName="virtual cards">
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