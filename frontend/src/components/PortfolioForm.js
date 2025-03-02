import React, { useState } from "react";
import axios from "axios";
import "../styles/PortfolioForm.css";

const PortfolioForm = ({ onChange }) => {
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    about: "",
    skills: "",
    projects: "",
    theme: "light",
    profilePic: "",
  });

  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    onChange({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePortfolio = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/portfolio/generate", formData);
      setDownloadLink(`http://localhost:5000/${response.data.filePath}`);
    } catch (error) {
      console.error("Error generating portfolio:", error.response?.data || error.message);
      alert("Failed to generate portfolio. Try again!");
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2>🎨 Customize Your Portfolio</h2>
      <input type="text" name="name" placeholder="Your Name" onChange={handleChange} className="input-field" />
      <input type="text" name="profession" placeholder="Your Profession" onChange={handleChange} className="input-field" />
      <textarea name="about" placeholder="About You" onChange={handleChange} className="input-field textarea" />
      <input type="text" name="skills" placeholder="Skills (comma-separated)" onChange={handleChange} className="input-field" />
      <textarea name="projects" placeholder="Projects (comma-separated)" onChange={handleChange} className="input-field textarea" />
      
      <label>🌙 Select Theme:</label>
      <select name="theme" onChange={handleChange} className="input-field">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>

      <label>🖼️ Upload Profile Picture:</label>
      <input type="file" accept="image/*" onChange={handleFileUpload} className="input-field" />

      <button onClick={generatePortfolio} disabled={loading} className="generate-btn">
        {loading ? "Generating..." : "🚀 Generate Portfolio"}
      </button>

      {downloadLink && (
        <div className="download-section">
          <p>✅ Portfolio Ready!</p>
          <a href={downloadLink} download className="download-btn">📥 Download Portfolio</a>
        </div>
      )}
    </div>
  );
};

export default PortfolioForm;
