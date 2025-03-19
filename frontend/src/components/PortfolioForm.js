import React, { useState } from "react";
import axios from "axios";
import "../styles/PortfolioForm.css";

const PortfolioForm = ({ onChange }) => {
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    about: "",
    skills: "",
    theme: "light",
    profilePic: "",
    linkedIn:"",
    instagram:""
  });

  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [previewURL, setPreviewURL] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
    if (!formData.name) {
      alert("Please enter your name!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/portfolio/generate", formData);
      setDownloadLink(`http://localhost:5000/${response.data.filePath}`);
      setPreviewURL(response.data.previewURL);
    } catch (error) {
      console.error("Error generating portfolio:", error.response?.data || error.message);
      alert("Failed to generate portfolio. Try again!");
    }
    setLoading(false);
  };


  const handleDownload = async () => {
    if (!formData.name) {
      alert("Please generate the portfolio first!");
      return;
    }

    const response = await fetch(`http://localhost:5000/api/portfolio/download/${formData.name}`);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${formData.name}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="form-container">
      <h2>🎨 Customize Your Portfolio</h2>

      <label htmlFor="name">Your Name</label>
      <input type="text" name="name" id="name" placeholder="Your Name" onChange={handleChange} className="input-field" />

      <label htmlFor="profession">Your Profession</label>
      <input type="text" name="profession" id="profession" placeholder="Your Profession" onChange={handleChange} className="input-field" />

      <label htmlFor="about">About You</label>
      <textarea name="about" id="about" placeholder="About You" onChange={handleChange} className="input-field textarea"></textarea>

      <label htmlFor="skills">Skills (comma-separated)</label>
      <input type="text" name="skills" id="skills" placeholder="Skills (comma-separated)" onChange={handleChange} className="input-field" />

      <label htmlFor="theme">🌙 Select Theme:</label>
      <select name="theme" id="theme" onChange={handleChange} className="input-field">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>

      <label htmlFor="linkedIn">LinkedIn URL</label>
      <input
        type="url"
        name="linkedIn"
        id="linkedIn"
        placeholder="Your LinkedIn Profile URL"
        onChange={handleChange}
        className="input-field"
      />

      <label htmlFor="instagram">Instagram URL (optional)</label>
      <input
        type="url"
        name="instagram"
        id="instagram"
        placeholder="Your Instagram Profile URL (optional)"
        onChange={handleChange}
        className="input-field"
      />

      <label htmlFor="profilePic">🖼️ Upload Profile Picture:</label>
      <input type="file" name="profilePic" id="profilePic" accept="image/*" onChange={handleFileUpload} className="input-field" />

      <button onClick={generatePortfolio} disabled={loading} className="generate-btn">
        {loading ? "Generating..." : "🚀 Generate Portfolio"}
      </button>

      {previewURL && (
        <div className="preview-section">
          <p>👀 Portfolio Preview:</p>
          <a href={previewURL} target="_blank" rel="noopener noreferrer">
            <button className="preview-btn">🔍 Preview Portfolio</button>
          </a>
        </div>
      )}


      {downloadLink && (
        <div className="download-section">
          <p>✅ Portfolio Ready!</p>
          <button className="download-btn" onClick={handleDownload}>📥 Download Portfolio</button>
        </div>
      )}
    </div>
  );
};

export default PortfolioForm;
