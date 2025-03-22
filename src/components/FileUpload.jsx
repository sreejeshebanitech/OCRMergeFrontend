import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/upload.css";

function FileUpload() {
  const [files, setFiles] = useState({
    math1: null,
    math2: null,
    english1: null,
    english2: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/upload/verify", { token });
        if (response.status !== 200 || response.data.message !== "Token is valid") {
          localStorage.removeItem("token");
          navigate("/");
        }
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/");
      }
    };
    verifyToken();
  }, [navigate]);

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!files.math1 || !files.english1) {
      alert("Please upload at least one file for Math and English");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    if (files.math1) formData.append("math1", files.math1);
    if (files.math2) formData.append("math2", files.math2);
    if (files.english1) formData.append("english1", files.english1);
    if (files.english2) formData.append("english2", files.english2);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data.pdfUrl) {
        window.open(response.data.pdfUrl, "_blank");
        alert("PDF generated successfully!");
      } else {
        alert("Error: No PDF URL received");
      }
    } catch (error) {
      alert("An error occurred during file upload.");
      console.error("Error uploading files:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div className="loading-text">Processing...</div>
        </div>
      )}
      <h2>Upload PDF Sheets</h2>
      <form onSubmit={handleSubmit}>
        <div className="section-container">
          <div className="subject-section">
            <h3>Math Files</h3>
            <div className="file-input-group">
              <label>Math File 1 (Required):</label>
              <input type="file" name="math1" accept=".pdf" onChange={handleFileChange} required />
            </div>
            <div className="file-input-group optional">
              <label>Math File 2 (Optional):</label>
              <input type="file" name="math2" accept=".pdf" onChange={handleFileChange} />
            </div>
          </div>

          <div className="subject-section">
            <h3>English Files</h3>
            <div className="file-input-group">
              <label>English File 1 (Required):</label>
              <input type="file" name="english1" accept=".pdf" onChange={handleFileChange} required />
            </div>
            <div className="file-input-group optional">
              <label>English File 2 (Optional):</label>
              <input type="file" name="english2" accept=".pdf" onChange={handleFileChange} />
            </div>
          </div>
        </div>

        <button type="submit" className="process-btn">
          Process Data
        </button>
      </form>
    </div>
  );
}

export default FileUpload;