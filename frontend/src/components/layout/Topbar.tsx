import type { JSX } from "react";
import { useAuthStore } from "../../store/authStore";

export default function Topbar(): JSX.Element {
  const { user, logout } = useAuthStore();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      <input
        type="text"
        placeholder="Search jobs..."
        className="w-80 px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {user?.email}
        </span>

        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
