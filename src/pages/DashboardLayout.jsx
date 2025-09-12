import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  BarChart3,
  BookOpen,   // 📚 For Bizpole Books
  Layers,     // 🗂️ For Bizpole One
  Bell,
  User,
  ChevronDown,
  Menu,
  X,
  HelpCircle,
  LogOut,
} from "lucide-react";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("BizpoleOne Pvt Ltd");
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);

  const companies = [
    "BizpoleOne Pvt Ltd",
    "BizpoleBooks LLP"
  ];

  // ✅ Auto collapse on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(ture);
      } else {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Updated sidebar menu items with new icons
  const menuItems = [
        { name: "Bizpole One", path: "/dashboard/bizpoleone", icon: Layers },

    { name: "Bizpole Books", path: "/dashboard/books", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ✅ Top Navbar */}
      <header className="bg-white px-6 py-3 flex justify-between items-center shadow-sm">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/Images/logo.png" alt="Bizpole Logo" className="h-14" />
        </div>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Explore BizpoleOne Button */}
          <div className="relative">
            <button
              className="px-6 py-2 rounded-full font-semibold text-black bg-[#FFC42A40] hover:bg-[#FFC42A70] transition flex items-center gap-2"
              onClick={() => setShowCompanyDropdown((prev) => !prev)}
              type="button"
            >
              {selectedCompany}
              <ChevronDown className="w-4 h-4" />
            </button>
            {/* Dropdown */}
            {showCompanyDropdown && (
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg z-10 border border-gray-200">
                {companies.map((company) => (
                  <button
                    key={company}
                    className={`w-full text-left px-5 py-3 hover:bg-yellow-100 rounded-xl transition ${
                      selectedCompany === company ? "bg-yellow-50 font-bold" : ""
                    }`}
                    onClick={() => {
                      setSelectedCompany(company);
                      setShowCompanyDropdown(false);
                    }}
                  >
                    {company}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search + Icons Container */}
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

        {/* ✅ Mobile Right Section (Bell + User + Menu) */}
        <div className="flex items-center space-x-3 lg:hidden">
          {/* Notifications */}
          <button className="p-2 rounded-full hover:bg-gray-100 relative cursor-pointer">
            <Bell size={22} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center cursor-pointer">
            <img
              src="/Images/user.jpg"
              alt="Profile"
              className="w-9 h-9 rounded-full shadow"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* ✅ Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-md px-6 py-4 space-y-4">
          <button
            className="w-full px-6 py-2 rounded-full font-semibold text-black 
                       bg-[#FFC42A40] hover:bg-[#FFC42A70] transition"
          >
            Explore BizpoleOne
          </button>

          {/* Search Bar */}
          <div className="flex items-center bg-[#FFC42A40] rounded-full px-3 py-2">
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
              className="bg-transparent outline-none text-sm placeholder-gray-500 w-full"
            />
          </div>
        </div>
      )}

      {/* ✅ Main Section */}
      <div className="flex flex-1 p-2">
        {/* Sidebar */}
        <div
          className={`bg-[#221e1e] text-white transition-all duration-300
            ${isSidebarOpen ? "w-60" : "w-16"}
            flex flex-col justify-between rounded-xl shadow-md`}
        >
          {/* Sidebar Top */}
          <div>
            {/* Toggle + Title */}
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              {isSidebarOpen && (
                <span className="font-bold text-lg tracking-wide">Bizpole</span>
              )}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded hover:bg-gray-800"
              >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* Menu Items */}
            <nav className="mt-4 px-2">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 py-3 px-3 rounded-lg transition
                        ${isActive
                          ? "bg-gray-700 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"}`
                      }
                    >
                      <item.icon size={isSidebarOpen ? 24 : 20} />
                      {isSidebarOpen && (
                        <span className="text-sm font-medium">{item.name}</span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Sidebar Bottom */}
          <div className="p-4 border-t border-gray-700 flex flex-col space-y-2">
            <NavLink
              to="/help"
              className="flex items-center gap-3 py-2 px-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <HelpCircle size={isSidebarOpen ? 24 : 20} />
              {isSidebarOpen && <span className="text-sm font-medium">Help</span>}
            </NavLink>
            <button className="flex items-center gap-3 py-2 px-3 rounded-lg text-red-500 hover:bg-gray-700 hover:text-red-400">
              <LogOut size={isSidebarOpen ? 24 : 20} />
              {isSidebarOpen && <span className="text-sm font-medium">Logout</span>}
            </button>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1  bg-gray-50 overflow-auto rounded-xl">
          <Outlet /> {/* ✅ Nested Dashboard Routes */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
