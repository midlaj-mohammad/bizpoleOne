import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Grid,
  Briefcase,
  ClipboardCheck,
  ListChecks,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const menuItems = [
  { name: "Dashboard", path: "/dashboard/bizpoleone", icon: LayoutDashboard, exact: true },
  { name: "Overview", path: "/dashboard/bizpoleone/overview", icon: Grid },
  { name: "Services", path: "/dashboard/bizpoleone/services", icon: Briefcase },
  { name: "Orders", path: "/dashboard/bizpoleone/orders", icon: ClipboardCheck },
  { name: "Tasks", path: "/dashboard/bizpoleone/tasks", icon: ListChecks },
  { name: "Subscriptions", path: "/dashboard/bizpoleone/subscriptions", icon: CreditCard },
  { name: "Our Plans", path: "/dashboard/bizpoleone/settings", icon: Settings },
];

// Animation variants for sidebar links
const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, type: "spring", stiffness: 120 },
  }),
};

const BizpoleOneDashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex bg-gray-50 max-h-[90vh] min-h-[89]">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? "80px" : "260px" }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-white flex flex-col justify-between  shadow-sm  relative"
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
              {menuItems.map((item, idx) => (
                <motion.li
                  key={idx}
                  custom={idx}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                >
                  <NavLink
                    to={item.path}
                    end={item.exact} // only apply exact matching for Dashboard
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all
                      ${
                        isActive
                          ? "bg-[#FFC42A] text-white shadow-inner"
                          : "text-gray-600 hover:bg-gray-50"
                      }`
                    }
                  >
                    <item.icon size={20} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Sidebar Bottom Image */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, type: "spring" }}
            className="p-4 "
          >
            <img
              src="/Images/sidbarimg.jpg"
              alt="Sidebar Illustration"
              className="rounded-b-2xl w-full object-cover"
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
