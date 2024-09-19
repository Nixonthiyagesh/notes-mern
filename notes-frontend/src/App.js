// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginSignupPage from "./Routes/LoginSignupPage";
import SignedInUser from "./Routes/SignedInUser";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginSignupPage />} />
        <Route path='/signup' element={<LoginSignupPage />} />
        <Route path='/signedin' element={<SignedInUser />} />
        <Route path='/' element={<LoginSignupPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
