import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Section */}
      <div className="flex flex-col flex-1">

        {/* Topbar */}
        <Topbar />

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}
