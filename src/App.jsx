import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ftpManage  from "./pages/ftp";
import Upload from "./pages/Upload";

function App() {
  return (
    <Router>
      <Header />
      <main className="min-h-screen p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/ftp" element={<ftpManage/>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
