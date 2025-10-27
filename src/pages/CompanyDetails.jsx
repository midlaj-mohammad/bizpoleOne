import React, { useEffect, useState } from "react";
import { Building2, Mail, Phone, MapPin, Globe, FileText, Users, Calendar, CheckCircle, XCircle, Eye, Download, Share2, Edit3 } from "lucide-react";
import { getCompanyById } from "../api/CompanyApi";

const CompanyDetails = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const data = await getCompanyById();
        setCompany(data.data);
      } catch (err) {
        setError("Failed to fetch company details");
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-700 text-lg font-medium">Loading company details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center border border-amber-200">
          <XCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">Oops! Something went wrong</h3>
          <p className="text-slate-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-medium transition duration-200 shadow-md hover:shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const InfoCard = ({ icon: Icon, label, value, span = false, className = "" }) => (
    <div className={`bg-white rounded-xl p-4 border border-amber-200 hover:border-amber-300 hover:shadow-md transition-all duration-200 ${span ? 'col-span-2' : ''} ${className}`}>
      <div className="flex items-start gap-3">
        <div className="p-2 bg-amber-50 rounded-lg">
          <Icon className="w-5 h-5 text-amber-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">{label}</p>
          <p className="text-sm text-slate-900 font-medium break-words">{value || "Not provided"}</p>
        </div>
      </div>
    </div>
  );

  const StatusBadge = ({ status }) => (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
      status === 'Active' 
        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
        : 'bg-red-100 text-red-700 border border-red-200'
    }`}>
      {status}
    </span>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6 border border-amber-200">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  {company?.BusinessName || "Company Name"}
                </h1>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold border border-amber-200">
                    {company?.ConstitutionCategory || "N/A"}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold border border-blue-200">
                    {company?.Sector || "N/A"}
                  </span>
                  <StatusBadge status={company?.IsActive === 1 ? "Active" : "Inactive"} />
                </div>
                <p className="text-slate-600">
                  Company ID: <span className="font-semibold text-amber-700">{company?.CompanyID}</span>
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            {/* <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 bg-white border border-amber-300 text-amber-700 px-4 py-2 rounded-xl font-medium hover:bg-amber-50 transition duration-200">
                <Eye className="w-4 h-4" />
                View Full
              </button>
              <button className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl font-medium transition duration-200 shadow-md hover:shadow-lg">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-2 bg-white border border-amber-300 text-amber-700 px-4 py-2 rounded-xl font-medium hover:bg-amber-50 transition duration-200">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl font-medium transition duration-200 shadow-md hover:shadow-lg">
                <Edit3 className="w-4 h-4" />
                Edit
              </button>
            </div> */}
          </div>
        </div>

        {/* Navigation Tabs */}
        {/* <div className="bg-white rounded-2xl shadow-lg p-2 mb-6 border border-amber-200">
          <div className="flex space-x-1">
            {['overview', 'customers', 'documents', 'activity'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition duration-200 ${
                  activeTab === tab
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'text-slate-600 hover:text-amber-700 hover:bg-amber-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div> */}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Contact & Location */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Mail className="w-5 h-5 text-amber-600" />
                </div>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard icon={Mail} label="Company Email" value={company?.CompanyEmail} span />
                <InfoCard icon={Phone} label="Company Mobile" value={company?.CompanyMobile} span />
              </div>
            </div>

            {/* Location Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <MapPin className="w-5 h-5 text-amber-600" />
                </div>
                Location Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <InfoCard icon={MapPin} label="City" value={company?.City} />
                <InfoCard icon={MapPin} label="State" value={company?.State} />
                <InfoCard icon={MapPin} label="Country" value={company?.Country} />
                <InfoCard icon={MapPin} label="Pin Code" value={company?.PinCode} />
                <InfoCard icon={Globe} label="Website" value={company?.Website} />
              </div>
            </div>

            {/* Business Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                Business Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard icon={FileText} label="Business Nature" value={company?.BusinessNature} />
                <InfoCard icon={FileText} label="Customer Category" value={company?.CustomerCategory} />
                <InfoCard icon={FileText} label="Origin" value={company?.Origin} />
              </div>
            </div>
          </div>

          {/* Right Column - Legal & System Info */}
          <div className="space-y-6">
            {/* Legal Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <FileText className="w-5 h-5 text-amber-600" />
                </div>
                Legal Details
              </h2>
              <div className="space-y-4">
                <InfoCard icon={FileText} label="Company ID" value={company?.CompanyID} />
                <InfoCard icon={FileText} label="CIN" value={company?.CIN} />
                <InfoCard icon={FileText} label="PAN" value={company?.CompanyPAN} />
                <InfoCard icon={FileText} label="GST Number" value={company?.GSTNumber} />
                <InfoCard icon={FileText} label="Franchise ID" value={company?.FranchiseID} />
              </div>
            </div>

            {/* System Information */}
            {/* <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-amber-600" />
                </div>
                System Information
              </h2>
              <div className="space-y-4">
                <InfoCard 
                  icon={Calendar} 
                  label="Created At" 
                  value={company?.CreatedAt ? new Date(company.CreatedAt).toLocaleDateString('en-IN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : "N/A"} 
                />
                <InfoCard icon={Users} label="Created By" value={company?.CreatedBy} />
                <InfoCard 
                  icon={Calendar} 
                  label="Updated At" 
                  value={company?.UpdatedAt ? new Date(company.UpdatedAt).toLocaleDateString('en-IN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : "N/A"} 
                />
              </div>
            </div> */}

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-5 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Agents</p>
                    <p className="text-2xl font-bold">{company?.Agents?.length || 0}</p>
                  </div>
                  <Users className="w-8 h-8 opacity-80" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl p-5 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Customers</p>
                    <p className="text-2xl font-bold">{company?.Customers?.length || 0}</p>
                  </div>
                  <Users className="w-8 h-8 opacity-80" />
                </div>
              </div>
            </div>

            {/* Quick Status */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-200">
              <h3 className="font-semibold text-slate-900 mb-4">Quick Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Primary Company</span>
                  <StatusBadge status={company?.PrimaryCompany === 1 ? "Yes" : "No"} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Active Status</span>
                  <StatusBadge status={company?.IsActive === 1 ? "Active" : "Inactive"} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Amount</span>
                  <span className="text-sm font-semibold text-amber-700">
                    {company?.Amount ? `₹${company.Amount}` : "Not set"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;