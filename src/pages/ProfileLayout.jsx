import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Calendar,
  FileText,
  Users,
  Folder,
  Settings,
  MessageSquare,
  Briefcase,
  HelpCircle,
  Send,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { name: "Profile", path: "", icon: LayoutGrid },
  { name: "Calendars", path: "calendar", icon: Calendar },
  { name: "Invoice", path: "invoice", icon: FileText },
  { name: "Files", path: "files", icon: Folder },
  { name: "Events", path: "events", icon: Briefcase },

  { name: "Message", path: "messages", icon: MessageSquare },

];

const ProfileLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ===== Header ===== */}
      <header className="bg-white px-6 py-3 flex justify-between items-center shadow-sm fixed top-0 left-0 right-0 z-50">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/Images/logo.png" alt="Bizpole Logo" className="h-14" />
        </div>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center space-x-6">
          <button
            className="px-6 py-2 rounded-full font-semibold text-black 
                       bg-[#FFC42A40] hover:bg-[#FFC42A70] transition"
          >
            Explore BizpoleOne
          </button>

          {/* Search + Icons */}
          <div className="flex items-center bg-white rounded-full shadow-md px-3 py-2 space-x-4">
            {/* Search Bar */}
            <div className="flex items-center bg-[#FFC42A40] rounded-full px-3 py-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-3.85z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-sm placeholder-gray-500 w-32 focus:w-44 transition-all"
              />
            </div>

            {/* Notifications */}
            <button className="p-2 rounded-full hover:bg-gray-100 relative cursor-pointer">
              <Bell size={22} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <NavLink to="/profile" className="flex items-center cursor-pointer">
              <img
                src="/Images/user.jpg"
                alt="Profile"
                className="w-9 h-9 rounded-full shadow"
              />
            </NavLink>
          </div>
        </div>

        {/* Mobile Right Section */}
        <div className="flex items-center space-x-3 lg:hidden">
          {/* Notifications */}
          <button className="p-2 rounded-full hover:bg-gray-100 relative cursor-pointer">
            <Bell size={22} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* User */}
          <div className="flex items-center cursor-pointer">
            <img
              src="/Images/user.jpg"
              alt="Profile"
              className="w-9 h-9 rounded-full shadow"
            />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* ===== Sidebar ===== */}
      <aside
        className={`fixed lg:static min-h-screen mt-16 left-0 h-full w-72 bg-white shadow-md flex flex-col justify-between transform transition-transform duration-300 z-40 
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div>
          {/* Profile Section */}
          <div className="p-8 text-center">
            <div className="relative inline-block">
              <img
                src="https://i.pravatar.cc/120?img=12"
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto border-4 border-yellow-400"
              />
              <span className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-white text-xs font-semibold shadow">
                2
              </span>
            </div>
            <h2 className="text-lg font-semibold mt-4">Hello Rosalie</h2>
            <p className="text-sm text-gray-500">rosalie.rice@gmail.com</p>
          </div>

          {/* Grid Menu */}
          <div className="grid grid-cols-2 gap-4 px-6">
            {menuItems.map(({ name, path, icon: Icon }) => (
              <NavLink
                key={name}
                to={path}
                end={name === "Profile"}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center rounded-xl border p-4 text-sm font-medium transition ${
                    isActive
                      ? "bg-yellow-50 border-yellow-400 text-yellow-600"
                      : "bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-100"
                  }`
                }
              >
                <Icon size={20} className="mb-2" />
                {name}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Bottom Links */}
        <div className="p-6 space-y-4">
          <button className="flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200">
            <span className="flex items-center gap-2">
              <Send size={16} /> Send Feedback
            </span>
            <span>→</span>
          </button>
          <button className="flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200">
            <span className="flex items-center gap-2">
              <HelpCircle size={16} /> Knowledge Base
            </span>
            <span>→</span>
          </button>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex-1 p-8 overflow-y-auto mt-[76px]">
        <Outlet />
      </main>
    </div>
  );
};

export default ProfileLayout;
