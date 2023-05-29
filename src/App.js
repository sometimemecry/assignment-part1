import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";
import Home from "./routes/Home";
import CompanyPage from "./routes/CompanyPage";

function App() {
  const url = "https://stockradars.co/assignment/data.php";
  const [company, setCompany] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => {
      setCompany(response.data);
      console.log(company);
    });
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home company={company} />} />
        <Route
          path="/company/:companyId"
          element={<CompanyPage company={company} />}
        >
          <Route path=":companyId" />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
