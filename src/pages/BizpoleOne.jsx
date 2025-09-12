import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

import ComplianceDashboard from '../components/ComplianceDashboard';
import HeaderStats from '../components/HeaderStats';
import UpcomingEvents from '../components/UpcomingEvents';
import ServicesTable from '../components/ServicesTable';
import ChatSection from '../components/ChatSection';
import TodayTask from '../components/TodayTask';

const BizpoleOne = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <HeaderStats /> <br />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <ComplianceDashboard />
          <ServicesTable />
          <TodayTask />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <UpcomingEvents />
          <ChatSection />
        </div>
      </div>
    </div>
  );
};

export default BizpoleOne;
