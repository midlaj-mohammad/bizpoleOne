import React from 'react'
import ComplianceCalendar from './ComplianceCalendar'

const ComplianceDashboard = () => {
  return (
    <div className='flex flex-col md:flex-row gap-4 md:gap-6 w-full px-2 sm:px-4'>
      <div className="flex-1 flex justify-center mb-4 md:mb-0">
        <ComplianceCalendar value={39.5} />
      </div>
      <div className="flex-1 flex justify-center items-center">
        {/* Notification Card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
            <span className="font-semibold text-gray-700 text-2xl">Quotes</span>
          </div>
          <div className="text-gray-600 text-center text-base md:text-xl mb-4">
            Your compliance score is below 30%. Please review your pending tasks.
          </div>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-5 py-2 rounded-full transition">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComplianceDashboard