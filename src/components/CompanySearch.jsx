import React, { useState } from "react";
import { Link } from "react-router-dom";

const CompanySearch = ({ company }) => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredCompanies = company.filter((value) => {
    if (searchText === "") {
      return true;
    } else if (
      value.N_fullname.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCompanies.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  return (
    <div className="rounded-div my-4">
      <div className="flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right">
        <h1 className="text-2xl font-bold my-2">Search Company</h1>
        <form>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full border px-4 py-2 rounded-2xl shadow-xl"
          />
        </form>
      </div>
      <table className="w-full text-center">
        <tbody>
          <tr className="border-b">
            <th></th>
            <th className="px-4">#</th>
            <th className="text-center">Company</th>
            <th></th>
            <th className="hidden md:table-cell">Company Site</th>
            <th className="hidden sm:table-cell">Market Cap</th>
          </tr>
          {currentItems.map((filteredValue, index) => (
            <tr key={index} className="h-[80px] border-b overflow-hidden">
              <td></td>
              <td className="px-4">{indexOfFirstItem + index + 1}</td>
              <td className="text-left">
                <Link to={`/company/${filteredValue.N_name}`} href="">
                  {filteredValue.N_fullname}
                </Link>
              </td>
              <td>{filteredValue.N_name || "None"}</td>
              <td className="hidden md:table-cell">
                {filteredValue.N_URL ? (
                  <a
                    href={
                      filteredValue.N_URL.startsWith("http")
                        ? filteredValue.N_URL
                        : `http://${filteredValue.N_URL}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {filteredValue.N_URL}
                  </a>
                ) : (
                  "None"
                )}
              </td>

              <td className="hidden sm:table-cell">
                {filteredValue.marketcap
                  ? `฿${filteredValue.marketcap.toLocaleString()}`
                  : "None"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center my-4">
        <nav>
          <ul className="pagination flex gap-4">
            {Array.from({ length: totalPages }).map((_, index) => (
              <li
                key={index}
                className={`pagination-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CompanySearch;
