import React, { useState } from "react";
import { useParams } from "react-router-dom";

const CompanyPage = ({ company }) => {
  const { companyId } = useParams();
  const [isThaiLanguage, setIsThaiLanguage] = useState(false);

  // Find the company with matching N_name
  const selectedCompany = company.find(
    (item) => item.N_name.toLowerCase() === companyId.toLowerCase()
  );

  if (!selectedCompany) {
    return <div>Company not found.</div>;
  }

  const handleLanguageToggle = () => {
    setIsThaiLanguage(!isThaiLanguage);
  };

  return (
    <div className="rounded-div my-4 p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-4">{selectedCompany.N_fullname}</h2>
      <div className="flex justify-between">
        <p className="text-lg mb-2">
          {isThaiLanguage ? "ชื่อย่อบริษัท" : "Initial"}:{" "}
          {isThaiLanguage
            ? selectedCompany.N_shortname
            : selectedCompany.N_name}
        </p>
      </div>
      <p className="text-lg mb-2">
        {isThaiLanguage ? "ชื่อเต็ม" : "Fullname"}:{" "}
        {isThaiLanguage
          ? selectedCompany.N_COMPANY_T
          : selectedCompany.N_COMPANY_E}
      </p>
      <p className="text-lg mb-2">
        {isThaiLanguage ? "เว็บไซต์" : "Website"}:{" "}
        {selectedCompany.N_URL ? (
          <a
            href={
              selectedCompany.N_URL.startsWith("http")
                ? selectedCompany.N_URL
                : `http://${selectedCompany.N_URL}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {selectedCompany.N_URL}
          </a>
        ) : (
          "None"
        )}
      </p>

      <p className="text-lg mb-2 py-2">
        <span className="text-xl font-bold">
          {isThaiLanguage ? "ประกอบธุรกิจ" : "About Company"}:
        </span>{" "}
        {isThaiLanguage
          ? selectedCompany.N_BUSINESS_TYPE_T
          : selectedCompany.N_BUSINESS_TYPE_E}
      </p>
      <p className="text-lg mb-2 py-2">
        Market Cap:{" "}
        {selectedCompany.marketcap
          ? `฿${selectedCompany.marketcap.toLocaleString()}`
          : "None"}
      </p>
      <div className="flex items-center mt-4 justify-center">
        <label className="mr-2 text-lg">Change Language: EN</label>
        <label className="switch">
          <input
            type="checkbox"
            checked={isThaiLanguage}
            onChange={handleLanguageToggle}
          />

          <span class="slider"></span>
        </label>
        <p className="px-4">TH</p>
      </div>
    </div>
  );
};

export default CompanyPage;
