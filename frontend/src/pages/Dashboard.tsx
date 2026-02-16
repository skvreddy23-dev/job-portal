import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">
            JobPortal
          </h1>

          <div className="flex items-center gap-6">
            <span className="text-sm text-gray-600">
              {user?.email}
            </span>

            <button
              onClick={logout}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* Welcome Section */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name || "User"} 👋
          </h2>
          <p className="text-gray-500">
            Here’s what’s happening with your account today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-500">Account Type</p>
            <p className="mt-2 text-xl font-semibold text-gray-900">
              {user?.role}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-500">Profile Status</p>
            <p className="mt-2 text-xl font-semibold text-gray-900">
              Incomplete
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-500">Applications</p>
            <p className="mt-2 text-xl font-semibold text-gray-900">
              0
            </p>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Quick Actions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Link
              to="/profile"
              className="block rounded-lg border border-gray-200 p-6 hover:border-indigo-500 hover:shadow-md transition"
            >
              <h4 className="font-medium text-gray-900">
                Complete your profile
              </h4>
              <p className="text-sm text-gray-500 mt-2">
                Add more details to increase visibility.
              </p>
            </Link>

            <Link
              to="/jobs"
              className="block rounded-lg border border-gray-200 p-6 hover:border-indigo-500 hover:shadow-md transition"
            >
              <h4 className="font-medium text-gray-900">
                Browse Jobs
              </h4>
              <p className="text-sm text-gray-500 mt-2">
                Discover new opportunities that match your skills.
              </p>
            </Link>

          </div>
        </div>

      </main>
    </div>
  );
}
