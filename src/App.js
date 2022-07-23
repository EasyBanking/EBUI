import "./App.css";
import Navbar from "./Component/nav";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import About from "./Pages/about";
import Questions from "./Pages/FAQ";
import ContactUs from "./Pages/contactUs";

function App() {
  return (
    <>
      
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="home" element={<Home />} ></Route>
          <Route path="about" element={<About />} ></Route>
          <Route path="faq" element={<Questions />} ></Route>
          <Route path="contact-us" element={<ContactUs />} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
