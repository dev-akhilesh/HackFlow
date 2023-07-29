// import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import Interviewpage from "../Pages/Interviewpage";

const Allroutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/interview" element={<Interviewpage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Allroutes;
