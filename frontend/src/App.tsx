import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useAuthStore } from "./store/authStore";
import DashboardLayout from "./Layout/DashboardLayout";
import type { JSX } from "react";

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Redirect root to login or dashboard */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Catch-all for 404 */}
          <Route
            path="*"
            element={
              <div className="p-10 text-center text-2xl">
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
