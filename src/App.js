import "./App.css";
import React, { Suspense } from "react";
import Navbar from "./Component/nav";

import { BrowserRouter, Routes, Route } from "react-router-dom";





const Home = React.lazy(() => import("./Pages/home"));
const About = React.lazy(() => import("./Pages/about"));
const Questions = React.lazy(() => import("./Pages/FAQ"));
const ContactUs = React.lazy(() => import("./Pages/contactUs/contactUs"));
const Transfer = React.lazy(() => import("./Pages/Transfer/transfer"));
const Urgents = React.lazy(() => import("./Pages/urgents"));
const Features = React.lazy(() => import("./Component/HomePage/features"));


function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="home" element={<Home />}></Route>
            <Route path="about" element={<About />}></Route>
            <Route path="faq" element={<Questions />}></Route>
            <Route path="contact-us" element={<ContactUs />}></Route>
            <Route path="transfer"element={<Transfer/>}></Route>
            <Route path="urgents"element={<Urgents/>}></Route>
            <Route path="app" element={<Features/>}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
