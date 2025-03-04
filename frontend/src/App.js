import React, { useState } from "react";
import PortfolioForm from "./components/PortfolioForm";
import './App.css';

const App = () => {
  const [portfolioData, setPortfolioData] = useState({});
  console.log(portfolioData); // Add this inside the component

  return (
    <div>
      <h1>Portfolio Generator</h1>
      <PortfolioForm onChange={setPortfolioData} />
    </div>
  );
};

export default App;