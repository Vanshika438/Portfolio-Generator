import React, { useState } from "react";
import PortfolioForm from "./components/PortfolioForm";
// import PortfolioPreview from "./components/PortfolioPreview";
import './App.css';

const App = () => {
  const [portfolioData, setPortfolioData] = useState({});

  return (
    <div>
      <h1>Portfolio Generator</h1>
      <PortfolioForm onChange={setPortfolioData} />
      {/* <PortfolioPreview data={portfolioData} /> */}
    </div>
  );
};

export default App;