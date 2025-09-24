import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const ComplianceStatusCheck = ({ onNext, onPrev }) => {
  // Speech recognition hook
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  // Manage transcripts for each textarea separately
  const [businessText, setBusinessText] = useState("");
  const [expectationText, setExpectationText] = useState("");
  const [activeField, setActiveField] = useState(null); // "business" | "expectation"

  const handleMicClick = (field) => {
    setActiveField(field);
    resetTranscript(); // clear old transcript
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
    if (activeField === "business") {
      setBusinessText((prev) => prev + " " + transcript);
    } else if (activeField === "expectation") {
      setExpectationText((prev) => prev + " " + transcript);
    }
    setActiveField(null);
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support Speech Recognition.</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#f5f5f5]">
      {/* Left Section */}
      <div className="flex-1 p-4 sm:p-8 md:p-10 lg:p-12 bg-cover bg-center rounded-tl-2xl rounded-bl-2xl">
        <h1 className="text-3xl font-bold text-center mb-12">
          Compliance Status Check
        </h1>

        {/* Form Grid */}
  <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Left Column */}
          <div className="space-y-8">
            {/* GST Returns */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                ARE GST RETURNS UP TO DATE?
              </label>
              <select className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                <option value="">Yes/No/NA (if Yes, input field opens)</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="na">NA</option>
              </select>
            </div>

            {/* ROC Filing */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                IS ROC FILING CURRENT?
              </label>
              <input
                type="text"
                placeholder="Financial year of last ROC return"
                className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Books of Accounts */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                BOOKS OF ACCOUNTS UP TO DATE?
              </label>
              <select className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                <option value="">Yes/No/NA</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="na">NA</option>
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* IT Return */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                IS IT RETURN UP TO DATE?
              </label>
              <input
                type="text"
                placeholder="Financial year of last IT return"
                className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Auditor */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                DO YOU HAVE AN AUDITOR?
              </label>
              <select className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                <option value="">Yes/No/NA</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="na">NA</option>
              </select>
            </div>
          </div>
        </div>

        {/* Business Understanding */}
  <div className="max-w-5xl mx-auto mt-8 md:mt-12">
          <h2 className="text-xl font-bold mb-8">Business Understanding</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* Tell Us More */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                TELL US MORE ABOUT YOUR BUSINESS
              </label>
              <div className="relative">
                <textarea
                  rows={4}
                  value={businessText}
                  onChange={(e) => setBusinessText(e.target.value)}
                  placeholder="Audio to Text"
                  className="w-full border-2 border-yellow-400 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                ></textarea>
                <button
                  type="button"
                  onClick={
                    listening && activeField === "business"
                      ? handleStop
                      : () => handleMicClick("business")
                  }
                  className={`absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-black font-bold transition ${
                    listening && activeField === "business"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-yellow-400 hover:bg-yellow-500"
                  }`}
                  title={
                    listening && activeField === "business"
                      ? "Stop Recording"
                      : "Start Recording"
                  }
                >
                  🎤
                </button>
              </div>
            </div>

            {/* Expectation */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                WHAT IS YOUR EXPECTATION FROM BIZPOLE?
              </label>
              <div className="relative">
                <textarea
                  rows={4}
                  value={expectationText}
                  onChange={(e) => setExpectationText(e.target.value)}
                  placeholder="Audio to Text"
                  className="w-full border-2 border-yellow-400 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                ></textarea>
                <button
                  type="button"
                  onClick={
                    listening && activeField === "expectation"
                      ? handleStop
                      : () => handleMicClick("expectation")
                  }
                  className={`absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-black font-bold transition ${
                    listening && activeField === "expectation"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-yellow-400 hover:bg-yellow-500"
                  }`}
                  title={
                    listening && activeField === "expectation"
                      ? "Stop Recording"
                      : "Start Recording"
                  }
                >
                  🎤
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
  <div className="flex flex-col md:flex-row items-center justify-between mt-8 md:mt-12 max-w-5xl mx-auto gap-6 md:gap-0">
          <button
            onClick={onPrev}
            className="w-12 h-12 flex items-center justify-center border-2 border-yellow-400 rounded-full text-yellow-500 text-xl hover:bg-yellow-100 transition focus:outline-none focus:ring-2 focus:ring-yellow-500"
            title="Back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
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
              onClick={onNext}
              title="Next"
            >
              Finish
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar Timeline Stepper */}
  <div className="w-full lg:w-100 bg-yellow-400 text-black p-4 sm:p-8 rounded-tr-2xl rounded-br-2xl pt-10 lg:pt-60 flex flex-col items-center mt-8 lg:mt-0">
        <h2 className="font-bold text-xl mb-10 text-white">Quick & Easy Setup</h2>
        <ol className="relative border-l-2 border-black/30 ml-4">
          {/* Step 1 */}
          <li className="mb-10 ml-6 flex flex-col">
            <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-black text-yellow-400 rounded-full font-bold text-lg border-4 border-yellow-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="font-semibold text-lg mt-1">Company Information</span>
            <span className="text-xs text-black/70 mt-1">Step 1 of 4</span>
          </li>
          {/* Step 2 */}
          <li className="mb-10 ml-6 flex flex-col">
            <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-black text-yellow-400 rounded-full font-bold text-lg border-4 border-yellow-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="font-semibold text-lg mt-1">Director/Promoter Details</span>
            <span className="text-xs text-black/70 mt-1">Step 2 of 4</span>
          </li>
          {/* Step 3 */}
          <li className="mb-10 ml-6 flex flex-col">
            <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-black text-yellow-400 rounded-full font-bold text-lg border-4 border-yellow-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="font-semibold text-lg mt-1">Registration Status</span>
            <span className="text-xs text-black/70 mt-1">Step 3 of 4</span>
          </li>
          {/* Step 4 */}
          <li className="ml-6 flex flex-col">
            <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-black text-yellow-400 rounded-full font-bold text-lg border-4 border-white">
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

export default ComplianceStatusCheck;
