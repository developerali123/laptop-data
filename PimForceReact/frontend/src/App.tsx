import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { clearStoredTokens, getStoredAccessToken, isTokenExpired } from './lib/auth';
import { IntegrationWizardProvider } from './context/IntegrationWizardContext';
import DashboardPage from './pages/DashboardPage';
import IntegrationPage from './pages/IntegrationPage';
import LoginPage from './pages/LoginPage';
import IntegrationDetailsPage from './pages/IntegrationDetailsPage';

function RequireAuth({ children }: { children: JSX.Element }) {
  const token = getStoredAccessToken();
  if (!token || isTokenExpired(token, 5000)) { // 5s skew for clock drift
    clearStoredTokens();
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
        <Route path="/integration/:id" element={<RequireAuth><IntegrationDetailsPage /></RequireAuth>} />
        <Route path="/integration" element={
            <IntegrationWizardProvider>
          <RequireAuth>
          <IntegrationPage />
        </RequireAuth>
        </IntegrationWizardProvider>} />
      </Routes>
    </Router>
  )
}

export default App
