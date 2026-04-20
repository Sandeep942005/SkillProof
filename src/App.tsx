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
import TaskMarketplace from './pages/TaskMarketplace'
import TaskDetail from './pages/TaskDetail'
import SubmissionWorkspace from './pages/SubmissionWorkspace'
import SubmissionResult from './pages/SubmissionResult'
import PostTask from './pages/PostTask'
import LiveTaskManagement from './pages/LiveTaskManagement'
import ReviewDashboard from './pages/ReviewDashboard'
import CandidateProfileView from './pages/CandidateProfileView'
import TalentPool from './pages/TalentPool'
import Wallet from './pages/Wallet'
import JobOffers from './pages/JobOffers'
import Billing from './pages/Billing'

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
        {/* Candidate routes */}
        <Route path="/dashboard" element={<CandidateDashboard />} />
        <Route path="/tasks" element={<TaskMarketplace />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />
        <Route path="/tasks/:id/submit" element={<SubmissionWorkspace />} />
        <Route path="/submissions/:id/result" element={<SubmissionResult />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/offers" element={<JobOffers />} />
        <Route path="/profile" element={<div className="p-8">Profile (Coming Soon)</div>} />

        {/* Company routes */}
        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/company/tasks/new" element={<PostTask />} />
        <Route path="/company/tasks/:id/live" element={<LiveTaskManagement />} />
        <Route path="/company/tasks/:id/review" element={<ReviewDashboard />} />
        <Route path="/company/candidates/:id" element={<CandidateProfileView />} />
        <Route path="/company/talent" element={<TalentPool />} />
        <Route path="/company/billing" element={<Billing />} />
      </Route>
    </Routes>
  )
}

export default App
