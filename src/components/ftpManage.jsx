import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/FTPManager.css"; // Import the new CSS file

function FTPManager() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      fetchFiles();
    }
  }, [isLoggedIn]);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/files");
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", { username, password });
      if (response.data.success) {
        setIsLoggedIn(true);
        fetchFiles();
      } else {
        alert("Login failed");
      }
    } catch (error) {
      alert("Error during login");
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully");
      fetchFiles();
      setSelectedFile(null);
    } catch (error) {
      alert("Error uploading file");
    }
  };

  const handleDelete = async (fileName) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/${fileName}`);
      alert("File deleted successfully");
      fetchFiles();
    } catch (error) {
      alert("Error deleting file");
    }
  };

  return (
    <div className="container">
      {!isLoggedIn ? (
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login to FTP</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn login-btn">Login</button>
        </form>
      ) : (
        <div className="ftp-manager">
          <h2>FTP Manager</h2>

          {/* File Upload Section */}
          <div className="upload-box">
            <h3>Upload File</h3>
            <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
          </div>

          {/* File List Section */}
          <div className="file-list">
            <h3>Files</h3>
            {files.length === 0 ? (
              <p className="empty-message">No files found</p>
            ) : (
              <ul>
                {files.map((file) => (
                  <li key={file} className="file-item">
                    <span>{file}</span>
                    <button className="btn delete-btn" onClick={() => handleDelete(file)}>Delete</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FTPManager;
