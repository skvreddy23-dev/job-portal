import type { JSX } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  name: string;
  path: string;
}

export default function Sidebar(): JSX.Element {
  const location = useLocation();

  const navItems: NavItem[] = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Jobs", path: "/jobs" },
    { name: "Applications", path: "/applications" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-gray-200 p-6">
      <h2 className="text-xl font-bold text-indigo-600 mb-8">
        JobPortal
      </h2>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`block px-4 py-2 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-indigo-100 text-indigo-600"
                : "hover:bg-gray-100"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
