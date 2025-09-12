import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import StartYourBusiness from "./components/StartYourBusiness";
import Quiz from "./components/Quiz";
import BusinessPanel from "./components/BusinessPanel";
import Tellabout from "./components/Tellabout";
import Subscription from "./components/Subscription";
import Payment from "./components/Payment";

// Main Dashboard pages
import DashboardLayout from "./pages/DashboardLayout";
import DashboardMain from "./pages/DashboardMain";
import BizpoleBooks from "./pages/BizpoleBooks";

// BizpoleOne dashboard pages
import BizpoleOneDashboardLayout from "./pages/BizpoleOneDashboardLayout";
import BizpoleOne from "./pages/BizpoleOne";
import BizpoleOneOverview from "./pages/BizpoleOneOverview";
import BizpoleOneServices from "./pages/BizpoleOneServices";
import ProfilePage from "./pages/ProfilePage";
import ProfileLayout from "./pages/ProfileLayout";
import CalenderPage from "./pages/CalenderPage";
import ProfileDocuments from "./pages/ProfileDocuments";
import ProfileSettings from "./pages/ModernCalendar";
import ModernCalendar from "./pages/ModernCalendar";
import ProfileEvents from "./pages/ProfileEvents";
import BizpoleOneTasks from "./pages/BizpoleOneTasks";

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // paths where navbar & footer should not appear
  const hideLayoutPaths = [
    "/startbusiness",
    "/startbusiness/choose",
    "/startbusiness/quiz",
    "/startbusiness/about",
    "/startbusiness/subscriptions",
    "/payments",
    "/quiz",
    "/profile",
    "/dashboard", // includes /dashboard and its children
  ];

  const hideLayout = hideLayoutPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/startbusiness/*" element={<StartYourBusiness />} />
          <Route path="/checking" element={<BusinessPanel />} />
          <Route path="/startbusiness/about" element={<Tellabout />} />
          <Route path="/startbusiness/subscriptions" element={<Subscription />} />
          <Route path="/payments" element={<Payment />} />
          <Route path="/quiz" element={<Quiz />} />
       <Route path="/profile" element={<ProfileLayout />}>
  <Route index element={<ProfilePage />} /> 
 <Route path="calendar" element={<CalenderPage />} />
    <Route path="documents" element={<ProfileDocuments />} />
  <Route path="moderncalendar" element={<ModernCalendar />} />
    <Route path="events" element={<ProfileEvents />} />
</Route>

          {/* Main Dashboard (Nested Routes) */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardMain />} /> {/* default */}
            <Route path="books" element={<BizpoleBooks />} />

            {/* BizpoleOne Nested Dashboard */}
            <Route path="bizpoleone" element={<BizpoleOneDashboardLayout />}>
              <Route index element={<BizpoleOne />} /> {/* default inside bizpoleone */}
              <Route path="overview" element={<BizpoleOneOverview />} />
              <Route path="services" element={<BizpoleOneServices />} />
              <Route path="orders" element={<BizpoleOneServices />} />
              <Route path="tasks" element={<BizpoleOneTasks/>} />
              <Route path="subscriptions" element={<BizpoleOneServices />} />
              <Route path="settings" element={<BizpoleOneServices />} />
            </Route>

          </Route>
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
