import React, { useState, useEffect } from "react";
import { upsertCompany } from "../../api/CompanyApi";
import { getAllStates } from "../../api/States";
import { assignCustomer } from "../../api/CustomerApi";
import { setSecureItem } from "../../utils/secureStorage";


const CompanyInformationForm = ({ onNext }) => {
  const [form, setForm] = useState({
    businessType: "",
    businessName: "",
    dateOfIncorporation: "",
    pan: "",
    cin: "",
    businessActivity: "IT",
    gstStatus: "",
    gstNumber: "",
    gstType: "",
    registeredOffice: "",
    commAddress1: "",
    commAddress2: "",
    commCity: "",
    commState: "",
    commPincode: "",
    preferredLanguage: "",
    employeeId: "",
    agentName: "",
    franchiseeId: "",
  });

  // Language dropdown options
  const languageOptions = [
    { label: "English", value: "english" },
    { label: "Hindi", value: "hindi" },
    { label: "Marathi", value: "marathi" },
    { label: "Tamil", value: "tamil" },
    { label: "Telugu", value: "telugu" },
    { label: "Gujarati", value: "gujarati" },
    { label: "Bengali", value: "bengali" },
    { label: "Kannada", value: "kannada" },
  ];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [states, setStates] = useState([]);
  const [assignLoading, setAssignLoading] = useState(false);
  const [assignError, setAssignError] = useState("");

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const data = await getAllStates();
        setStates(data || []);
      } catch (err) {
        setStates([]);
      }
    };
    fetchStates();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      return updated;
    });
  };

  // Call assignCustomer only on blur of language, state, or city
  const handleAssignBlur = () => {
    const { preferredLanguage, commState, commCity } = form;
    if (preferredLanguage && commState && commCity) {
      setAssignLoading(true);
      setAssignError("");
      assignCustomer({
        language: preferredLanguage,
        state: commState,
        district: commCity,
      })
        .then((res) => {
          if (res && res.agent && res.agent.id && res.franchiseeId) {
            setForm((prev) => ({
              ...prev,
              employeeId: res.agent.id,
              agentName: res.agent.name || "",
              franchiseeId: res.franchiseeId
            }));
          } else {
            setForm((prev) => ({ ...prev, employeeId: "", agentName: "", franchiseeId: "" }));
            setAssignError("No agent/franchisee found for the selected language, state, and city.");
          }
        })
        .catch(() => {
          setForm((prev) => ({ ...prev, employeeId: "", agentName: "", franchiseeId: "" }));
          setAssignError("Could not assign agent/franchisee. Try again.");
        })
        .finally(() => setAssignLoading(false));
    } else {
      setForm((prev) => ({ ...prev, employeeId: "", agentName: "", franchiseeId: "" }));
      setAssignError("");
    }
  };
  const handleRadio = (name, value) => {
    setForm({ ...form, [name]: value });
  };
  const handleNext = (e) => {
    e.preventDefault();
    setError("");
    if (!form.businessName || form.businessName.trim() === "") {
      setError("Business Name is required.");
      return;
    }
    if (!form.employeeId || !form.franchiseeId) {
      setError("Please select Preferred Language, State, and City to assign an agent and franchisee before proceeding.");
      return;
    }
    // Map form fields to backend payload structure
    const payload = {
      BusinessName: form.businessName,
      CompanyPAN: form.pan,
      GSTNumber: form.gstNumber,
      CIN: form.cin,
      ConstitutionCategory: form.businessType || "",
      Sector: form.businessActivity || "",
      BusinessNature: "",
      Origin: "",
      CompanyEmail: "", // Not collected in this form
      CompanyMobile: "", // Not collected in this form
      Website: "",
      Country: "India",
      State: form.commState,
      City: form.commCity || "null",
      PinCode: form.commPincode,
      EmployeeID: form.employeeId,
      FranchiseID: form.franchiseeId,
      Customers: [
        {
          FirstName: "",
          LastName: "",
          DateOfBirth: "",
          PreferredLanguage: form.preferredLanguage,
          Email: "",
          Mobile: "",
          Country: "India",
          State: form.commState,
          City: form.commCity || "",
          PinCode: form.commPincode,
          PANNumber: form.pan,
          IsComponyRegistered: 1,
          PrimaryCustomer: 0
        }
      ]
    };
    // Save to localStorage instead of submitting
    try {
      setSecureItem("companyInfo", JSON.stringify(payload));
      if (onNext) onNext();
    } catch (err) {
      setError("Failed to save company information to local storage.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#f5f5f5]">
      {/* Left Section */}
      <div
        className="flex-1 p-4 sm:p-8 md:p-10 lg:p-12 bg-cover bg-center rounded-tl-2xl rounded-bl-2xl"
        style={{ backgroundImage: "url('/Images/hero-bg.webp')" }}
      >
        <h1 className="text-4xl font-bold text-center mb-12">
          Company Information
        </h1>

        {/* Form Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Type of Business */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                Type of Business
              </label>
              <div className="flex flex-wrap gap-6 text-base">
                {["Pvt Ltd", "LLP", "OPC", "Sole proprietor"].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="businessType"
                      checked={form.businessType === type}
                      onChange={() => handleRadio("businessType", type)}
                      className="accent-yellow-500"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Name of Business */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                Name of Business
              </label>
              <input
                type="text"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="e.g. Bizpole"
                className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Date Of Incorporation */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                Date Of Incorporation
              </label>
              <input
                type="date"
                name="dateOfIncorporation"
                value={form.dateOfIncorporation}
                onChange={handleChange}
                className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* PAN of the Entity */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                PAN of the Entity
              </label>
              <input
                type="text"
                name="pan"
                value={form.pan}
                onChange={handleChange}
                placeholder="e.g. BNGY789B78"
                className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* CIN/LLPIN */}
            <div>
              <label className="block mb-2 text-lg font-semibold">CIN/LLPIN</label>
              <input
                type="text"
                name="cin"
                value={form.cin}
                onChange={handleChange}
                placeholder="e.g. BNGY789B78"
                className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Business Activity */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                Business Activity
              </label>
              <select
                name="businessActivity"
                value={form.businessActivity}
                onChange={handleChange}
                className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
                <option value="Manufacturing">Manufacturing</option>
              </select>
            </div>

            {/* Preferred Language */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                Preferred Language
              </label>
              <select
                name="preferredLanguage"
                value={form.preferredLanguage}
                onChange={handleChange}
                onBlur={handleAssignBlur}
                className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Select Language</option>
                {languageOptions.map((lang) => (
                  <option key={lang.value} value={lang.value}>{lang.label}</option>
                ))}
              </select>
            </div>




          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* GST Registration Status */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                GST Registration Status
              </label>
              <div className="flex flex-wrap gap-6 text-base">
                {["Yes", "No", "NA"].map((status) => (
                  <label key={status} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gstStatus"
                      checked={form.gstStatus === status}
                      onChange={() => handleRadio("gstStatus", status)}
                      className="accent-yellow-500"
                    />
                    {status}
                  </label>
                ))}
              </div>
            </div>

            {/* GST Registration Number */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                GST Registration Number
              </label>
              <input
                type="text"
                name="gstNumber"
                value={form.gstNumber}
                onChange={handleChange}
                placeholder="e.g. Bizpole"
                className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* GST Registration Type */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                GST Registration Type
              </label>
              <div className="flex flex-wrap gap-6 text-base">
                {["Regular", "Compostion", "IFF"].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gstType"
                      checked={form.gstType === type}
                      onChange={() => handleRadio("gstType", type)}
                      className="accent-yellow-500"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Registered Office */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                Registered Office
              </label>
              <input
                type="text"
                name="registeredOffice"
                value={form.registeredOffice}
                onChange={handleChange}
                placeholder="e.g. BNGY789B78"
                className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Communication Address */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                Communication Address
              </label>
              <input
                type="text"
                name="commAddress1"
                value={form.commAddress1}
                onChange={handleChange}
                placeholder="Address (House No, Building, Street, Area)*"
                className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="text"
                name="commAddress2"
                value={form.commAddress2}
                onChange={handleChange}
                placeholder="Locality/Town*"
                className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="text"
                name="commCity"
                value={form.commCity}
                onChange={handleChange}
                onBlur={handleAssignBlur}
                placeholder="City/District*"
                className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <div className="flex gap-4">
                <select
                  name="commState"
                  value={form.commState}
                  onChange={handleChange}
                  onBlur={handleAssignBlur}
                  className="flex-1 border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">Select State*</option>
                  {states.map((state) => (
                    <option key={state._id || state.id || state.state_name} value={state.state_name}>{state.state_name}</option>
                  ))}
                </select>
                <input
                  type="text"
                  name="commPincode"
                  value={form.commPincode}
                  onChange={handleChange}
                  placeholder="Pincode*"
                  className="flex-1 border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Assignment Status */}
        {assignLoading && (
          <div className="text-yellow-700 text-sm font-medium flex items-center gap-2 p-3 bg-yellow-50 rounded-xl mt-4">
            <span className="animate-spin inline-block w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full"></span>
            Assigning agent based on your location and language...
          </div>
        )}
        {assignError && (
          <div className="text-red-600 text-sm font-medium p-3 bg-red-50 rounded-xl mt-4">{assignError}</div>
        )}
        {form.employeeId && form.franchiseeId && !assignLoading && !assignError && (
          <div className="text-green-700 text-sm font-medium p-3 bg-green-50 rounded-xl mt-4">
            Assigned Agent: <span className="font-bold">{form.agentName || form.employeeId}</span>
            {form.agentName && (
              <span className="ml-2 text-xs text-green-900">(ID: {form.employeeId})</span>
            )}
            <span className="ml-4">Franchisee ID: <span className="font-bold">{form.franchiseeId}</span></span>
          </div>
        )}

        {/* Bottom Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 md:mt-12 max-w-6xl mx-auto gap-6 md:gap-0">
          <button className="w-12 h-12 flex items-center justify-center border-2 border-yellow-400 rounded-full text-yellow-500 text-xl hover:bg-yellow-100 transition" type="button" disabled={loading}>
            ←
          </button>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-base">
              <input type="checkbox" className="accent-yellow-500" />
              Remind me later!
            </label>
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full flex items-center gap-2 transition"
              onClick={handleNext}
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
          {/* Step 1 */}
          <li className="mb-10 ml-6 flex flex-col">
            <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-black text-yellow-400 rounded-full font-bold text-lg border-4 border-yellow-400">1</span>
            <span className="font-semibold text-lg mt-1">Company Information</span>
            <span className="text-xs text-black/70 mt-1">Step 1 of 4</span>
          </li>
          {/* Step 2 */}
          <li className="mb-10 ml-6 flex flex-col">
            <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-white text-black rounded-full font-bold text-lg border-4 border-black/30">2</span>
            <span className="font-semibold text-lg mt-1">Director/Promoter Details</span>
            <span className="text-xs text-black/70 mt-1">Step 2 of 4</span>
          </li>
          {/* Step 3 */}
          <li className="mb-10 ml-6 flex flex-col">
            <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-white text-black rounded-full font-bold text-lg border-4 border-black/30">3</span>
            <span className="font-semibold text-lg mt-1">Registration Status</span>
            <span className="text-xs text-black/70 mt-1">Step 3 of 4</span>
          </li>
          {/* Step 4 */}
          <li className="ml-6 flex flex-col">
            <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-white text-black rounded-full font-bold text-lg border-4 border-black/30">4</span>
            <span className="font-semibold text-lg mt-1">Compliance</span>
            <span className="text-xs text-black/70 mt-1">Step 4 of 4</span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default CompanyInformationForm;
