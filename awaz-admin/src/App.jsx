import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import ComplaintDetailsPage from './pages/ComplaintDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/complaint/:id" element={<ComplaintDetailsPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;