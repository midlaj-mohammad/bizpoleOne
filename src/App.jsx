import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import StartYourBusiness from "./components/StartYourBusiness";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/startbusiness" element={<StartYourBusiness />} />
          
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
