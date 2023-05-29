import React from "react";
import CompanySearch from "../components/CompanySearch";

const Home = ({ company }) => {
  return (
    <div>
      <CompanySearch company={company} />
    </div>
  );
};

export default Home;
