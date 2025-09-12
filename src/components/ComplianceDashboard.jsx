import React from "react";
import { motion } from "framer-motion";
import SemiCircularProgress from "./SemiCircleProgress";
import CibilScoreSemiProgress from "./CibilScoreSemiProgress";

const ComplianceDashboard = () => {
  return (
    <div>
      <motion.div
        className="bg-white rounded-2xl p-8 w-full"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT SIDE - Progress Circles */}
          <div className="flex flex-col items-center gap-20">
            {/* Compliance Calendar */}
            <div className="text-center flex flex-col items-center">
              <div className="relative inline-block">
                <SemiCircularProgress
                  percentage={84}
                  size={160}
                  strokeWidth={14}
                  colors={["#F5C842", "#E8B53A"]}
                />
                <div className="absolute inset-0 flex items-center justify-center mt-6">
                  <motion.div
                    className="text-4xl font-bold text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    84%
                  </motion.div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Compliance Calendar
                </h3>
              </div>
            </div>

            {/* CIBIL Score */}
            <div className="text-center flex flex-col items-center">
              <div className="relative inline-block">
                <CibilScoreSemiProgress score={660} size={160} strokeWidth={14} />
                <div className="absolute inset-0 flex items-center justify-center mt-6">
                  <motion.div
                    className="text-4xl font-bold text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    660
                  </motion.div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Your CIBIL Score is average
                </h3>
                <p className="text-sm text-gray-500 mt-2">Last Check on 21 Apr</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Promo Card */}
          <div className="flex flex-col justify-center">
            <motion.div
              className="bg-yellow-400 rounded-2xl p-8 text-center shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-sm font-medium text-white">Try PRO version</p>
              <h3 className="text-lg font-semibold text-white mt-2 leading-snug">
                Unlock full power of calendar <br /> For 2 weeks for free!
              </h3>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ComplianceDashboard;
