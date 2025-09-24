import React, { useState } from 'react';
import CompanyInformationForm from '../components/ExixistingCompany/CompanyInformationForm';
import DirectorPromoterForm from '../components/ExixistingCompany/DirectorPromoterForm';
import RegistrationStatusForm from '../components/ExixistingCompany/RegistrationStatusForm';
import ComplianceStatusCheck from '../components/ExixistingCompany/ComplianceStatusCheck';

const ExisitingCompanies = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen  bg-gray-50">

  {step === 1 && <CompanyInformationForm onNext={() => setStep(2)} step={step} setStep={setStep} />}
  {step === 2 && <DirectorPromoterForm onNext={() => setStep(3)} onBack={() => setStep(1)} />}
  {step === 3 && <RegistrationStatusForm onNext={() => setStep(4)} onBack={() => setStep(2)} />}
  {step === 4 && <ComplianceStatusCheck onBack={() => setStep(3)} />}
    </div>
  );
}

export default ExisitingCompanies;