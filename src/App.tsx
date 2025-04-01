
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import OnboardingScreen from "./pages/OnboardingScreen";
import LoginScreen from "./pages/LoginScreen";
import SignupScreen from "./pages/SignupScreen";
import ResetPasswordScreen from "./pages/ResetPasswordScreen";
import OTPVerificationScreen from "./pages/OTPVerificationScreen";
import NewPasswordScreen from "./pages/NewPasswordScreen";
import HomeScreen from "./pages/HomeScreen";
import PayScreen from "./pages/PayScreen";
import InvestScreen from "./pages/InvestScreen";
import ProfileScreen from "./pages/ProfileScreen";
import NotFound from "./pages/NotFound";
import ScanScreen from "./pages/ScanScreen";
import ContactSelectionScreen from "./pages/payment/ContactSelectionScreen";
import AmountEntryScreen from "./pages/payment/AmountEntryScreen";
import UPIPinScreen from "./pages/payment/UPIPinScreen";
import PaymentConfirmationScreen from "./pages/payment/PaymentConfirmationScreen";
import TransactionDetailScreen from "./pages/payment/TransactionDetailScreen";
import MutualFundListScreen from "./pages/invest/MutualFundListScreen";
import MutualFundDetailScreen from "./pages/invest/MutualFundDetailScreen";
import SIPSetupScreen from "./pages/invest/SIPSetupScreen";
import PortfolioScreen from "./pages/invest/PortfolioScreen";
import SIPCalculatorScreen from "./pages/invest/SIPCalculatorScreen";
import TransactionHistoryScreen from "./pages/TransactionHistoryScreen";
import EditProfileScreen from "./pages/profile/EditProfileScreen";
import KYCVerificationScreen from "./pages/profile/KYCVerificationScreen";
import SettingsScreen from "./pages/SettingsScreen";
import NotificationsScreen from "./pages/NotificationsScreen";
import ResearchScreen from "./pages/invest/ResearchScreen";
import TaxPlanningScreen from "./pages/invest/TaxPlanningScreen";
import FundComparisonScreen from "./pages/invest/FundComparisonScreen";
import OrderSummaryScreen from "./pages/invest/OrderSummaryScreen";
import FundScreenerScreen from "./pages/invest/FundScreenerScreen";
import PaymentMethodScreen from "./pages/invest/PaymentMethodScreen";
import InvestPaymentConfirmationScreen from "./pages/invest/PaymentConfirmationScreen";
import InvestmentDashboard from "./pages/invest/InvestmentDashboard";
import UserDashboard from "./pages/profile/UserDashboard";

// New SIP Management Screens
import SIPManagementScreen from "./pages/invest/SIPManagementScreen";
import PartialRedemptionScreen from "./pages/invest/PartialRedemptionScreen";
import RedemptionConfirmationScreen from "./pages/invest/RedemptionConfirmationScreen";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth & Onboarding Flow */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/onboarding" element={<OnboardingScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/reset-password" element={<ResetPasswordScreen />} />
          <Route path="/verification" element={<OTPVerificationScreen />} />
          <Route path="/new-password" element={<NewPasswordScreen />} />
          
          {/* Main App Screens */}
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/pay" element={<PayScreen />} />
          <Route path="/scan" element={<ScanScreen />} />
          <Route path="/invest" element={<InvestScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          
          {/* Settings & Notifications */}
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/notifications" element={<NotificationsScreen />} />
          
          {/* Payment Flow */}
          <Route path="/payment/contacts" element={<ContactSelectionScreen />} />
          <Route path="/payment/amount" element={<AmountEntryScreen />} />
          <Route path="/payment/upi-pin" element={<UPIPinScreen />} />
          <Route path="/payment/confirmation" element={<PaymentConfirmationScreen />} />
          <Route path="/payment/transaction-detail/:id" element={<TransactionDetailScreen />} />
          
          {/* Investment Flow - Core Screens */}
          <Route path="/invest/dashboard" element={<InvestmentDashboard />} />
          <Route path="/invest/mutual-funds" element={<MutualFundListScreen />} />
          <Route path="/invest/mutual-fund/:id" element={<MutualFundDetailScreen />} />
          <Route path="/invest/sip-setup/:id" element={<SIPSetupScreen />} />
          <Route path="/invest/order-summary" element={<OrderSummaryScreen />} />
          <Route path="/invest/payment-method" element={<PaymentMethodScreen />} />
          <Route path="/invest/payment-confirmation" element={<InvestPaymentConfirmationScreen />} />
          <Route path="/invest/portfolio" element={<PortfolioScreen />} />
          
          {/* New SIP Management Routes */}
          <Route path="/invest/sip-management" element={<SIPManagementScreen />} />
          <Route path="/invest/partial-redemption/:id" element={<PartialRedemptionScreen />} />
          <Route path="/invest/redemption-confirmation" element={<RedemptionConfirmationScreen />} />
          
          <Route path="/sip-calculator" element={<SIPCalculatorScreen />} />
          <Route path="/digital-gold" element={<MutualFundListScreen />} /> {/* Placeholder */}
          <Route path="/fixed-deposits" element={<MutualFundListScreen />} /> {/* Placeholder */}
          <Route path="/stocks" element={<MutualFundListScreen />} /> {/* Placeholder */}
          <Route path="/watchlist" element={<MutualFundListScreen />} /> {/* Placeholder */}
          <Route path="/sip" element={<SIPCalculatorScreen />} />
          
          {/* New Investment Screens */}
          <Route path="/invest/research" element={<ResearchScreen />} />
          <Route path="/invest/tax-planning" element={<TaxPlanningScreen />} />
          <Route path="/invest/compare" element={<FundComparisonScreen />} />
          <Route path="/invest/screener" element={<FundScreenerScreen />} />
          <Route path="/invest/featured" element={<MutualFundListScreen />} /> {/* Placeholder */}
          <Route path="/invest/goal-planning" element={<SIPCalculatorScreen />} /> {/* Placeholder */}
          
          {/* Profile Flow */}
          <Route path="/profile/dashboard" element={<UserDashboard />} />
          <Route path="/profile/edit" element={<EditProfileScreen />} />
          <Route path="/profile/kyc" element={<KYCVerificationScreen />} />
          <Route path="/transaction-history" element={<TransactionHistoryScreen />} />
          <Route path="/profile/bank-accounts" element={<EditProfileScreen />} /> {/* Placeholder */}
          <Route path="/refer" element={<NotificationsScreen />} /> {/* Placeholder */}
          <Route path="/share" element={<NotificationsScreen />} /> {/* Placeholder */}
          <Route path="/support" element={<NotificationsScreen />} /> {/* Placeholder */}
          
          {/* For development convenience - redirect /index to home */}
          <Route path="/index" element={<Navigate to="/home" replace />} />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
