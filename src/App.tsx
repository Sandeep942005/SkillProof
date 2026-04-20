import { Routes, Route } from 'react-router-dom'

// Layouts (placeholders, will create next)
import DashboardLayout from './components/layout/DashboardLayout'

// Pages (placeholders for now)
const Home = () => <div className="p-8">Landing Page</div>
const Login = () => <div className="p-8">Login Page</div>
const Register = () => <div className="p-8">Register Page</div>

// Main routing configuration
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Dashboard Routes wrapper */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<div className="p-8">Candidate Dashboard</div>} />
        <Route path="/tasks" element={<div className="p-8">Task Marketplace</div>} />
      </Route>
    </Routes>
  )
}

export default App
