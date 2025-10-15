
import React, { useState } from "react";
import { upsertCompany } from "../../api/CompanyApi";

const RegistrationStatusForm = ({ onNext, onBack }) => {
  const questions = [
    "DO YOU HAVE IE CODE ?",
    "DO YOU HAVE FSSAI?",
    "DO YOU HAVE ESI REGISTRATION?",
    "DO YOU HAVE EPF REGISTRATION?",
    "DO YOU FILE TDS RETURNS?",
  ];
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (idx, value) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[idx] = value;
      return updated;
    });
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await upsertCompany({ registrationStatus: answers });
      if (onNext) onNext();
    } catch (err) {
      setError("Failed to save registration status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#f5f5f5]">
      {/* Left Section */}
      <div className="flex-1 p-4 sm:p-8 md:p-10 lg:p-12 bg-cover bg-center rounded-tl-2xl rounded-bl-2xl">
        <h1 className="text-3xl font-bold text-center mb-12">
          Registration Status (For Compliance Calendar)
        </h1>
        {/* Dropdown Fields */}
        <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
          {questions.map((label, index) => (
            <div key={index}>
              <label className="block mb-2 text-lg font-semibold">{label}</label>
              <select
                className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={answers[index]}
                onChange={e => handleChange(index, e.target.value)}
                disabled={loading}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="na">NA</option>
              </select>
            </div>
          ))}
        </div>
        {/* Bottom Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 md:mt-12 max-w-3xl mx-auto gap-6 md:gap-0">
          <button
            onClick={onBack}
            className="w-12 h-12 flex items-center justify-center border-2 border-yellow-400 rounded-full text-yellow-500 text-xl hover:bg-yellow-100 transition focus:outline-none focus:ring-2 focus:ring-yellow-500"
            title="Back"
            type="button"
            disabled={loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-base">
              <input type="checkbox" className="accent-yellow-500" />
              Remind me later!
            </label>
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full flex items-center gap-2 transition focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onClick={handleNext}
              title="Next"
              disabled={loading}
            >
              {loading ? "Saving..." : "Next »"}
            </button>
          </div>
        </div>
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      </div>
      {/* Right Sidebar Timeline Stepper */}
      <div className="w-full lg:w-100 bg-yellow-400 text-black p-4 sm:p-8 rounded-tr-2xl rounded-br-2xl pt-10 lg:pt-60 flex flex-col items-center mt-8 lg:mt-0">
        <h2 className="font-bold text-xl mb-10 text-white">Quick & Easy Setup</h2>
        <ol className="relative border-l-2 border-black/30 ml-4">
          {/* Step 1 - Completed */}
          <li className="mb-10 ml-6 flex flex-col">
            <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-black text-white rounded-full font-bold text-lg border-4 border-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="font-semibold text-lg mt-1">Company Information</span>
            <span className="text-xs text-black/70 mt-1">Step 1 of 4</span>
          </li>
          {/* Step 2 - Completed */}
          <li className="mb-10 ml-6 flex flex-col">
            <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-black text-white rounded-full font-bold text-lg border-4 border-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="font-semibold text-lg mt-1">Director/Promoter Details</span>
            <span className="text-xs text-black/70 mt-1">Step 2 of 4</span>
          </li>
          {/* Step 3 - Active */}
          <li className="mb-10 ml-6 flex flex-col">
            <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-black text-yellow-400 rounded-full font-bold text-lg border-4 border-white">
              3
            </span>
            <span className="font-semibold text-lg mt-1">Registration Status</span>
            <span className="text-xs text-black/70 mt-1">Step 3 of 4</span>
          </li>
          {/* Step 4 - Upcoming */}
          <li className="ml-6 flex flex-col">
            <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-gray-200 text-gray-400 rounded-full font-bold text-lg border-4 border-gray-300">
              4
            </span>
            <span className="font-semibold text-lg mt-1">Compliance</span>
            <span className="text-xs text-black/70 mt-1">Step 4 of 4</span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default RegistrationStatusForm;
