// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts and Protected Routes
import PublicLayout from './layouts/PublicLayout';
import StudentProtectedRoute from './components/StudentProtectedRoute';

// Public Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

// Student Pages
import StudentDashboard from './pages/StudentDashboard';
import CreatePostPage from './pages/CreatePostPage'; // The new unified form
import ChatPage from './pages/ChatPage';
import MyActivityPage from './pages/MyActivityPage';
import ComplaintChatPage from './pages/ComplaintChatPage';

// Not Found Page
import NotFoundPage from './pages/NotFoundPage';
    
function App() {
  return (
    <Router>
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>

        {/* --- STUDENT PROTECTED ROUTES --- */}
        <Route path="/" element={<StudentProtectedRoute />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="create-post" element={<CreatePostPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="my-activity" element={<MyActivityPage />} />
          <Route path="my-activity/chat/:id" element={<ComplaintChatPage />} />
        </Route>

        {/* --- Not Found Route --- */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;