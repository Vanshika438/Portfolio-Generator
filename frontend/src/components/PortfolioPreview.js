import React from "react";

const PortfolioPreview = ({ data }) => {
  return (
    <div>
      <h2>Portfolio Preview</h2>
      <h3>{data.name || "Your Name"}</h3>
      <h4>{data.profession || "Your Profession"}</h4>
      <p>{data.about || "A short bio about yourself..."}</p>
      <h4>Skills</h4>
      <p>{data.skills || "Your skills will appear here..."}</p>
      <h4>Projects</h4>
      <p>{data.projects || "Your projects will be listed here..."}</p>
    </div>
  );
};

export default PortfolioPreview;
