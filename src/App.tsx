import { Routes, Route } from 'react-router-dom'

// Layouts
import DashboardLayout from './components/layout/DashboardLayout'

// Pages — Auth
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Onboarding from './pages/Onboarding'

// Pages — Candidate
import CandidateDashboard from './pages/CandidateDashboard'
import TaskMarketplace from './pages/TaskMarketplace'
import TaskDetail from './pages/TaskDetail'
import SubmissionWorkspace from './pages/SubmissionWorkspace'
import SubmissionResult from './pages/SubmissionResult'
import Wallet from './pages/Wallet'
import JobOffers from './pages/JobOffers'
import ProfilePage from './pages/ProfilePage'
import Notifications from './pages/Notifications'
import Leaderboard from './pages/Leaderboard'
import PublicProfile from './pages/PublicProfile'
import DisputeResolution from './pages/DisputeResolution'
import Settings from './pages/Settings'

// Pages — Company
import CompanyDashboard from './pages/CompanyDashboard'
import PostTask from './pages/PostTask'
import LiveTaskManagement from './pages/LiveTaskManagement'
import ReviewDashboard from './pages/ReviewDashboard'
import CandidateProfileView from './pages/CandidateProfileView'
import TalentPool from './pages/TalentPool'
import Billing from './pages/Billing'

// Pages — Admin
import AdminPanel from './pages/AdminPanel'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/u/:username" element={<PublicProfile />} />

      <Route element={<DashboardLayout />}>
        {/* Candidate */}
        <Route path="/dashboard" element={<CandidateDashboard />} />
        <Route path="/tasks" element={<TaskMarketplace />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />
        <Route path="/tasks/:id/submit" element={<SubmissionWorkspace />} />
        <Route path="/submissions/:id/result" element={<SubmissionResult />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/offers" element={<JobOffers />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/disputes" element={<DisputeResolution />} />
        <Route path="/settings" element={<Settings />} />

        {/* Company */}
        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/company/tasks/new" element={<PostTask />} />
        <Route path="/company/tasks/:id/live" element={<LiveTaskManagement />} />
        <Route path="/company/tasks/:id/review" element={<ReviewDashboard />} />
        <Route path="/company/candidates/:id" element={<CandidateProfileView />} />
        <Route path="/company/talent" element={<TalentPool />} />
        <Route path="/company/billing" element={<Billing />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminPanel />} />
      </Route>
    </Routes>
  )
}

export default App
