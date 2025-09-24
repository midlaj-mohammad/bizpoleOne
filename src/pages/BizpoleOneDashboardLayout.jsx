import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  ListChecks,
  MessageCircle,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const BizpoleOneDashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);

  return (
    <div className="flex bg-gray-50 max-h-[100vh] min-h-[89]">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? "80px" : "260px" }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-white flex flex-col justify-between shadow-sm relative"
      >
        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white border rounded-full shadow-md p-1 hover:bg-gray-100 transition"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        {/* Sidebar Top */}
        <div className="p-4 flex-1">
          <nav>
            <ul className="space-y-2">
              {/* Dashboard */}
              <li>
                <NavLink
                  to="/dashboard/bizpoleone"
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all ${
                      isActive
                        ? "bg-[#FFC42A] text-white shadow-inner"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  <LayoutDashboard size={20} />
                  {!isCollapsed && <span>Dashboard</span>}
                </NavLink>
              </li>

              {/* Orders with dropdown */}
              <li>
                <button
                  onClick={() => setOrdersOpen(!ordersOpen)}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-50 w-full"
                >
                  <ShoppingBag size={20} />
                  {!isCollapsed && (
                    <>
                      <span>Orders</span>
                      <ChevronDown
                        size={16}
                        className={`ml-auto transform transition-transform ${
                          ordersOpen ? "rotate-180" : ""
                        }`}
                      />
                    </>
                  )}
                </button>

                {/* Submenu */}
                {!isCollapsed && ordersOpen && (
                  <ul className="ml-10 mt-1 space-y-1 text-sm">
                    <li>
                      <NavLink
                        to="/dashboard/bizpoleone/package"
                        className={({ isActive }) =>
                          `block px-2 py-2 rounded transition-all ${
                            isActive
                              ? "bg-[#FFE9A7] text-yellow-700 font-semibold shadow"
                              : "text-gray-500 hover:bg-[#FFF5D1] hover:text-yellow-700"
                          }`
                        }
                      >
                        Package Service
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/bizpoleone/individual"
                        className={({ isActive }) =>
                          `block px-2 py-2 rounded transition-all ${
                            isActive
                              ? "bg-[#FFE9A7] text-yellow-700 font-semibold shadow"
                              : "text-gray-500 hover:bg-[#FFF5D1] hover:text-yellow-700"
                          }`
                        }
                      >
                        Individual services
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* My Task */}
              <li>
                <NavLink
                  to="/dashboard/bizpoleone/tasks"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all ${
                      isActive
                        ? "bg-[#FFC42A] text-white shadow-inner"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  <ListChecks size={20} />
                  {!isCollapsed && <span>My task</span>}
                </NavLink>
              </li>

              {/* Chat */}
              <li>
                <NavLink
                  to="/dashboard/bizpoleone/chat"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all ${
                      isActive
                        ? "bg-[#FFC42A] text-white shadow-inner"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  <MessageCircle size={20} />
                  {!isCollapsed && <span>Chat</span>}
                </NavLink>
              </li>

              {/* Pricing & Plans */}
              <li>
                <NavLink
                  to="/dashboard/bizpoleone/pricing"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all ${
                      isActive
                        ? "bg-[#FFC42A] text-white shadow-inner"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  <CreditCard size={20} />
                  {!isCollapsed && <span>Pricing & Plans</span>}
                </NavLink>
              </li>

              {/* Customer supports */}
              <li>
                <NavLink
                  to="/dashboard/bizpoleone/support"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all ${
                      isActive
                        ? "bg-[#FFC42A] text-white shadow-inner"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  <Settings size={20} />
                  {!isCollapsed && <span>Customer supports</span>}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* Sidebar Bottom Section */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, type: "spring" }}
            className="p-4 space-y-4"
          >
            {/* Upgrade Card */}
            <div className="bg-[#FFC42A] rounded-2xl text-center p-4 text-white font-medium shadow-md">
              <div className="mb-3 flex justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#FFC42A] font-bold text-lg">⬆</span>
                </div>
              </div>
              <p className="text-sm">Upgrade to PRO</p>
              <p className="text-xs mt-1 opacity-90">
                to get access to all features!
                <br />
                Connect with Venus World!
              </p>
            </div>

            {/* Custom Sidebar Image */}
            <img
              src="/Images/sidbarimg.jpg"
              alt="Sidebar Illustration"
              className="rounded-2xl w-full object-cover"
            />
          </motion.div>
        )}
      </motion.aside>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex-1 p-6 overflow-y-auto"
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default BizpoleOneDashboardLayout;
