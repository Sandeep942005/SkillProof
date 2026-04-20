import { Routes, Route } from 'react-router-dom'

// Layouts
import DashboardLayout from './components/layout/DashboardLayout'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Onboarding from './pages/Onboarding'
import CandidateDashboard from './pages/CandidateDashboard'
import CompanyDashboard from './pages/CompanyDashboard'

// Main routing configuration
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/onboarding" element={<Onboarding />} />
      
      {/* Dashboard Routes wrapper */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<CandidateDashboard />} />
        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/tasks" element={<div className="p-8">Task Marketplace (Coming Soon)</div>} />
        <Route path="/wallet" element={<div className="p-8">Wallet (Coming Soon)</div>} />
        <Route path="/profile" element={<div className="p-8">Profile (Coming Soon)</div>} />
        <Route path="/company/talent" element={<div className="p-8">Talent Pool (Coming Soon)</div>} />
        <Route path="/company/billing" element={<div className="p-8">Billing (Coming Soon)</div>} />
        <Route path="/company/tasks/new" element={<div className="p-8">Post Task (Coming Soon)</div>} />
      </Route>
    </Routes>
  )
}

export default App
