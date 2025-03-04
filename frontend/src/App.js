import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Routes, Route } from "react-router-dom"; 
import PortfolioForm from "./components/PortfolioForm";
import AuthForm from "./components/AuthForm";
// import PortfolioPreview from "./components/PortfolioPreview";
import './App.css';
import router from "../../backend/routes/portfolioRoutes";

const App = () => {
  const [portfolioData, setPortfolioData] = useState({});
  <Route path="/login" element={<AuthForm />} />
  return (
    <div>
      <h1>Portfolio Generator</h1>
      <PortfolioForm onChange={setPortfolioData} />
      <AuthForm onChange={setPortfolioData} />
      {/* <PortfolioPreview data={portfolioData} /> */}
    </div>
  );
};

export default App;