import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/api/upload/login", { username, password });
      localStorage.setItem("token", response.data.token);
      navigate("/upload");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-r from-gray-200 to-gray-400">
      <div className="bg-white p-12 rounded-lg shadow-lg w-[500px] max-w-lg border border-gray-300">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
        <p className="text-center text-gray-600 mt-2">Enter your credentials to access the dashboard</p>
        <form onSubmit={handleLogin} className="mt-6 space-y-6">
          <div>
            <label className="block text-gray-700 text-lg font-semibold">Username</label>
            <input 
              type="text" 
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label className="block text-gray-700 text-lg font-semibold">Password</label>
            <input 
              type="password" 
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          {error && <p className="text-red-500 text-md mt-2 text-center">{error}</p>}
          <button 
            type="submit" 
            className="w-full bg-gray-700 text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-900 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;